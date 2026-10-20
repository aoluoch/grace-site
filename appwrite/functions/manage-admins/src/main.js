import { Client, Users, Query } from "node-appwrite";

/**
 * Manage Admins
 * -------------
 * Grants or revokes the "admin" label on Grace Arena member accounts.
 *
 * Security:
 *  - The function's execute permission is restricted to `label:admin`, so only
 *    users who are already admins can invoke it.
 *  - We additionally re-verify the caller's admin label server-side before
 *    performing any write, so a leaked execution cannot be abused.
 *  - It uses the dynamic API key injected per-execution (x-appwrite-key) with
 *    only users.read / users.write scopes.
 *
 * Request body (JSON):
 *  { "action": "list" }
 *  { "action": "promote", "email": "person@example.com" }
 *  { "action": "demote", "userId": "..." }  // or { "email": "..." }
 */

const ADMIN_LABEL = "admin";

const serialize = (u) => ({
  $id: u.$id,
  name: u.name || "",
  email: u.email || "",
  labels: u.labels || [],
  registration: u.registration,
});

async function findByEmail(users, email) {
  if (!email) return null;
  const res = await users.list([Query.equal("email", email), Query.limit(1)]);
  return res.users[0] ?? null;
}

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(
      process.env.APPWRITE_FUNCTION_API_ENDPOINT ||
        "https://cloud.appwrite.io/v1",
    )
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers["x-appwrite-key"] || "");

  const users = new Users(client);

  const callerId = req.headers["x-appwrite-user-id"];
  if (!callerId) {
    return res.json({ ok: false, message: "Not authenticated." }, 401);
  }

  // Re-verify the caller is a current admin.
  try {
    const caller = await users.get(callerId);
    if (!(caller.labels || []).includes(ADMIN_LABEL)) {
      return res.json({ ok: false, message: "Admins only." }, 403);
    }
  } catch (e) {
    error(`caller check failed: ${e.message}`);
    return res.json({ ok: false, message: "Could not verify caller." }, 403);
  }

  let body = {};
  try {
    body = req.body && typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");
  } catch {
    body = {};
  }
  const action = body.action || "list";

  try {
    if (action === "list") {
      const all = await users.list([Query.limit(100)]);
      const admins = all.users
        .filter((u) => (u.labels || []).includes(ADMIN_LABEL))
        .map(serialize);
      return res.json({ ok: true, admins });
    }

    if (action === "promote") {
      const email = String(body.email || "").trim().toLowerCase();
      if (!email) {
        return res.json({ ok: false, message: "Email is required." }, 400);
      }
      const target = await findByEmail(users, email);
      if (!target) {
        return res.json(
          {
            ok: false,
            message:
              "No member found with that email. Ask them to create an account first, then promote them.",
          },
          404,
        );
      }
      if ((target.labels || []).includes(ADMIN_LABEL)) {
        return res.json({
          ok: true,
          alreadyAdmin: true,
          user: serialize(target),
        });
      }
      const labels = Array.from(
        new Set([...(target.labels || []), ADMIN_LABEL]),
      );
      const updated = await users.updateLabels(target.$id, labels);
      log(`promoted ${target.$id} to admin`);
      return res.json({ ok: true, user: serialize(updated) });
    }

    if (action === "demote") {
      const target = body.userId
        ? await users.get(body.userId)
        : await findByEmail(users, String(body.email || "").trim().toLowerCase());
      if (!target) {
        return res.json({ ok: false, message: "User not found." }, 404);
      }
      if (target.$id === callerId) {
        return res.json(
          { ok: false, message: "You cannot remove your own admin access." },
          400,
        );
      }
      const labels = (target.labels || []).filter((l) => l !== ADMIN_LABEL);
      const updated = await users.updateLabels(target.$id, labels);
      log(`demoted ${target.$id}`);
      return res.json({ ok: true, user: serialize(updated) });
    }

    return res.json({ ok: false, message: "Unknown action." }, 400);
  } catch (e) {
    error(e.message);
    return res.json({ ok: false, message: e.message }, 500);
  }
};
