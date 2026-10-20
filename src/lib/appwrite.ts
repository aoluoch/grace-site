import {
  Client,
  Account,
  TablesDB,
  Functions,
  ID,
  Query,
  Permission,
  Role,
} from "appwrite";

/**
 * Appwrite client for the Grace Arena web app.
 *
 * This layer is completely separate from the Contentful CMS integration
 * (which powers production content and must not be touched). Appwrite powers
 * the new web-app features: authentication, forms, member area and admin.
 */

type AppwriteEnvKey =
  | "VITE_APPWRITE_ENDPOINT"
  | "VITE_APPWRITE_PROJECT_ID"
  | "VITE_APPWRITE_DATABASE_ID";

const readEnv = (key: AppwriteEnvKey): string => {
  const value = import.meta.env[key]?.trim();
  if (!value) {
    throw new Error(`[Appwrite] Missing required env var: ${key}`);
  }
  return value;
};

export const APPWRITE_ENDPOINT = readEnv("VITE_APPWRITE_ENDPOINT");
export const APPWRITE_PROJECT_ID = readEnv("VITE_APPWRITE_PROJECT_ID");
export const DATABASE_ID = readEnv("VITE_APPWRITE_DATABASE_ID");

export const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const functions = new Functions(client);

export { ID, Query, Permission, Role };

/** Appwrite Function IDs. */
export const FUNCTIONS = {
  manageAdmins: "manage-admins",
  claimSubmissions: "claim-submissions",
} as const;

/** Table (collection) IDs in the grace_arena database. */
export const TABLES = {
  profiles: "profiles",
  prayerRequests: "prayer_requests",
  appointments: "appointments",
  events: "events",
  registrations: "registrations",
  testimonies: "testimonies",
  contactSubmissions: "contact_submissions",
  subscribers: "subscribers",
  announcements: "announcements",
  sermons: "sermons",
  siteContent: "site_content",
} as const;

export type TableId = (typeof TABLES)[keyof typeof TABLES];

/** The organizations in the ministry ecosystem (shared backend). */
export const ORGANIZATIONS = [
  { value: "grace_arena_kenya", label: "Grace Arena Kenya" },
  { value: "dom_international", label: "David Owusu Ministries International" },
  { value: "dom_uk", label: "David Owusu Ministries UK" },
  { value: "young_ministers", label: "Young Ministers" },
  { value: "dom_trust", label: "DOM Trust" },
] as const;
