import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import {
  getProfile,
  saveProfile,
  myRegistrations,
  myPrayerRequests,
  myAppointments,
  myTestimonies,
  claimMySubmissions,
  cancelRegistration,
  updateName,
  updateUserPassword,
} from "../lib/api";
import { ORGANIZATIONS } from "../lib/appwrite";
import type { Models } from "appwrite";
import {
  Field,
  TextInput,
  PasswordInput,
  Select,
  SubmitButton,
  FormStatus,
  type Status,
} from "../components/forms/formControls";
import { LogOut, ShieldCheck, UserCog, KeyRound } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  pending: "bg-amber-50 text-amber-700",
  praying: "bg-purple-50 text-purple-700",
  registered: "bg-green-50 text-green-700",
  accepted: "bg-green-50 text-green-700",
  approved: "bg-green-50 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  attended: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-50 text-red-700",
  rejected: "bg-red-50 text-red-700",
  rescheduled: "bg-amber-50 text-amber-700",
};

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function Dashboard() {
  const { user, isAdmin, logout, refresh } = useAuth();
  const navigate = useNavigate();

  const [regs, setRegs] = useState<Models.Row[]>([]);
  const [prayers, setPrayers] = useState<Models.Row[]>([]);
  const [appts, setAppts] = useState<Models.Row[]>([]);
  const [testimonies, setTestimonies] = useState<Models.Row[]>([]);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profile, setProfile] = useState<Models.Row | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileStatus, setProfileStatus] = useState<Status>(null);

  const [savingName, setSavingName] = useState(false);
  const [nameStatus, setNameStatus] = useState<Status>(null);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<Status>(null);

  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      // Link any past submissions made with this member's email (e.g. before
      // they signed in) to their account, then load everything so claimed
      // items show up immediately.
      await claimMySubmissions().catch(() => 0);
      if (!active) return;
      const [r, p, a, t, prof] = await Promise.all([
        myRegistrations(user.$id).catch(() => ({ rows: [] })),
        myPrayerRequests(user.$id).catch(() => ({ rows: [] })),
        myAppointments(user.$id).catch(() => ({ rows: [] })),
        myTestimonies(user.$id).catch(() => ({ rows: [] })),
        getProfile(user.$id).catch(() => null),
      ]);
      if (!active) return;
      setRegs(r.rows);
      setPrayers(p.rows);
      setAppts(a.rows);
      setTestimonies(t.rows);
      setProfile(prof);
      setProfileLoaded(true);
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleProfileSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const fd = new FormData(e.currentTarget);
    setSavingProfile(true);
    setProfileStatus(null);
    try {
      const saved = await saveProfile(user.$id, {
        fullName: fd.get("fullName") as string,
        email: fd.get("email") as string,
        phone: (fd.get("phone") as string) || undefined,
        organization: (fd.get("organization") as string) || undefined,
        city: (fd.get("city") as string) || undefined,
      });
      setProfile(saved);
      setProfileStatus({ type: "success", message: "Profile saved." });
    } catch {
      setProfileStatus({
        type: "error",
        message: "Could not save your profile. Please try again.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleNameSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string)?.trim();
    if (!name) return;
    setSavingName(true);
    setNameStatus(null);
    try {
      await updateName(name);
      await refresh();
      setNameStatus({ type: "success", message: "Display name updated." });
    } catch {
      setNameStatus({
        type: "error",
        message: "Could not update your name. Please try again.",
      });
    } finally {
      setSavingName(false);
    }
  };

  const handlePasswordSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const oldPassword = fd.get("oldPassword") as string;
    const newPassword = fd.get("newPassword") as string;
    const confirm = fd.get("confirm") as string;

    if (newPassword.length < 8) {
      setPasswordStatus({
        type: "error",
        message: "New password must be at least 8 characters.",
      });
      return;
    }
    if (newPassword !== confirm) {
      setPasswordStatus({ type: "error", message: "New passwords do not match." });
      return;
    }

    setSavingPassword(true);
    setPasswordStatus(null);
    try {
      await updateUserPassword(newPassword, oldPassword);
      form.reset();
      setPasswordStatus({ type: "success", message: "Password updated." });
    } catch {
      setPasswordStatus({
        type: "error",
        message:
          "Could not update your password. Check your current password and try again.",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  const handleCancelRegistration = async (rowId: string) => {
    if (!confirm("Cancel this event registration?")) return;
    try {
      await cancelRegistration(rowId);
      setRegs((prev) =>
        prev.map((r) => (r.$id === rowId ? { ...r, status: "cancelled" } : r)),
      );
    } catch {
      alert("Could not cancel this registration. Please try again.");
    }
  };

  const p = (profile ?? {}) as Record<string, string | undefined>;

  return (
    <div className="flex min-h-screen flex-col bg-[#efefef]">
      <header className="bg-[#1f2167] py-10 sm:py-12">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              My Dashboard
            </h1>
            <p className="mt-2 text-[1.05rem] text-[#c6c8e8]">
              Welcome, {user?.name || user?.email}.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-md bg-[#B38E34] px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-[#202163]"
              >
                <ShieldCheck className="h-4 w-4" /> Admin
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* Profile */}
        <section className="rounded-xl border border-[#dcdcdc] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-[#202163]">My profile</h2>
          <p className="mt-1 text-sm text-[#676767]">
            Keep your details up to date so we can serve and reach you.
          </p>
          {profileLoaded && (
            <form onSubmit={handleProfileSave} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required>
                  <TextInput
                    name="fullName"
                    required
                    defaultValue={p.fullName ?? user?.name ?? ""}
                  />
                </Field>
                <Field label="Email" required>
                  <TextInput
                    type="email"
                    name="email"
                    required
                    defaultValue={p.email ?? user?.email ?? ""}
                  />
                </Field>
                <Field label="Phone">
                  <TextInput name="phone" defaultValue={p.phone ?? ""} />
                </Field>
                <Field label="City">
                  <TextInput name="city" defaultValue={p.city ?? ""} />
                </Field>
                <Field label="Home ministry">
                  <Select
                    name="organization"
                    defaultValue={p.organization ?? "grace_arena_kenya"}
                  >
                    {ORGANIZATIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <FormStatus status={profileStatus} />
              <SubmitButton loading={savingProfile}>Save profile</SubmitButton>
            </form>
          )}
        </section>

        {/* Account settings */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-[#dcdcdc] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-[#202163]">
              <UserCog className="h-5 w-5 text-[#B38E34]" /> Display name
            </h2>
            <p className="mt-1 text-sm text-[#676767]">
              This is the name we greet you with and attach to your account.
            </p>
            <form onSubmit={handleNameSave} className="mt-5 space-y-4">
              <Field label="Name" required>
                <TextInput
                  name="name"
                  required
                  defaultValue={user?.name ?? ""}
                  autoComplete="name"
                />
              </Field>
              <FormStatus status={nameStatus} />
              <SubmitButton loading={savingName}>Update name</SubmitButton>
            </form>
          </div>

          <div className="rounded-xl border border-[#dcdcdc] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-[#202163]">
              <KeyRound className="h-5 w-5 text-[#B38E34]" /> Change password
            </h2>
            <p className="mt-1 text-sm text-[#676767]">
              Use a strong password you don&apos;t reuse elsewhere.
            </p>
            <form onSubmit={handlePasswordSave} className="mt-5 space-y-4">
              <Field label="Current password" required>
                <PasswordInput
                  name="oldPassword"
                  required
                  autoComplete="current-password"
                />
              </Field>
              <Field label="New password" required hint="At least 8 characters.">
                <PasswordInput
                  name="newPassword"
                  required
                  autoComplete="new-password"
                />
              </Field>
              <Field label="Confirm new password" required>
                <PasswordInput
                  name="confirm"
                  required
                  autoComplete="new-password"
                />
              </Field>
              <FormStatus status={passwordStatus} />
              <SubmitButton loading={savingPassword}>
                Update password
              </SubmitButton>
            </form>
          </div>
        </section>

        {/* Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ActivityCard
            title="My event registrations"
            rows={regs}
            empty="You haven't registered for any events yet."
            renderItem={(row) => (
              <>
                <div className="min-w-0">
                  <p className="font-semibold text-[#202163]">
                    {(row as { eventTitle?: string }).eventTitle ?? "Event"}
                  </p>
                  <p className="text-xs text-[#676767]">
                    Ref {(row as { reference?: string }).reference ?? "—"}
                  </p>
                  {(row as { status?: string }).status !== "cancelled" && (
                    <button
                      type="button"
                      onClick={() => handleCancelRegistration(row.$id)}
                      className="mt-1 text-xs font-semibold text-[#b02a2a] hover:text-red-700"
                    >
                      Cancel registration
                    </button>
                  )}
                </div>
                <StatusBadge status={(row as { status?: string }).status} />
              </>
            )}
          />

          <ActivityCard
            title="My prayer requests"
            rows={prayers}
            empty="No prayer requests yet."
            renderItem={(row) => (
              <>
                <p className="line-clamp-2 min-w-0 text-sm text-[#212121]">
                  {(row as { request?: string }).request}
                </p>
                <StatusBadge status={(row as { status?: string }).status} />
              </>
            )}
          />

          <ActivityCard
            title="My appointments"
            rows={appts}
            empty="No appointment requests yet."
            renderItem={(row) => (
              <>
                <p className="min-w-0 text-sm capitalize text-[#212121]">
                  {(row as { type?: string }).type} request
                </p>
                <StatusBadge status={(row as { status?: string }).status} />
              </>
            )}
          />

          <ActivityCard
            title="My testimonies"
            rows={testimonies}
            empty="You haven't shared a testimony yet."
            renderItem={(row) => (
              <>
                <p className="min-w-0 text-sm font-medium text-[#212121]">
                  {(row as { title?: string }).title ?? "Testimony"}
                </p>
                <StatusBadge status={(row as { status?: string }).status} />
              </>
            )}
          />
        </div>

        <div className="rounded-xl border border-dashed border-[#B38E34]/50 bg-white p-6 text-center">
          <p className="text-sm text-[#676767]">
            Need something?{" "}
            <Link
              to="/connect"
              className="font-semibold text-[#202163] hover:text-[#B38E34]"
            >
              Submit a prayer request, book an appointment or register for an event
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ActivityCard({
  title,
  rows,
  empty,
  renderItem,
}: {
  title: string;
  rows: Models.Row[];
  empty: string;
  renderItem: (row: Models.Row) => React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#dcdcdc] bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-[#202163]">
        {title}{" "}
        <span className="text-sm font-normal text-[#676767]">
          ({rows.length})
        </span>
      </h3>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-[#676767]">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {rows.map((row) => (
            <li
              key={row.$id}
              className="flex items-start justify-between gap-3 rounded-md bg-[#f6f6f9] p-3"
            >
              {renderItem(row)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Dashboard;
