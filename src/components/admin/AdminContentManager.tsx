import { useEffect, useRef, useState } from "react";
import {
  adminCreate,
  adminDelete,
  adminList,
  adminUpdate,
} from "../../lib/api";
import { TABLES, ORGANIZATIONS } from "../../lib/appwrite";
import type { Models } from "appwrite";
import {
  Field,
  TextInput,
  TextArea,
  SubmitButton,
  FormStatus,
  type Status,
} from "../forms/formControls";
import { Eye, EyeOff, Pencil, Trash2, X } from "lucide-react";

type ContentKind = "sermons";

const TABLE_FOR: Record<ContentKind, string> = {
  sermons: TABLES.sermons,
};

type Row = Models.Row & Record<string, unknown>;

const str = (v: unknown): string => (typeof v === "string" ? v : "");

/**
 * Trim a form value; return `null` when empty. Sending `null` (rather than an
 * empty string) clears optional columns on update and satisfies format-
 * constrained columns like URL fields, which reject empty strings.
 */
const emptyToNull = (v: FormDataEntryValue | null): string | null => {
  const s = typeof v === "string" ? v.trim() : "";
  return s === "" ? null : s;
};

/** Build the row payload for a given kind from the submitted form. */
function buildData(fd: FormData): Record<string, unknown> {
  return {
    title: fd.get("title"),
    speaker: emptyToNull(fd.get("speaker")),
    description: emptyToNull(fd.get("description")),
    videoUrl: emptyToNull(fd.get("videoUrl")),
    audioUrl: emptyToNull(fd.get("audioUrl")),
    topic: emptyToNull(fd.get("topic")),
    published: fd.get("published") === "on",
  };
}

function DetailLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  if (!value) return null;
  return (
    <p className="break-words text-sm text-[#212121] [overflow-wrap:anywhere]">
      <span className="font-semibold text-[#676767]">{label}: </span>
      {value}
    </p>
  );
}

