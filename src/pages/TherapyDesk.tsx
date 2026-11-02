import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, RefreshCw } from "lucide-react";
import type { Models } from "appwrite";
import { useAuth } from "../context/AuthContext";
import { adminList } from "../lib/api";
import { TABLES } from "../lib/appwrite";
import { helpKindLabel } from "../lib/professionalHelp";

function TherapyDesk() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Models.Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    adminList(TABLES.professionalHelp)
      .then((res) => setRows(res.rows))
      .catch(() => setError("Could not load requests."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let active = true;
    adminList(TABLES.professionalHelp)
      .then((res) => active && setRows(res.rows))
      .catch(() => active && setError("Could not load requests."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#efefef]">
      <header className="bg-[#1f2167] py-8">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B38E34]">
              Professional care
            </p>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Care desk
            </h1>
            <p className="text-sm text-[#c6c8e8]">Signed in as {user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md bg-[#B38E34] px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-[#202163]"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-[#202163]">
            Help requests{" "}
            <span className="text-sm font-normal text-[#676767]">
              ({rows.length})
            </span>
          </h2>
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-2 rounded-md border border-[#d8d8de] bg-white px-3 py-1.5 text-sm font-medium text-[#202163] hover:bg-[#202163]/5"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>
        <p className="mb-6 text-sm text-[#676767]">
          These are the requests people sent for professional help. The
          ministry office updates the status from the control center.
        </p>

        {error && (
          <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-xl bg-white" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <p className="rounded-xl border border-[#dcdcdc] bg-white p-8 text-center text-sm text-[#676767]">
            No requests yet.
          </p>
        ) : (
          <div className="space-y-4">
            {rows.map((row) => {
              const item = row as unknown as {
                fullName?: string;
                email?: string;
                phone?: string;
                helpType?: string;
                status?: string;
              };
              return (
                <article
                  key={row.$id}
                  className="rounded-xl border border-[#dcdcdc] bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[#202163]">
                        {item.fullName || "—"}
                      </h3>
                      <p className="mt-1 text-sm text-[#676767]">
                        Received {new Date(row.$createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#202163]/10 px-3 py-1 text-xs font-semibold capitalize text-[#202163]">
                      {(item.status || "new").replaceAll("_", " ")}
                    </span>
                  </div>
                  <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#676767]">
                        Email
                      </dt>
                      <dd className="mt-1 break-all text-sm text-[#212121]">
                        {item.email ? (
                          <a
                            href={`mailto:${item.email}`}
                            className="font-medium text-[#202163] hover:text-[#B38E34]"
                          >
                            {item.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#676767]">
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm text-[#212121]">
                        {item.phone ? (
                          <a
                            href={`tel:${item.phone}`}
                            className="font-medium text-[#202163] hover:text-[#B38E34]"
                          >
                            {item.phone}
                          </a>
                        ) : (
                          "—"
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#676767]">
                        Kind of help
                      </dt>
                      <dd className="mt-1 text-sm text-[#212121]">
                        {helpKindLabel(item.helpType)}
                      </dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default TherapyDesk;
