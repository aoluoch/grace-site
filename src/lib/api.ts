import {
  account,
  tablesDB,
  functions,
  DATABASE_ID,
  TABLES,
  FUNCTIONS,
  ID,
  Query,
  Permission,
  Role,
} from "./appwrite";
import type { Models } from "appwrite";

/* ------------------------------------------------------------------ */
/* Auth                                                               */
/* ------------------------------------------------------------------ */

export type AppUser = Models.User<Models.Preferences>;

export const getCurrentUser = async (): Promise<AppUser | null> => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    await account.createEmailPasswordSession({ email, password });
  } catch {
    // If a session is already active (e.g. the user never signed out),
    // clear it and retry once so sign-in always works.
    try {
      await account.deleteSession({ sessionId: "current" });
    } catch {
      /* no active session to clear */
    }
    await account.createEmailPasswordSession({ email, password });
  }
  return account.get();
};

export const signup = async (email: string, password: string, name: string) => {
  await account.create({ userId: ID.unique(), email, password, name });
  await account.createEmailPasswordSession({ email, password });
  return account.get();
};

export const logout = async () => {
  try {
    await account.deleteSession({ sessionId: "current" });
  } catch {
    /* already signed out */
  }
};

export const isAdmin = (user: AppUser | null): boolean =>
  !!user?.labels?.includes("admin");

/* ------------------------------------------------------------------ */
/* Password recovery & account self-service                           */
/* ------------------------------------------------------------------ */

/**
 * Sends a password recovery email. The link in the email points back to
 * `${origin}/reset-password` with `userId` and `secret` query params, which
 * the ResetPassword page uses to complete the reset.
 */
export const requestPasswordRecovery = (email: string) =>
  account.createRecovery({
    email,
    url: `${window.location.origin}/reset-password`,
  });

/** Completes a password reset using the userId + secret from the email link. */
export const confirmPasswordRecovery = (
  userId: string,
  secret: string,
  password: string,
) => account.updateRecovery({ userId, secret, password });

/** Updates the signed-in member's display name. */
export const updateName = (name: string) => account.updateName({ name });

/** Updates the signed-in member's password (requires the current password). */
export const updateUserPassword = (newPassword: string, oldPassword: string) =>
  account.updatePassword({ password: newPassword, oldPassword });

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * When a signed-in member submits a form, grant them read access to their own
 * row. Admins can always read/update/delete via the collection-level
 * `label:admin` permission, so we never expose other members' records.
 */
const ownerPerms = (userId?: string) =>
  userId ? [Permission.read(Role.user(userId))] : undefined;

const clean = <T extends Record<string, unknown>>(data: T): T => {
  const out = {} as T;
  (Object.keys(data) as (keyof T)[]).forEach((k) => {
    const v = data[k];
    if (v !== undefined && v !== "" && v !== null) out[k] = v;
  });
  return out;
};

/* ------------------------------------------------------------------ */
/* Public form submissions                                            */
/* ------------------------------------------------------------------ */

export interface PrayerRequestInput {
  name?: string;
  email?: string;
  phone?: string;
  contactPreference?: "email" | "phone" | "none";
  request: string;
  consent: boolean;
}

export const submitPrayerRequest = (input: PrayerRequestInput, userId?: string) =>
  tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.prayerRequests,
    rowId: ID.unique(),
    data: clean({ ...input, userId }),
    permissions: ownerPerms(userId),
  });

export interface AppointmentInput {
  name: string;
  email?: string;
  phone?: string;
  type: "pastoral" | "counseling" | "prayer" | "prophetic" | "other";
  preferredDate?: string;
  note?: string;
}

export const submitAppointment = (input: AppointmentInput, userId?: string) =>
  tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.appointments,
    rowId: ID.unique(),
    data: clean({ ...input, userId }),
    permissions: ownerPerms(userId),
  });

export interface ContactInput {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
}

export const submitContact = (input: ContactInput, userId?: string) =>
  tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.contactSubmissions,
    rowId: ID.unique(),
    data: clean({ ...input, userId }),
    permissions: ownerPerms(userId),
  });

export interface SubscribeInput {
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  emailOptIn?: boolean;
  smsOptIn?: boolean;
}

