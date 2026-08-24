import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";
import { createClient } from "contentful";
import { getContentfulEnv } from "../lib/utils";
import type {
  Asset,
  Entry,
  EntryCollection,
  EntryFieldTypes,
  EntrySkeletonType,
} from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Options } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { ArrowLeft, Calendar, Clock, Share2, CalendarPlus } from "lucide-react";

interface EventSkeleton extends EntrySkeletonType {
  contentTypeId: "gamEvents";
  fields: {
    title: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    summary: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
    date?: EntryFieldTypes.Date;
  };
}

const getFirstLocaleString = (value: unknown): string | undefined => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const first = Object.values(value as Record<string, string | undefined>)[0];
    return typeof first === "string" ? first : undefined;
  }
  return undefined;
};

const formatEventDate = (
  iso?: string,
): { weekday: string; full: string; time?: string } | undefined => {
  if (!iso) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  const weekday = date.toLocaleDateString(undefined, { weekday: "long" });
  const full = date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const hasTime = /\d{1,2}:\d{2}/.test(iso);
  const time = hasTime
    ? date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
    : undefined;
  return { weekday, full, time };
};

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [entry, setEntry] = useState<Entry<EventSkeleton> | null>(null);
  const [assetsMap, setAssetsMap] = useState<Record<string, Asset>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loadedId, setLoadedId] = useState(eventId);

  // Reset to a loading state during render when navigating to a different event,
  // instead of calling setState synchronously inside the effect.
  if (eventId !== loadedId) {
    setLoadedId(eventId);
    setEntry(null);
    setAssetsMap({});
    setError(null);
    setLoading(true);
  }

  useEffect(() => {
    if (!eventId) return;
    let isMounted = true;

    const { spaceId, accessToken, host } = getContentfulEnv();
    const client = createClient({ space: spaceId, accessToken, host });

    client
      .getEntries<EventSkeleton>({
        content_type: "gamEvents",
        "sys.id": eventId,
        include: 2,
        limit: 1,
      })
      .then((res: EntryCollection<EventSkeleton>) => {
        if (!isMounted) return;
        const e = res.items?.[0] ?? null;
        const assets = (res.includes?.Asset ?? []) as Asset[];
        const map: Record<string, Asset> = {};
        assets.forEach((a: Asset) => {
          const aid = (a as Asset).sys?.id as string | undefined;
          if (aid) map[aid] = a;
        });
        setEntry(e);
        setAssetsMap(map);
      })
      .catch((e: unknown) => {
        if (!isMounted) return;
        const message = e instanceof Error ? e.message : "Failed to load event";
        setError(message);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [eventId]);

  const view = useMemo(() => {
    if (!entry) return null;
    const title = getFirstLocaleString(entry.fields.title) ?? "Untitled Event";
    const summary = getFirstLocaleString(entry.fields.summary) ?? "";
    const imageId = (entry.fields.image as unknown as { sys?: { id?: string } })
      ?.sys?.id;
    const asset = imageId ? assetsMap[imageId] : undefined;
    const rawUrl = getFirstLocaleString(
      (asset as Asset | undefined)?.fields?.file?.url,
    );
    const imageUrl = rawUrl
      ? rawUrl.startsWith("http")
        ? rawUrl
        : `https:${rawUrl}`
      : undefined;
    const descriptionDoc = entry.fields.description as Document | undefined;
    const dateIso = getFirstLocaleString(entry.fields.date);
    const date = formatEventDate(dateIso);
    return { title, summary, imageUrl, descriptionDoc, date };
  }, [entry, assetsMap]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: view?.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled or unsupported – no-op */
    }
  };

  const richTextOptions: Options = useMemo(
    () => ({
      renderMark: {
        [MARKS.BOLD]: (text) => (
          <strong className="font-semibold text-gray-900">{text}</strong>
        ),
        [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
        [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
        [MARKS.CODE]: (text) => (
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-blue-700">
            {text}
          </code>
        ),
      },
      renderNode: {
        [BLOCKS.HEADING_1]: (_n, children) => (
          <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">
            {children}
          </h2>
        ),
        [BLOCKS.HEADING_2]: (_n, children) => (
          <h3 className="mt-8 mb-3 text-xl font-bold text-gray-900">
            {children}
          </h3>
        ),
        [BLOCKS.HEADING_3]: (_n, children) => (
          <h4 className="mt-6 mb-3 text-lg font-semibold text-gray-900">
            {children}
          </h4>
        ),
        [BLOCKS.HEADING_4]: (_n, children) => (
          <h5 className="mt-6 mb-2 text-base font-semibold text-gray-900">
            {children}
          </h5>
        ),
        [BLOCKS.PARAGRAPH]: (_n, children) => (
          <p className="mb-5 text-[15px] leading-8 text-gray-700">{children}</p>
        ),
        [BLOCKS.UL_LIST]: (_n, children) => (
          <ul className="mb-6 space-y-3">{children}</ul>
        ),
        [BLOCKS.OL_LIST]: (_n, children) => (
          <ol className="mb-6 list-inside list-decimal space-y-3 text-gray-700">
            {children}
          </ol>
        ),
        [BLOCKS.LIST_ITEM]: (_n, children) => (
          <li className="flex gap-3 text-[15px] leading-7 text-gray-700">
            <span
              className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600"
              aria-hidden="true"
            />
            <div className="[&>p]:mb-0 flex-1">{children}</div>
          </li>
        ),
        [BLOCKS.QUOTE]: (_n, children) => (
          <blockquote className="my-6 border-l-4 border-blue-600 bg-blue-50/60 py-3 pl-5 pr-4 italic text-gray-700 [&>p]:mb-0">
            {children}
          </blockquote>
        ),
        [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,
        [INLINES.HYPERLINK]: (node, children) => (
          <a
            href={(node.data as { uri?: string }).uri}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
          >
            {children}
          </a>
        ),
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const assetId = node.data?.target?.sys?.id;
          if (assetId && assetsMap[assetId]) {
            const asset = assetsMap[assetId];
            const rawUrl = getFirstLocaleString(asset.fields?.file?.url);
            const imageUrl = rawUrl
              ? rawUrl.startsWith("http")
                ? rawUrl
                : `https:${rawUrl}`
              : undefined;
            if (imageUrl) {
              return (
                <img
                  src={`${imageUrl}?w=1000&fit=fill&fm=jpg&q=80`}
                  alt={getFirstLocaleString(asset.fields?.title) || "Embedded asset"}
                  className="my-6 w-full rounded-xl shadow-md"
                  loading="lazy"
                />
              );
            }
          }
          return null;
        },
      },
    }),
    [assetsMap],
  );

  if (loading) {
    return (
      <div className="min-h-[60vh]">
        <div className="h-72 w-full animate-pulse bg-gray-200 md:h-96" />
        <div className="container mx-auto max-w-5xl px-4 py-10">
          <div className="mb-4 h-8 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-4 w-11/12 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="mb-4 text-lg text-red-600">{error}</p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Events
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!view) {
    return (
      <>
        <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Event not found
          </h1>
          <p className="mb-6 text-gray-600">
            The event you're looking for may have been moved or removed.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Events
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <article className="bg-gray-50">
        {/* Hero banner */}
        <header className="relative flex min-h-[380px] w-full flex-col overflow-hidden md:min-h-[500px]">
          {view.imageUrl ? (
            <img
              src={`${view.imageUrl}?w=1920&fit=fill&fm=jpg&q=80`}
              alt={view.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

          <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-between gap-10 px-4 pt-6 pb-24 md:pb-28">
            <Link
              to="/events"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Events
            </Link>

            <div className="max-w-3xl">
              {view.date && (
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
                  <Calendar className="h-4 w-4" />
                  {view.date.weekday}, {view.date.full}
                </span>
              )}
              <h1 className="text-3xl font-bold leading-tight text-white drop-shadow-md md:text-5xl">
                {view.title}
              </h1>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="container mx-auto max-w-5xl px-4 pb-16">
          <div className="relative -mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main content card */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
                {view.imageUrl && (
                  <div className="flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4 sm:p-6">
                    <img
                      src={`${view.imageUrl}?w=1200&fm=jpg&q=85`}
                      alt={view.title}
                      className="max-h-[560px] w-full rounded-lg object-contain shadow-lg"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 md:p-10">
                  {view.summary && (
                    <p className="mb-8 border-l-4 border-blue-600 pl-5 text-lg font-medium leading-relaxed text-gray-800">
                      {view.summary}
                    </p>
                  )}

                  {view.descriptionDoc && (
                    <div className="text-gray-700">
                      {documentToReactComponents(
                        view.descriptionDoc,
                        richTextOptions,
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Event Details
                  </h2>

                  {view.date ? (
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Calendar className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Date
                          </p>
                          <p className="font-semibold text-gray-900">
                            {view.date.full}
                          </p>
                          <p className="text-sm text-gray-500">
                            {view.date.weekday}
                          </p>
                        </div>
                      </li>
                      {view.date.time && (
                        <li className="flex items-start gap-3">
                          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Clock className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                              Time
                            </p>
                            <p className="font-semibold text-gray-900">
                              {view.date.time}
                            </p>
                          </div>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Full event details are described in the section beside this
                      panel.
                    </p>
                  )}

                  <div className="mt-6 space-y-3 border-t border-gray-100 pt-6">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      <Share2 className="h-4 w-4" />
                      {copied ? "Link copied!" : "Share this event"}
                    </button>
                    <Link
                      to="/events"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <CalendarPlus className="h-4 w-4" />
                      See all events
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default EventDetail;
