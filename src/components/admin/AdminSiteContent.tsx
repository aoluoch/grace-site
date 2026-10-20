import { useEffect, useState } from "react";
import { getSiteContent, saveSiteContent } from "../../lib/api";
import {
  SITE_KEYS,
  DEFAULT_CORE_VALUES,
  DEFAULT_GIVING,
  DEFAULT_CONTACT,
  type CoreValuesContent,
  type GivingContent,
  type GivingEntry,
  type ContactContent,
} from "../../lib/siteContent";
import {
  Field,
  TextInput,
  TextArea,
  SubmitButton,
  FormStatus,
  type Status,
} from "../forms/formControls";
import { Plus, Trash2 } from "lucide-react";

type Section = "values" | "giving" | "contact";

const SECTIONS: { id: Section; label: string }[] = [
  { id: "values", label: "Core Values" },
  { id: "giving", label: "Giving Details" },
  { id: "contact", label: "Contact & Social" },
];

function AdminSiteContent() {
  const [section, setSection] = useState<Section>("values");

  return (
    <div>
      <div className="mb-5 rounded-xl border border-[#dcdcdc] bg-white p-4 text-sm text-[#555]">
        These sections are <span className="font-semibold">not</span> managed by
        Contentful. Edits here publish instantly to the live site. Leave a block
        untouched to keep its current built-in content. (The Shop link is not
        managed here and is intentionally left untouched.)
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSection(s.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              section === s.id
                ? "bg-[#202163] text-white"
                : "bg-white text-[#202163] hover:bg-[#202163]/10"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {section === "values" && <CoreValuesEditor />}
      {section === "giving" && <GivingEditor />}
      {section === "contact" && <ContactEditor />}
    </div>
  );
}

/* ---------------------------- shared shell ------------------------- */

function EditorCard({
  title,
  description,
  onSubmit,
  saving,
  status,
  children,
}: {
  title: string;
  description: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  saving: boolean;
  status: Status;
  children: React.ReactNode;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-[#dcdcdc] bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-xl font-semibold text-[#202163]">{title}</h2>
      <p className="mt-1 text-sm text-[#676767]">{description}</p>
      <div className="mt-6 space-y-5">{children}</div>
      <div className="mt-6 space-y-4">
        <FormStatus status={status} />
        <SubmitButton loading={saving}>Publish changes</SubmitButton>
      </div>
    </form>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#e3c9c9] text-[#b02a2a] hover:bg-red-50"
      aria-label="Remove"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-md border border-[#d8d8de] px-3 py-1.5 text-sm font-semibold text-[#202163] hover:bg-[#202163]/5"
    >
      <Plus className="h-4 w-4" /> {children}
    </button>
  );
}

function useEditorContent<T>(key: string, fallback: T) {
  const [content, setContent] = useState<T>(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    getSiteContent<T>(key)
      .then((data) => {
        if (!active) return;
        if (data) setContent(data);
        setLoaded(true);
      })
      .catch(() => active && setLoaded(true));
    return () => {
      active = false;
    };
  }, [key]);

  return { content, setContent, loaded };
}

/* --------------------------- Core values -------------------------- */

function CoreValuesEditor() {
  const { content, setContent, loaded } = useEditorContent<CoreValuesContent>(
    SITE_KEYS.values,
    DEFAULT_CORE_VALUES,
  );
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const cleaned: CoreValuesContent = {
        ...content,
        values: content.values.map((v) => v.trim()).filter(Boolean),
      };
      await saveSiteContent(SITE_KEYS.values, cleaned, "Core Values");
      setContent(cleaned);
      setStatus({ type: "success", message: "Core values published." });
    } catch {
      setStatus({ type: "error", message: "Could not save. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return <Skeleton />;

  return (
    <EditorCard
      title="Core Values"
      description="Shown in the “Our Core Values” section on the homepage."
      onSubmit={save}
      saving={saving}
      status={status}
    >
      <Field label="Heading" required>
        <TextInput
          value={content.heading}
          onChange={(e) =>
            setContent({ ...content, heading: e.target.value })
          }
        />
      </Field>
      <Field label="Intro sentence" hint="The values are appended after this.">
        <TextArea
          value={content.intro}
          onChange={(e) => setContent({ ...content, intro: e.target.value })}
        />
      </Field>
      <div>
        <p className="mb-2 block text-sm font-semibold text-[#202163]">Values</p>
        <div className="space-y-2">
          {content.values.map((value, i) => (
            <div key={i} className="flex items-center gap-2">
              <TextInput
                value={value}
                onChange={(e) => {
                  const next = [...content.values];
                  next[i] = e.target.value;
                  setContent({ ...content, values: next });
                }}
              />
              <RemoveButton
                onClick={() =>
                  setContent({
                    ...content,
                    values: content.values.filter((_, idx) => idx !== i),
                  })
                }
              />
            </div>
          ))}
        </div>
        <div className="mt-3">
          <AddButton
            onClick={() =>
              setContent({ ...content, values: [...content.values, ""] })
            }
          >
            Add value
          </AddButton>
        </div>
      </div>
    </EditorCard>
  );
}

/* --------------------------- Giving ------------------------------- */

function EntryRows({
  entries,
  onChange,
}: {
  entries: GivingEntry[];
  onChange: (entries: GivingEntry[]) => void;
}) {
  return (
    <div className="space-y-2">
      {entries.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <TextInput
            placeholder="Label"
            value={entry.label}
            onChange={(e) => {
              const next = [...entries];
              next[i] = { ...next[i], label: e.target.value };
              onChange(next);
            }}
          />
          <TextInput
            placeholder="Value"
            value={entry.value}
            onChange={(e) => {
              const next = [...entries];
              next[i] = { ...next[i], value: e.target.value };
              onChange(next);
            }}
          />
          <RemoveButton
            onClick={() => onChange(entries.filter((_, idx) => idx !== i))}
          />
        </div>
      ))}
      <AddButton onClick={() => onChange([...entries, { label: "", value: "" }])}>
        Add entry
      </AddButton>
    </div>
  );
}

function GivingEditor() {
  const { content, setContent, loaded } = useEditorContent<GivingContent>(
    SITE_KEYS.giving,
    DEFAULT_GIVING,
  );
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await saveSiteContent(SITE_KEYS.giving, content, "Giving Details");
      setStatus({ type: "success", message: "Giving details published." });
    } catch {
      setStatus({ type: "error", message: "Could not save. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return <Skeleton />;

  return (
    <EditorCard
      title="Giving Details"
      description="Payment options shown on the Giving page and homepage giving section."
      onSubmit={save}
      saving={saving}
      status={status}
    >
      <Field label="Header title">
        <TextInput
          value={content.title}
          onChange={(e) => setContent({ ...content, title: e.target.value })}
        />
      </Field>

      <div>
        <p className="mb-2 block text-sm font-semibold text-[#202163]">
          Regional blocks
        </p>
        <div className="space-y-4">
          {content.blocks.map((block, bi) => (
            <div
              key={bi}
              className="rounded-lg border border-[#e4e4ea] bg-[#fafafc] p-4"
            >
              <div className="flex items-center gap-2">
                <TextInput
                  placeholder="Region (e.g. USA)"
                  value={block.region}
                  onChange={(e) => {
                    const next = [...content.blocks];
                    next[bi] = { ...next[bi], region: e.target.value };
                    setContent({ ...content, blocks: next });
                  }}
                />
                <RemoveButton
                  onClick={() =>
                    setContent({
                      ...content,
                      blocks: content.blocks.filter((_, idx) => idx !== bi),
                    })
                  }
                />
              </div>
              <div className="mt-3">
                <EntryRows
                  entries={block.entries}
                  onChange={(entries) => {
                    const next = [...content.blocks];
                    next[bi] = { ...next[bi], entries };
                    setContent({ ...content, blocks: next });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <AddButton
            onClick={() =>
              setContent({
                ...content,
                blocks: [...content.blocks, { region: "", entries: [] }],
              })
            }
          >
            Add region block
          </AddButton>
        </div>
      </div>

      <div>
        <p className="mb-2 block text-sm font-semibold text-[#202163]">
          Other giving options
        </p>
        <EntryRows
          entries={content.sideEntries}
          onChange={(sideEntries) => setContent({ ...content, sideEntries })}
        />
      </div>
    </EditorCard>
  );
}

/* --------------------------- Contact ------------------------------ */

function ContactEditor() {
  const { content, setContent, loaded } = useEditorContent<ContactContent>(
    SITE_KEYS.contact,
    DEFAULT_CONTACT,
  );
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await saveSiteContent(SITE_KEYS.contact, content, "Contact & Social");
      setStatus({ type: "success", message: "Contact details published." });
    } catch {
      setStatus({ type: "error", message: "Could not save. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return <Skeleton />;

  return (
    <EditorCard
      title="Contact & Social"
      description="Phone, email, address, website and social links shown in the footer."
      onSubmit={save}
      saving={saving}
      status={status}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone">
          <TextInput
            value={content.phone}
            onChange={(e) => setContent({ ...content, phone: e.target.value })}
          />
        </Field>
        <Field label="Email">
          <TextInput
            value={content.email}
            onChange={(e) => setContent({ ...content, email: e.target.value })}
          />
        </Field>
        <Field label="Address">
          <TextInput
            value={content.address}
            onChange={(e) =>
              setContent({ ...content, address: e.target.value })
            }
          />
        </Field>
        <Field label="Website">
          <TextInput
            value={content.website}
            onChange={(e) =>
              setContent({ ...content, website: e.target.value })
            }
          />
        </Field>
      </div>

      <div>
        <p className="mb-2 block text-sm font-semibold text-[#202163]">
          Social links
        </p>
        <p className="mb-2 text-xs text-[#676767]">
          Use names Facebook, YouTube, Instagram or TikTok to show the matching
          icon; other names show a generic icon.
        </p>
        <div className="space-y-2">
          {content.socials.map((social, i) => (
            <div key={i} className="flex items-center gap-2">
              <TextInput
                placeholder="Name"
                value={social.name}
                onChange={(e) => {
                  const next = [...content.socials];
                  next[i] = { ...next[i], name: e.target.value };
                  setContent({ ...content, socials: next });
                }}
              />
              <TextInput
                placeholder="https://..."
                value={social.href}
                onChange={(e) => {
                  const next = [...content.socials];
                  next[i] = { ...next[i], href: e.target.value };
                  setContent({ ...content, socials: next });
                }}
              />
              <RemoveButton
                onClick={() =>
                  setContent({
                    ...content,
                    socials: content.socials.filter((_, idx) => idx !== i),
                  })
                }
              />
            </div>
          ))}
        </div>
        <div className="mt-3">
          <AddButton
            onClick={() =>
              setContent({
                ...content,
                socials: [...content.socials, { name: "", href: "" }],
              })
            }
          >
            Add social link
          </AddButton>
        </div>
      </div>
    </EditorCard>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-14 animate-pulse rounded bg-white" />
      ))}
    </div>
  );
}

export default AdminSiteContent;