export const subscribe = (input: SubscribeInput, userId?: string) =>
  tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.subscribers,
    rowId: ID.unique(),
    data: clean({ ...input, userId }),
    permissions: ownerPerms(userId),
  });

export interface TestimonyInput {
  name?: string;
  email?: string;
  title: string;
  body: string;
}

export const submitTestimony = (input: TestimonyInput, userId?: string) =>
  tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.testimonies,
    rowId: ID.unique(),
    data: clean({ ...input, userId }),
    permissions: ownerPerms(userId),
  });

export interface RegistrationInput {
  eventId: string;
  eventTitle?: string;
  name: string;
  email?: string;
  phone?: string;
  attendanceType?: "in_person" | "online";
  notes?: string;
}

const makeReference = () =>
  "GA-" + Math.random().toString(36).slice(2, 8).toUpperCase();

export const registerForEvent = (input: RegistrationInput, userId?: string) =>
  tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.registrations,
    rowId: ID.unique(),
    data: clean({ ...input, reference: makeReference(), userId }),
    permissions: ownerPerms(userId),
  });

/* ------------------------------------------------------------------ */
/* Public content                                                     */
/* ------------------------------------------------------------------ */

export const listEvents = () =>
  tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.events,
    queries: [Query.equal("published", true), Query.orderAsc("date"), Query.limit(100)],
  });

export const listSermons = () =>
  tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.sermons,
    queries: [Query.equal("published", true), Query.orderDesc("$createdAt"), Query.limit(100)],
  });

export const listAnnouncements = () =>
  tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.announcements,
    queries: [Query.equal("published", true), Query.orderDesc("$createdAt"), Query.limit(50)],
  });

/* ------------------------------------------------------------------ */
/* Member area                                                        */
/* ------------------------------------------------------------------ */

const myRows = (tableId: string, userId: string) =>
  tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId,
    queries: [Query.equal("userId", userId), Query.orderDesc("$createdAt"), Query.limit(50)],
  });

export const myRegistrations = (userId: string) =>
  myRows(TABLES.registrations, userId);
export const myPrayerRequests = (userId: string) =>
  myRows(TABLES.prayerRequests, userId);
export const myAppointments = (userId: string) =>
  myRows(TABLES.appointments, userId);
export const myTestimonies = (userId: string) =>
  myRows(TABLES.testimonies, userId);

/**
 * Links past "guest" submissions (made while logged out) to the signed-in
 * member by matching the submission email to the account email. Runs the
 * `claim-submissions` Appwrite Function server-side, since the submission
 * tables restrict reads to admins and the member can't find those rows from
 * the browser. Safe to call on every dashboard load; it's a no-op once there
 * is nothing left to claim. Returns the number of rows claimed.
 */
export const claimMySubmissions = async (): Promise<number> => {
  try {
    const execution = await functions.createExecution({
      functionId: FUNCTIONS.claimSubmissions,
      async: false,
    });
    if (execution.status === "failed") return 0;
    const parsed = JSON.parse(execution.responseBody || "{}") as {
      ok?: boolean;
      claimed?: number;
    };
    return parsed.ok ? parsed.claimed ?? 0 : 0;
  } catch {
    return 0;
  }
};

/** Let a member cancel their own event registration. */
export const cancelRegistration = (rowId: string) =>
  tablesDB.updateRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.registrations,
    rowId,
    data: { status: "cancelled" },
  });

export interface ProfileInput {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  city?: string;
}

export const getProfile = async (userId: string) => {
  const res = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.profiles,
    queries: [Query.equal("userId", userId), Query.limit(1)],
  });
  return res.rows[0] ?? null;
};

export const saveProfile = async (userId: string, input: ProfileInput) => {
  const existing = await getProfile(userId);
  if (existing) {
    return tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLES.profiles,
      rowId: existing.$id,
      data: clean({ ...input }),
    });
  }
  return tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.profiles,
    rowId: ID.unique(),
    data: clean({ ...input, userId }),
    permissions: [
      Permission.read(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ],
  });
};

/* ------------------------------------------------------------------ */
/* Admin                                                              */
/* ------------------------------------------------------------------ */

export const adminList = (tableId: string, queries: string[] = []) =>
  tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId,
    queries: [Query.orderDesc("$createdAt"), Query.limit(100), ...queries],
  });

