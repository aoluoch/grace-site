/** Signed-in people are logged out after this long without activity. */
export const SESSION_INACTIVITY_MS = 15 * 60 * 1000;

/** Shared across tabs so activity in one tab keeps the others signed in. */
export const SESSION_ACTIVITY_KEY = "gam.session.lastActivity";

/** Survives the route redirect that follows logout. */
export const SESSION_SIGNOUT_KEY = "gam.session.signedOut";

export function isSessionInactive(
  lastActivityMs: number,
  now = Date.now(),
  limitMs = SESSION_INACTIVITY_MS,
): boolean {
  return Number.isFinite(lastActivityMs) && now - lastActivityMs >= limitMs;
}
