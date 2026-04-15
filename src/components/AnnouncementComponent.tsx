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

const CATEGORY_COLORS: Record<string, string> = {
  Service: "bg-[#202163] text-white",
  Prayer: "bg-[#1f5c2e] text-white",
  Event: "bg-[#B38E34] text-white",
  General: "bg-[#4B4B67] text-white",
  Youth: "bg-[#7c3aed] text-white",
  Giving: "bg-[#b45309] text-white",
};

function categoryStyle(category?: string): string {
  if (!category) return "bg-[#4B4B67] text-white";
  return CATEGORY_COLORS[category] ?? "bg-[#4B4B67] text-white";
}

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

const richTextOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
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
      <p className="text-[1.02rem] leading-[1.65] text-[#222]">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_, children) => (
      <h3 className="text-2xl font-semibold text-[#1f2167]">{children}</h3>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h4 className="text-xl font-semibold text-[#1f2167]">{children}</h4>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h5 className="text-lg font-semibold text-[#1f2167]">{children}</h5>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="list-disc space-y-1.5 pl-5">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="list-decimal space-y-1.5 pl-5">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="border-l-4 border-[#B38E34] pl-3 italic text-[#2f2f2f]">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-[#d5d5df]" />,
    [INLINES.HYPERLINK]: (node, children) => {
      const href = (node.data as { uri?: string })?.uri;
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="underline text-[#1f2167] hover:text-[#B38E34]"
        >
          {children}
        </a>
      );
    },
  },
};

function toAssetUrl(rawUrl?: string): string {
  if (!rawUrl) return "";
  if (rawUrl.startsWith("//")) return `https:${rawUrl}`;
  if (rawUrl.startsWith("/")) return `https://images.ctfassets.net${rawUrl}`;
  return rawUrl;
}

function AnnouncementCard({ item }: { item: AnnouncementItem }) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#ECECF3] bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative overflow-hidden w-full md:w-2/5 lg:w-1/3 shrink-0 bg-[#ECECF3] min-h-48 sm:min-h-56 md:h-full">
          {item.imageUrl ? (
            <img
              src={`${item.imageUrl}?w=800&fm=webp&q=85`}
              alt={item.title}
              className="w-full h-full object-contain sm:object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#ECECF3] to-[#D8D8E5] flex items-center justify-center">
              <svg
                className="w-16 h-16 text-[#B8B8C8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {item.category && (
              <span
                className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${categoryStyle(item.category)}`}
              >
                {item.category}
              </span>
            )}
            <span className="text-sm text-[#888]">{formatDate(item.date)}</span>
          </div>

          <h3 className="mb-3 text-xl font-bold leading-snug text-[#202163] sm:text-2xl">
            {item.title}
          </h3>

          <div className="space-y-3">
            {documentToReactComponents(item.body, richTextOptions)}
          </div>
        </div>
      </div>
    </article>
  );
}

function AnnouncementComponent() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAnnouncements = async () => {
      try {
        const { spaceId, accessToken, host } = getContentfulEnv();
        const client = createClient({ space: spaceId, accessToken, host });

        const response = await client.withoutUnresolvableLinks.getEntries({
          content_type: "announcement",
          order: ["-fields.date"],
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

  if (loading) {
    return <div className="py-10 text-[#4B4B67]">Loading announcements...</div>;
  }

  if (error) {
    return <div className="py-10 text-red-600">{error}</div>;
  }

  if (sorted.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-[#4B4B67]">No announcements at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sorted.map((item) => (
        <AnnouncementCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default AnnouncementComponent;
