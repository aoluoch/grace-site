import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { adminList, adminUpdateStatus, adminDelete } from "../lib/api";
import { TABLES, ORGANIZATIONS } from "../lib/appwrite";
import AdminContentManager from "../components/admin/AdminContentManager";
import AdminSiteContent from "../components/admin/AdminSiteContent";
import AdminManagers from "../components/admin/AdminManagers";
import type { Models } from "appwrite";
import { LogOut, RefreshCw, Trash2, LayoutDashboard } from "lucide-react";

type Column = { key: string; label: string };

interface SubmissionView {
  tableId: string;
  label: string;
  columns: Column[];
  statuses: string[];
}

const SUBMISSION_VIEWS: SubmissionView[] = [
  {
    tableId: TABLES.prayerRequests,
    label: "Prayer Requests",
    columns: [
      { key: "name", label: "Name" },
      { key: "request", label: "Request" },
      { key: "contactPreference", label: "Contact" },
    ],
    statuses: ["new", "praying", "completed"],
  },
  {
    tableId: TABLES.appointments,
    label: "Appointments",
    columns: [
      { key: "name", label: "Name" },
      { key: "type", label: "Type" },
      { key: "phone", label: "Phone" },
      { key: "preferredDate", label: "Preferred" },
    ],
    statuses: ["pending", "accepted", "rescheduled", "rejected", "completed"],
  },
  {
    tableId: TABLES.registrations,
    label: "Registrations",
    columns: [
      { key: "name", label: "Name" },
      { key: "eventTitle", label: "Event" },
      { key: "attendanceType", label: "Attendance" },
      { key: "reference", label: "Ref" },
    ],
    statuses: ["registered", "cancelled", "attended"],
  },
  {
    tableId: TABLES.contactSubmissions,
    label: "Inquiries",
    columns: [
      { key: "name", label: "Name" },
      { key: "subject", label: "Subject" },
      { key: "message", label: "Message" },
    ],
    statuses: ["new", "read", "responded"],
  },
  {
    tableId: TABLES.testimonies,
    label: "Testimonies",
    columns: [
      { key: "name", label: "Name" },
      { key: "title", label: "Title" },
      { key: "body", label: "Testimony" },
    ],
    statuses: ["new", "approved", "rejected"],
  },
  {
    tableId: TABLES.subscribers,
    label: "Subscribers",
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "organization", label: "Ministry" },
    ],
    statuses: [],
  },
];

const orgLabel = (v?: string) =>
  ORGANIZATIONS.find((o) => o.value === v)?.label ?? v ?? "";

function formatCell(key: string, value: unknown): string {
  if (value === undefined || value === null || value === "") return "—";
  if (key === "organization") return orgLabel(value as string);
  if (key === "preferredDate") {
    const d = new Date(value as string);
    return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString();
  }
  return String(value);
}

function SubmissionsTable({ view }: { view: SubmissionView }) {
  const [rows, setRows] = useState<Models.Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    adminList(view.tableId)
      .then((res) => setRows(res.rows))
      .catch(() => setError("Could not load records."))
      .finally(() => setLoading(false));
  }, [view.tableId]);

  useEffect(() => {
    let active = true;
    adminList(view.tableId)
      .then((res) => active && setRows(res.rows))
      .catch(() => active && setError("Could not load records."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [view.tableId]);

  const updateStatus = async (rowId: string, status: string) => {
    await adminUpdateStatus(view.tableId, rowId, { status });
    setRows((prev) =>
      prev.map((r) => (r.$id === rowId ? { ...r, status } : r)),
    );
  };

  const remove = async (rowId: string) => {
    if (!confirm("Delete this record permanently?")) return;
    await adminDelete(view.tableId, rowId);
    setRows((prev) => prev.filter((r) => r.$id !== rowId));
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#202163]">
          {view.label}{" "}
          <span className="text-sm font-normal text-[#676767]">
            ({rows.length})
          </span>
        </h2>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-2 rounded-md border border-[#d8d8de] px-3 py-1.5 text-sm font-medium text-[#202163] hover:bg-[#202163]/5"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-white" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-[#dcdcdc] bg-white p-8 text-center text-sm text-[#676767]">
          No records yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#dcdcdc] bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-[#f6f6f9] text-xs uppercase tracking-wide text-[#676767]">
              <tr>
                {view.columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-semibold">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold">Received</th>
                {view.statuses.length > 0 && (
                  <th className="px-4 py-3 font-semibold">Status</th>
                )}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee]">
              {rows.map((row) => {
                const r = row as unknown as Record<string, unknown>;
                return (
                  <tr key={row.$id} className="align-top">
                    {view.columns.map((c) => (
                      <td
                        key={c.key}
                        className="max-w-[240px] px-4 py-3 text-[#212121]"
                      >
                        <span className="line-clamp-3">
                          {formatCell(c.key, r[c.key])}
                        </span>
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-[#676767]">
                      {new Date(row.$createdAt).toLocaleDateString()}
                    </td>
                    {view.statuses.length > 0 && (
                      <td className="px-4 py-3">
                        <select
                          value={(r.status as string) ?? view.statuses[0]}
                          onChange={(e) =>
                            updateStatus(row.$id, e.target.value)
                          }
                          className="rounded-md border border-[#d8d8de] px-2 py-1 text-xs"
                        >
                          {view.statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => remove(row.$id)}
                        className="text-[#b02a2a] hover:text-red-700"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const CONTENT_TABS = ["events", "sermons", "announcements"] as const;
const SITE_CONTENT_TAB = "site_content";
const ADMINS_TAB = "admins";
type TabKey = string;

function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>(SUBMISSION_VIEWS[0].tableId);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const activeSubmission = SUBMISSION_VIEWS.find((v) => v.tableId === tab);

  return (
    <div className="flex min-h-screen flex-col bg-[#efefef]">
      <header className="bg-[#1f2167] py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-7 w-7 text-[#B38E34]" />
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Ministry Control Center
              </h1>
              <p className="text-sm text-[#c6c8e8]">
                Signed in as {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="rounded-md border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              My dashboard
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-md bg-[#B38E34] px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-[#202163]"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {SUBMISSION_VIEWS.map((v) => (
            <TabButton
              key={v.tableId}
              active={tab === v.tableId}
              onClick={() => setTab(v.tableId)}
            >
              {v.label}
            </TabButton>
          ))}
          {CONTENT_TABS.map((c) => (
            <TabButton
              key={c}
              active={tab === c}
              onClick={() => setTab(c)}
            >
              Manage {c}
            </TabButton>
          ))}
          <TabButton
            active={tab === SITE_CONTENT_TAB}
            onClick={() => setTab(SITE_CONTENT_TAB)}
          >
            Site content
          </TabButton>
          <TabButton
            active={tab === ADMINS_TAB}
            onClick={() => setTab(ADMINS_TAB)}
          >
            Admins
          </TabButton>
        </div>

        <div className="mt-6">
          {activeSubmission ? (
            <SubmissionsTable key={activeSubmission.tableId} view={activeSubmission} />
          ) : tab === SITE_CONTENT_TAB ? (
            <AdminSiteContent />
          ) : tab === ADMINS_TAB ? (
            <AdminManagers />
          ) : (
            <AdminContentManager key={tab} kind={tab as (typeof CONTENT_TABS)[number]} />
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-colors ${
        active
          ? "bg-[#202163] text-white"
          : "bg-white text-[#202163] hover:bg-[#202163]/10"
      }`}
    >
      {children}
    </button>
  );
}

export default Admin;
