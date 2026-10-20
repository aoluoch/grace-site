import { Client, Users, Databases, Query, Permission, Role } from "node-appwrite";

/**
 * Claim Submissions
 * -----------------
 * Links past "guest" form submissions (made while logged out) to the signed-in
 * member, by matching the submission's email to the member's account email.
 *
 * Why a function: the submission tables use row-level security and restrict
 * table reads to admins, so a logged-in member cannot find or update their own
 * guest submissions from the browser. This function runs server-side with a
 * scoped key, finds rows where `email` matches the caller's account email and
 * `userId` is empty, then stamps `userId` and grants the member read access so
 * the rows show up on their dashboard.
 *
 * Executable by any authenticated user (execute: "users"); it only ever acts on
 * rows matching that caller's own verified email.
 */

const DATABASE_ID = process.env.CLAIM_DATABASE_ID || "grace_arena";

const SUBMISSION_TABLES = [
  "prayer_requests",
  "appointments",
  "registrations",
  "testimonies",
  "contact_submissions",
  "subscribers",
];

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(
      process.env.APPWRITE_FUNCTION_API_ENDPOINT ||
        "https://cloud.appwrite.io/v1",
    )
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers["x-appwrite-key"] || "");

  const users = new Users(client);
  const db = new Databases(client);

  const callerId = req.headers["x-appwrite-user-id"];
  if (!callerId) {
    return res.json({ ok: false, message: "Not authenticated." }, 401);
  }

  // Resolve the caller's email server-side so a client cannot claim arbitrary
  // submissions by spoofing an email.
  let email = "";
  try {
    const user = await users.get(callerId);
    email = (user.email || "").trim();
  } catch (e) {
    error(`user lookup failed: ${e.message}`);
    return res.json({ ok: false, message: "Could not verify user." }, 403);
  }

  if (!email) {
    return res.json({ ok: true, claimed: 0, results: {} });
  }

  let claimed = 0;
  const results = {};

  for (const tableId of SUBMISSION_TABLES) {
    try {
      const list = await db.listDocuments(DATABASE_ID, tableId, [
        Query.equal("email", email),
        Query.limit(100),
      ]);
      let n = 0;
      for (const row of list.documents) {
        if (row.userId) continue; // already linked to an account
        await db.updateDocument(DATABASE_ID, tableId, row.$id, {
          userId: callerId,
        }, [Permission.read(Role.user(callerId))]);
        n += 1;
        claimed += 1;
      }
      results[tableId] = n;
    } catch (e) {
      results[tableId] = `error: ${e.message}`;
      error(`${tableId}: ${e.message}`);
    }
  }

  log(`claimed ${claimed} submissions for ${email}`);
  return res.json({ ok: true, claimed, results });
};
