import { useEffect, useMemo, useState } from "react";
import { createClient } from "contentful";
import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  MARKS,
  type Document,
} from "@contentful/rich-text-types";
import { Calendar, Megaphone } from "lucide-react";
import { getContentfulEnv } from "../lib/utils";

type AnnouncementItem = {
  id: string;
  title: string;
  body: Document;
  imageUrl?: string;
  category?: string;
  date: string;
};

const emptyDoc: Document = { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] };

// Fixed brand-aligned colors for known categories; anything else gets a
// stable color chosen from a small palette so the UI stays consistent.
const CATEGORY_COLORS: Record<string, string> = {
  Service: "bg-[#202163]",
  Prayer: "bg-[#1f5c2e]",
  Fasting: "bg-[#7c3aed]",
  Birthing: "bg-[#b45309]",
  Event: "bg-[#B38E34]",
  VBS: "bg-[#0e7490]",
  Youth: "bg-[#be123c]",
  Giving: "bg-[#0f766e]",
  General: "bg-[#4B4B67]",
};

const FALLBACK_PALETTE = [
  "bg-[#202163]",
  "bg-[#1f5c2e]",
  "bg-[#7c3aed]",
  "bg-[#b45309]",
  "bg-[#0e7490]",
  "bg-[#be123c]",
];

function categoryColor(category?: string): string {
  if (!category) return "bg-[#4B4B67]";
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  let hash = 0;
  for (let i = 0; i < category.length; i += 1) {
    hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_PALETTE[hash % FALLBACK_PALETTE.length];
}

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat("en-KE", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function toAssetUrl(rawUrl?: string): string {
  if (!rawUrl) return "";
  if (rawUrl.startsWith("//")) return `https:${rawUrl}`;
  if (rawUrl.startsWith("/")) return `https://images.ctfassets.net${rawUrl}`;
  return rawUrl;
}

const richTextOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <strong className="font-semibold text-[#1f2167]">{text}</strong>
    ),
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.CODE]: (text) => (
      <code className="rounded bg-[#ECECF3] px-1 py-0.5 text-[0.95em]">
        {text}
      </code>
    ),
    superscript: (text) => <sup>{text}</sup>,
    subscript: (text) => <sub>{text}</sub>,
    strikethrough: (text) => <s>{text}</s>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="text-[1.02rem] leading-[1.7] text-[#3a3a4a]">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_, children) => (
      <h3 className="text-2xl font-bold text-[#1f2167]">{children}</h3>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h4 className="text-xl font-bold text-[#1f2167]">{children}</h4>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h5 className="text-lg font-semibold text-[#1f2167]">{children}</h5>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="space-y-2 pl-1">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="list-decimal space-y-2 pl-5 text-[#3a3a4a]">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => (
      <li className="flex gap-3">
        <span
          className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#B38E34]"
          aria-hidden="true"
        />
        <div className="[&>p]:mb-0 flex-1">{children}</div>
      </li>
    ),
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="border-l-4 border-[#B38E34] bg-[#faf6ec] py-2 pl-4 pr-3 italic text-[#2f2f2f] [&>p]:mb-0">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-[#e2e2ec]" />,
    [INLINES.HYPERLINK]: (node, children) => {
      const href = (node.data as { uri?: string })?.uri;
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[#1f2167] underline decoration-[#B38E34]/50 underline-offset-2 hover:text-[#B38E34]"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const file = (
        node.data?.target as {
          fields?: { file?: { url?: string }; title?: string };
        }
      )?.fields?.file;
      const url = toAssetUrl(file?.url);
      if (!url) return null;
      return (
        <img
          src={`${url}?w=1000&fm=webp&q=85`}
          alt=""
          className="my-4 w-full rounded-lg"
          loading="lazy"
        />
      );
    },
  },
};