export const adminUpdateStatus = (
  tableId: string,
  rowId: string,
  data: Record<string, unknown>,
) =>
  tablesDB.updateRow({
    databaseId: DATABASE_ID,
    tableId,
    rowId,
    data,
  });

/** Update an existing admin-managed row (full edit — empty strings allowed). */
export const adminUpdate = (
  tableId: string,
  rowId: string,
  data: Record<string, unknown>,
) =>
  tablesDB.updateRow({
    databaseId: DATABASE_ID,
    tableId,
    rowId,
    data,
  });

export const adminDelete = (tableId: string, rowId: string) =>
  tablesDB.deleteRow({ databaseId: DATABASE_ID, tableId, rowId });

export const adminCreate = (tableId: string, data: Record<string, unknown>) =>
  tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId,
    rowId: ID.unique(),
    data: clean(data),
  });

/* ------------------------------------------------------------------ */
/* Site content (admin-managed, non-Contentful data)                  */
/* ------------------------------------------------------------------ */

/**
 * The `site_content` table stores editable blocks of the site that are NOT
 * managed by Contentful (core values, giving/payment details, contact info,
 * footer & social links). Each row has a unique `key` and a JSON `value`.
 * Content is publicly readable; only admins can write. Components fall back to
 * built-in defaults when a key has not been published yet, so production is
 * never broken by a missing row.
 */

export interface SiteContentRow {
  $id: string;
  key: string;
  value: string;
  label?: string;
}

/** Fetch a single site-content block by key, parsed from JSON. */
export const getSiteContent = async <T>(
  key: string,
): Promise<T | null> => {
  try {
    const res = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLES.siteContent,
      queries: [Query.equal("key", key), Query.limit(1)],
    });
    const row = res.rows[0] as unknown as SiteContentRow | undefined;
    if (!row?.value) return null;
    return JSON.parse(row.value) as T;
  } catch {
    return null;
  }
};

/** List every site-content row (admin editor). */
export const listSiteContent = () =>
  tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.siteContent,
    queries: [Query.limit(100)],
  });

/** Create or update a site-content block (admin only). */
export const saveSiteContent = async (
  key: string,
  value: unknown,
  label?: string,
) => {
  const serialized = JSON.stringify(value);
  const existing = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.siteContent,
    queries: [Query.equal("key", key), Query.limit(1)],
  });
  const row = existing.rows[0];
  if (row) {
    return tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLES.siteContent,
      rowId: row.$id,
      data: clean({ value: serialized, label }),
    });
  }
  return tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.siteContent,
    rowId: ID.unique(),
    data: clean({ key, value: serialized, label }),
  });
};

/* ------------------------------------------------------------------ */
/* Admin management (via secure Appwrite Function)                     */
/* ------------------------------------------------------------------ */

export interface AdminUser {
  $id: string;
  name: string;
  email: string;
  labels: string[];
  registration?: string;
}

interface ManageAdminsResult {
  ok: boolean;
  message?: string;
  admins?: AdminUser[];
  user?: AdminUser;
  alreadyAdmin?: boolean;
}

/**
 * Calls the `manage-admins` Appwrite Function. The function enforces that the
 * caller already has the `admin` label (both via execute permission and a
 * server-side re-check) before granting or revoking admin access. The actual
 * label write happens server-side with a scoped API key — never in the browser.
 */
const callManageAdmins = async (
  payload: Record<string, unknown>,
): Promise<ManageAdminsResult> => {
  const execution = await functions.createExecution({
    functionId: FUNCTIONS.manageAdmins,
    body: JSON.stringify(payload),
    async: false,
  });

  if (execution.status === "failed") {
    throw new Error("The admin service could not complete your request.");
  }

  let parsed: ManageAdminsResult;
  try {
    parsed = JSON.parse(execution.responseBody || "{}") as ManageAdminsResult;
  } catch {
    throw new Error("Unexpected response from the admin service.");
  }

  if (!parsed.ok) {
    throw new Error(parsed.message || "The request was rejected.");
  }
  return parsed;
};

export const listAdmins = async (): Promise<AdminUser[]> => {
  const res = await callManageAdmins({ action: "list" });
  return res.admins ?? [];
};

export const promoteAdmin = (email: string) =>
  callManageAdmins({ action: "promote", email });

export const demoteAdmin = (userId: string) =>
  callManageAdmins({ action: "demote", userId });

export { Query };