/** Every stored field, wrapped so long titles, bodies, and links stay readable. */
function ContentDetails({ row }: { row: Row }) {
  const description = str(row.description);
  const body = str(row.body);
  const date = str(row.date);
  const publishedAt = str(row.publishedAt);
  const when = date || publishedAt;
  const whenLabel = date ? "Date" : "Published";
  let whenText = "";
  if (when) {
    const d = new Date(when);
    whenText = Number.isNaN(d.getTime()) ? when : d.toLocaleString();
  }

  return (
    <div className="mt-2 space-y-1.5">
      {description && (
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-[#212121]">
          {description}
        </p>
      )}
      {body && (
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-[#212121]">
          {body}
        </p>
      )}
      <DetailLine label={whenLabel} value={whenText} />
      <DetailLine label="Speaker" value={str(row.speaker)} />
      <DetailLine label="Topic" value={str(row.topic)} />
      <DetailLine label="Location" value={str(row.location)} />
      <DetailLine label="Category" value={str(row.category)} />
      <DetailLine
        label="Ministry"
        value={
          ORGANIZATIONS.find((o) => o.value === str(row.organization))?.label ??
          str(row.organization)
        }
      />
      <DetailLine label="Video" value={str(row.videoUrl)} />
      <DetailLine label="Audio" value={str(row.audioUrl)} />
      <DetailLine label="Image" value={str(row.imageUrl)} />
      {typeof row.registrationOpen === "boolean" && (
        <DetailLine
          label="Registration"
          value={row.registrationOpen ? "Open" : "Closed"}
        />
      )}
    </div>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-[#202163]">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-[#d8d8de] text-[#B38E34] focus:ring-[#B38E34]"
      />
      {label}
    </label>
  );
}

function AdminContentManager({ kind }: { kind: ContentKind }) {
  const tableId = TABLE_FOR[kind];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    adminList(tableId)
      .then((res) => active && setRows(res.rows as Row[]))
      .catch(() => active && setRows([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [tableId]);

  const editing = editingId
    ? rows.find((r) => r.$id === editingId) ?? null
    : null;

  const startEdit = (row: Row) => {
    setStatus(null);
    setEditingId(row.$id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setStatus(null);
  };

  const remove = async (rowId: string) => {
    if (!confirm("Delete this item permanently?")) return;
    setBusyId(rowId);
    try {
      await adminDelete(tableId, rowId);
      setRows((prev) => prev.filter((r) => r.$id !== rowId));
      if (editingId === rowId) setEditingId(null);
    } catch {
      alert("Could not delete this item. Please try again.");
    } finally {
      setBusyId(null);
    }
  };

  const togglePublished = async (row: Row) => {
    setBusyId(row.$id);
    const next = !row.published;
    try {
      const updated = await adminUpdate(tableId, row.$id, { published: next });
      setRows((prev) =>
        prev.map((r) => (r.$id === row.$id ? (updated as Row) : r)),
      );
    } catch {
      alert("Could not change the publish status. Please try again.");
    } finally {
      setBusyId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSaving(true);
    setStatus(null);
    try {
      const data = buildData(fd);
      if (editingId) {
        const updated = await adminUpdate(tableId, editingId, data);
        setRows((prev) =>
          prev.map((r) => (r.$id === editingId ? (updated as Row) : r)),
        );
        setEditingId(null);
        setStatus({ type: "success", message: "Changes saved." });
      } else {
        const created = await adminCreate(tableId, data);
        setRows((prev) => [created as Row, ...prev]);
        form.reset();
        setStatus({ type: "success", message: "Published successfully." });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Could not save. Please check the fields and try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const singular = kind.slice(0, -1);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Create / edit form */}
      <section className="lg:col-span-2" ref={formRef}>
        <div className="rounded-xl border border-[#dcdcdc] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold capitalize text-[#202163]">
              {editing ? `Edit ${singular}` : `New ${singular}`}
            </h2>
            {editing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#676767] hover:text-[#202163]"
              >
                <X className="h-4 w-4" /> Cancel
              </button>
            )}
          </div>

          {/* key forces the uncontrolled inputs to re-init with the right
              default values when switching between create and edit. */}
          <form
            key={editingId ?? "new"}
            onSubmit={handleSubmit}
            className="mt-4 space-y-4"
          >
            <Field label="Title" required>
              <TextInput
                name="title"
                required
                defaultValue={str(editing?.title)}
              />
            </Field>

            <Field label="Speaker">
              <TextInput name="speaker" defaultValue={str(editing?.speaker)} />
            </Field>
            <Field label="Topic">
              <TextInput name="topic" defaultValue={str(editing?.topic)} />
            </Field>
            <Field label="Video URL">
              <TextInput
                name="videoUrl"
                placeholder="https://youtube.com/..."
                defaultValue={str(editing?.videoUrl)}
              />
            </Field>
            <Field label="Audio URL">
              <TextInput
                name="audioUrl"
                placeholder="https://..."
                defaultValue={str(editing?.audioUrl)}
              />
            </Field>
            <Field label="Description">
              <TextArea
                name="description"
                defaultValue={str(editing?.description)}
              />
            </Field>

            <Checkbox
              name="published"
              label="Published (visible on the site)"
              defaultChecked={editing ? Boolean(editing.published) : true}
            />

            <FormStatus status={status} />
            <SubmitButton loading={saving}>
              {editing ? "Save changes" : "Publish"}
            </SubmitButton>
          </form>
        </div>
      </section>

      {/* Existing list */}
      <section className="lg:col-span-3">
        <h2 className="mb-4 text-lg font-semibold capitalize text-[#202163]">
          Published {kind}{" "}
          <span className="text-sm font-normal text-[#676767]">
            ({rows.length})
          </span>
        </h2>
        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded bg-white" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <p className="rounded-xl border border-[#dcdcdc] bg-white p-8 text-center text-sm text-[#676767]">
            Nothing here yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {rows.map((row) => {
              const isPublished = Boolean(row.published);
              const isBusy = busyId === row.$id;
              return (
                <li
                  key={row.$id}
                  className={`flex items-start justify-between gap-3 rounded-xl border bg-white p-4 shadow-sm ${
                    editingId === row.$id
                      ? "border-[#B38E34]"
                      : "border-[#dcdcdc]"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="break-words font-semibold text-[#202163]">
                        {str(row.title) || "Untitled"}
                      </p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          isPublished
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <ContentDetails row={row} />
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => togglePublished(row)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#d8d8de] text-[#202163] hover:bg-[#202163]/5 disabled:opacity-40"
                      title={isPublished ? "Unpublish" : "Publish"}
                    >
                      {isPublished ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => startEdit(row)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#d8d8de] text-[#202163] hover:bg-[#202163]/5"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => remove(row.$id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#e3c9c9] text-[#b02a2a] hover:bg-red-50 disabled:opacity-40"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

export default AdminContentManager;