function AnnouncementCard({ item }: { item: AnnouncementItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#e8e8f0] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {item.imageUrl && (
        <div className="flex items-center justify-center bg-linear-to-br from-[#f0f0f5] to-[#e6e6ee] p-3 sm:p-4">
          <img
            src={`${item.imageUrl}?w=1000&fm=webp&q=85`}
            alt={item.title}
            className="max-h-[520px] w-full rounded-lg object-contain"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          {item.category && (
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ${categoryColor(
                item.category,
              )}`}
            >
              {item.category}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm text-[#8a8a9a]">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(item.date)}
          </span>
        </div>

        <h2 className="mb-4 text-2xl font-bold leading-snug text-[#1f2167] sm:text-[1.7rem]">
          {item.title}
        </h2>

        <div className="space-y-3">
          {documentToReactComponents(item.body, richTextOptions)}
        </div>
      </div>
    </article>
  );
}

function AnnouncementComponent() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    let isMounted = true;

    const fetchAnnouncements = async () => {
      try {
        const { spaceId, accessToken, host } = getContentfulEnv();
        const client = createClient({ space: spaceId, accessToken, host });

        const response = await client.withoutUnresolvableLinks.getEntries({
          content_type: "announcement",
          order: ["-fields.date"],
          include: 2,
          limit: 50,
        });

        if (!isMounted) return;

        const items: AnnouncementItem[] = response.items
          .map((item) => {
            const fields = item.fields as Record<string, unknown>;

            const title = typeof fields.title === "string" ? fields.title : "";
            const category =
              typeof fields.category === "string" ? fields.category : undefined;
            const date = typeof fields.date === "string" ? fields.date : "";

            const bodyField = fields.body;
            const body =
              bodyField &&
              typeof bodyField === "object" &&
              (bodyField as { nodeType?: string }).nodeType === BLOCKS.DOCUMENT
                ? (bodyField as Document)
                : emptyDoc;

            const imageField = fields.image as
              | {
                  fields?: {
                    file?: { url?: string } | Record<string, { url?: string }>;
                  };
                }
              | undefined;

            let imageUrl: string | undefined;
            if (imageField?.fields?.file) {
              const file = imageField.fields.file;
              if ("url" in file && typeof file.url === "string") {
                imageUrl = toAssetUrl(file.url) || undefined;
              } else {
                const localized = Object.values(
                  file as Record<string, { url?: string }>,
                ).find((f) => f?.url);
                if (localized?.url)
                  imageUrl = toAssetUrl(localized.url) || undefined;
              }
            }

            if (!title || !date) return null;

            return {
              id: item.sys.id,
              title,
              body,
              imageUrl,
              category,
              date,
            } satisfies AnnouncementItem;
          })
          .filter(
            (i): i is NonNullable<typeof i> => i !== null,
          ) as AnnouncementItem[];

        setAnnouncements(items);
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load announcements.",
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAnnouncements();
    return () => {
      isMounted = false;
    };
  }, []);

  const sorted = useMemo(
    () =>
      [...announcements].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [announcements],
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    sorted.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [sorted]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return sorted;
    return sorted.filter((a) => a.category === activeCategory);
  }, [sorted, activeCategory]);

  if (loading) {
    return (
      <div className="space-y-6">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-2xl border border-[#e8e8f0] bg-white"
          >
            <div className="h-56 w-full bg-[#ECECF3]" />
            <div className="space-y-3 p-8">
              <div className="h-4 w-32 rounded bg-[#ECECF3]" />
              <div className="h-6 w-3/4 rounded bg-[#ECECF3]" />
              <div className="h-4 w-full rounded bg-[#ECECF3]" />
              <div className="h-4 w-5/6 rounded bg-[#ECECF3]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e8e8f0] bg-white py-16 text-center">
        <Megaphone className="mx-auto mb-4 h-10 w-10 text-[#c3c3d2]" />
        <p className="text-lg text-[#4B4B67]">No announcements at this time.</p>
        <p className="mt-1 text-sm text-[#8a8a9a]">
          Please check back soon for the latest updates.
        </p>
      </div>
    );
  }

  return (
    <div>
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterChip
            label="All"
            count={sorted.length}
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              count={sorted.filter((a) => a.category === cat).length}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      )}

      <div className="space-y-8">
        {filtered.map((item) => (
          <AnnouncementCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-[#4B4B67]">
          No announcements in this category.
        </p>
      )}
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-[#1f2167] text-white shadow-sm"
          : "border border-[#dcdce6] bg-white text-[#4B4B67] hover:border-[#B38E34] hover:text-[#1f2167]"
      }`}
    >
      {label}
      <span
        className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
          active ? "bg-white/20 text-white" : "bg-[#eeeef4] text-[#6b6b80]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

export default AnnouncementComponent;
