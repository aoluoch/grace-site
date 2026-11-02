import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  SESSION_ACTIVITY_KEY,
  SESSION_SIGNOUT_KEY,
  isSessionInactive,
} from "../lib/sessionTimeout";

const ACTIVITY_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

/**
 * Ends the Appwrite session after 15 minutes without a click, key press,
 * scroll, or touch. Activity is shared across tabs.
 */
function SessionTimeout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const loggingOut = useRef(false);
  const userId = user?.$id;

  useEffect(() => {
    if (!userId) {
      loggingOut.current = false;
      return;
    }

    loggingOut.current = false;
    let memoryActivity = Date.now();

    const writeActivity = (at = Date.now()) => {
      memoryActivity = at;
      try {
        localStorage.setItem(SESSION_ACTIVITY_KEY, String(at));
      } catch {
        /* Storage can be blocked; the in-memory time still applies in this tab. */
      }
    };

    try {
      const raw = localStorage.getItem(SESSION_ACTIVITY_KEY);
      const stored = raw == null ? NaN : Number(raw);
      if (Number.isFinite(stored) && isSessionInactive(stored)) {
        loggingOut.current = true;
        localStorage.removeItem(SESSION_ACTIVITY_KEY);
        sessionStorage.setItem(SESSION_SIGNOUT_KEY, "inactivity");
        void logout().finally(() => {
          navigate("/login", {
            replace: true,
            state: { reason: "inactivity" },
          });
        });
        return;
      }
    } catch {
      /* If storage cannot be read, start a fresh activity window. */
    }
    writeActivity();

    let lastWrite = Date.now();
    const onActivity = () => {
      const now = Date.now();
      if (now - lastWrite < 1000) return;
      lastWrite = now;
      writeActivity(now);
    };

    const readActivity = () => {
      try {
        const raw = localStorage.getItem(SESSION_ACTIVITY_KEY);
        const stored = raw == null ? NaN : Number(raw);
        if (Number.isFinite(stored)) return stored;
      } catch {
        /* Storage blocked: fall back to this tab's last activity. */
      }
      return memoryActivity;
    };

    const expire = () => {
      if (loggingOut.current) return;
      loggingOut.current = true;
      try {
        localStorage.removeItem(SESSION_ACTIVITY_KEY);
        sessionStorage.setItem(SESSION_SIGNOUT_KEY, "inactivity");
      } catch {
        /* The session is still ended in this tab. */
      }
      void logout().finally(() => {
        navigate("/login", { replace: true, state: { reason: "inactivity" } });
      });
    };

    const check = () => {
      if (isSessionInactive(readActivity())) expire();
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== SESSION_ACTIVITY_KEY || event.newValue != null) return;
      expire();
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, onActivity, {
        capture: true,
        passive: true,
      });
    });
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVisible);
    const timer = window.setInterval(check, 1000);

    return () => {
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, onActivity, { capture: true });
      });
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(timer);
    };
  }, [userId, logout, navigate]);

  return null;
}

export default SessionTimeout;
