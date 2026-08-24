import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "contentful";
import { getContentfulEnv } from "../lib/utils";
import type {
  Asset,
  Entry,
  EntryCollection,
  EntryFieldTypes,
  EntrySkeletonType,
} from "contentful";

interface EventSkeleton extends EntrySkeletonType {
  contentTypeId: "gamEvents";
  fields: {
    title: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    summary: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.RichText;
    date: EntryFieldTypes.Date;
  };
}

type EventCard = {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  date: Date | null;
};

const getFirstLocaleString = (value: unknown): string | undefined => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const first = Object.values(value as Record<string, string | undefined>)[0];
    return typeof first === "string" ? first : undefined;
  }
  return undefined;
};

const getLinkId = (link: unknown): string | undefined => {
  if (!link || typeof link !== "object") return undefined;
  const sys = (link as { sys?: { id?: string } }).sys;
  return sys?.id;
};

const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const EventComponent = () => {
  const [events, setEvents] = useState<Entry<EventSkeleton>[]>([]);
  const [assetsMap, setAssetsMap] = useState<Record<string, Asset>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const { spaceId, accessToken, host } = getContentfulEnv();
    const client = createClient({ space: spaceId, accessToken, host });

    client
      .getEntries<EventSkeleton>({
        content_type: "gamEvents",
        include: 2,
        order: ["-fields.date"],
      })
      .then((response: EntryCollection<EventSkeleton>) => {
        if (!isMounted) return;
        const items = response.items ?? [];
        const assets = (response.includes?.Asset ?? []) as Asset[];
        const map: Record<string, Asset> = {};
        assets.forEach((a: Asset) => {
          const id = (a as Asset).sys?.id as string | undefined;
          if (id) map[id] = a;
        });
        setEvents(items);
        setAssetsMap(map);
      })
      .catch((e: unknown) => {
        if (!isMounted) return;
        const message =
          e instanceof Error ? e.message : "Failed to load events";
        setError(message);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const { upcoming, past } = useMemo(() => {
    const cards: EventCard[] = events.map((event) => {
      const title =
        getFirstLocaleString(event.fields.title) ?? "Untitled Event";
      const summary = getFirstLocaleString(event.fields.summary) ?? "";
      const imageId = getLinkId(event.fields.image);
      const asset = imageId ? assetsMap[imageId] : undefined;
      const rawUrl = getFirstLocaleString(
        (asset as Asset | undefined)?.fields?.file?.url,
      );
      const imageUrl = rawUrl
        ? rawUrl.startsWith("http")
          ? rawUrl
          : `https:${rawUrl}`
        : undefined;

      const rawDate = getFirstLocaleString(event.fields.date);
      const parsed = rawDate ? new Date(rawDate) : null;
      const date = parsed && !Number.isNaN(parsed.getTime()) ? parsed : null;

      return { id: event.sys.id, title, summary, imageUrl, date };
    });

    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const upcoming: EventCard[] = [];
    const past: EventCard[] = [];

    cards.forEach((card) => {
      if (card.date && card.date >= startOfToday) {
        upcoming.push(card);
      } else {
        past.push(card);
      }
    });

    upcoming.sort((a, b) => {
      const at = a.date ? a.date.getTime() : Number.POSITIVE_INFINITY;
      const bt = b.date ? b.date.getTime() : Number.POSITIVE_INFINITY;
      return at - bt;
    });
    past.sort((a, b) => {
      const at = a.date ? a.date.getTime() : 0;
      const bt = b.date ? b.date.getTime() : 0;
      return bt - at;
    });

    return { upcoming, past };
  }, [events, assetsMap]);

  if (loading) {
    return <div className="py-10 text-[#4B4B67]">Loading events...</div>;
  }

  if (error) {
    return <div className="py-10 text-red-600">{error}</div>;
  }

  if (upcoming.length === 0 && past.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-[#4B4B67]">No events at this time.</p>
        <p className="mt-2 text-sm text-[#888]">
          Please check back soon for upcoming gatherings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      <EventSection
        title="Upcoming Events"
        caption="Join us at these gatherings"
        events={upcoming}
        variant="upcoming"
        emptyMessage="No upcoming events scheduled yet. Check back soon."
      />

      {past.length > 0 && (
        <EventSection
          title="Past Events"
          caption="A look back at what God has done"
          events={past}
          variant="past"
        />
      )}
    </div>
  );
};

type EventSectionProps = {
  title: string;
  caption: string;
  events: EventCard[];
  variant: "upcoming" | "past";
  emptyMessage?: string;
};

const EventSection = ({
  title,
  caption,
  events,
  variant,
  emptyMessage,
}: EventSectionProps) => {
  return (
    <section>
      <div className="mb-6 flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#202163]">{title}</h2>
          <p className="mt-1 text-sm text-[#4B4B67]">{caption}</p>
        </div>
        <span className="ml-auto inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#dcdcea] px-3 text-sm font-semibold text-[#202163]">
          {events.length}
        </span>
      </div>

      {events.length === 0 ? (
        <p className="text-[#4B4B67]">{emptyMessage}</p>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} variant={variant} />
          ))}
        </div>
      )}
    </section>
  );
};

const EventCard = ({
  event,
  variant,
}: {
  event: EventCard;
  variant: "upcoming" | "past";
}) => {
  const isPast = variant === "past";

  return (
    <article className="overflow-hidden rounded-lg border border-[#ECECF3] bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Image Section - full image, never cropped */}
        <div className="relative flex w-full shrink-0 items-center justify-center bg-[#f4f4f8] p-3 md:w-2/5 lg:w-1/3">
          {event.imageUrl ? (
            <img
              src={`${event.imageUrl}?w=800&fm=webp&q=85`}
              alt={event.title}
              className="max-h-[420px] w-full rounded-md object-contain"
              loading="lazy"
            />
          ) : (
            <div className="flex min-h-56 w-full items-center justify-center rounded-md bg-linear-to-br from-[#ECECF3] to-[#D8D8E5]">
              <svg
                className="h-16 w-16 text-[#B8B8C8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {isPast && (
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              Past
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                isPast
                  ? "bg-[#4B4B67] text-white"
                  : "bg-[#B38E34] text-white"
              }`}
            >
              {isPast ? "Past Event" : "Upcoming"}
            </span>
            {event.date && (
              <span className="text-sm text-[#888]">
                {formatDate(event.date)}
              </span>
            )}
          </div>

          <h3 className="mb-3 text-xl font-bold leading-snug text-[#202163] sm:text-2xl">
            {event.title}
          </h3>

          {event.summary && (
            <p className="mb-6 text-[1.02rem] leading-relaxed text-[#4B4B67]">
              {event.summary}
            </p>
          )}

          <Link
            to={`/events/${event.id}`}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#B38E34] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#202163] focus:outline-none focus:ring-2 focus:ring-[#B38E34] focus:ring-offset-2"
          >
            View Details
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventComponent;
