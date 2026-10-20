import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  listAdmins,
  promoteAdmin,
  demoteAdmin,
  type AdminUser,
} from "../../lib/api";
import {
  Field,
  TextInput,
  SubmitButton,
  FormStatus,
  type Status,
} from "../forms/formControls";
import { ShieldCheck, ShieldOff, UserPlus } from "lucide-react";

function AdminManagers() {
  const { user } = useAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [adding, setAdding] = useState(false);
  const [addStatus, setAddStatus] = useState<Status>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    listAdmins()
      .then((list) => active && setAdmins(list))
      .catch(
        (e) =>
          active &&
          setLoadError(
            e instanceof Error ? e.message : "Could not load the admin list.",
          ),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const refresh = async () => {
    try {
      setAdmins(await listAdmins());
    } catch {
      /* keep current list */
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = (fd.get("email") as string)?.trim();
    if (!email) return;
    setAdding(true);
    setAddStatus(null);
    try {
      const res = await promoteAdmin(email);
      await refresh();
      form.reset();
      setAddStatus({
        type: "success",
        message: res.alreadyAdmin
          ? `${email} is already an admin.`
          : `${email} is now an admin.`,
      });
    } catch (err) {
      setAddStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Could not add that admin. Please try again.",
      });
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (admin: AdminUser) => {
    if (
      !confirm(
        `Remove admin access for ${admin.name || admin.email}? They will keep their member account.`,
      )
    )
      return;
    setBusyId(admin.$id);
    try {
      await demoteAdmin(admin.$id);
      await refresh();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Could not remove that admin. Please try again.",
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Add admin */}
      <section className="lg:col-span-2">
        <div className="rounded-xl border border-[#dcdcdc] bg-white p-6 shadow-sm">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-[#202163]">
            <UserPlus className="h-5 w-5 text-[#B38E34]" /> Add an admin
          </h2>
          <p className="mt-1 text-sm text-[#676767]">
            Enter the email of an existing member to grant them full admin
            access. They must have created a Grace Arena account first.
          </p>
          <form onSubmit={handleAdd} className="mt-4 space-y-4">
            <Field label="Member email" required>
              <TextInput
                type="email"
                name="email"
                required
                placeholder="person@example.com"
                autoComplete="off"
              />
            </Field>
            <FormStatus status={addStatus} />
            <SubmitButton loading={adding}>Make admin</SubmitButton>
          </form>
        </div>
      </section>

      {/* Current admins */}
      <section className="lg:col-span-3">
        <h2 className="mb-4 inline-flex items-center gap-2 text-lg font-semibold text-[#202163]">
          <ShieldCheck className="h-5 w-5 text-[#B38E34]" /> Current admins{" "}
          <span className="text-sm font-normal text-[#676767]">
            ({admins.length})
          </span>
        </h2>

        {loadError && (
          <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
          </p>
        )}

        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded bg-white" />
            ))}
          </div>
        ) : admins.length === 0 && !loadError ? (
          <p className="rounded-xl border border-[#dcdcdc] bg-white p-8 text-center text-sm text-[#676767]">
            No admins found.
          </p>
        ) : (
          <ul className="space-y-3">
            {admins.map((admin) => {
              const isSelf = admin.$id === user?.$id;
              return (
                <li
                  key={admin.$id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#dcdcdc] bg-white p-4 shadow-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#202163]">
                      {admin.name || "—"}{" "}
                      {isSelf && (
                        <span className="ml-1 rounded-full bg-[#202163]/10 px-2 py-0.5 text-xs font-medium text-[#202163]">
                          You
                        </span>
                      )}
                    </p>
                    <p className="truncate text-sm text-[#676767]">
                      {admin.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={isSelf || busyId === admin.$id}
                    onClick={() => handleRemove(admin)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#e3c9c9] px-3 py-1.5 text-sm font-semibold text-[#b02a2a] transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                    title={
                      isSelf ? "You can't remove your own admin access" : "Remove admin"
                    }
                  >
                    <ShieldOff className="h-4 w-4" />
                    {busyId === admin.$id ? "Removing…" : "Remove"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

export default AdminManagers;
