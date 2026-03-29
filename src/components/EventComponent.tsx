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
  };
}

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
        order: ["-sys.createdAt"],
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

  const getFirstLocaleString = (value: unknown): string | undefined => {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      const first = Object.values(
        value as Record<string, string | undefined>,
      )[0];
      return typeof first === "string" ? first : undefined;
    }
    return undefined;
  };

  const getLinkId = (link: unknown): string | undefined => {
    if (!link || typeof link !== "object") return undefined;
    const sys = (link as { sys?: { id?: string } }).sys;
    return sys?.id;
  };

  const eventCards = useMemo(() => {
    return events.map((event) => {
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

      return {
        id: event.sys.id,
        title,
        summary,
        imageUrl,
      };
    });
  }, [events, assetsMap]);

  if (loading) {
    return (
      <div className="py-8">
        <p className="text-[#4B4B67]">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (eventCards.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-[#4B4B67] text-lg">
          No events available at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {eventCards.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-[#ECECF3] hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative overflow-hidden md:w-2/5 lg:w-1/3 shrink-0 bg-[#ECECF3]">
              {event.imageUrl ? (
                <img
                  src={`${event.imageUrl}?w=800&fm=webp&q=85`}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-contain hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-64 md:h-80 bg-linear-to-br from-[#ECECF3] to-[#D8D8E5] flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-[#B8B8C8]"
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
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#202163] mb-3 leading-tight">
                {event.title}
              </h3>
              {event.summary && (
                <p className="text-base text-[#4B4B67] mb-6 leading-relaxed line-clamp-3">
                  {event.summary}
                </p>
              )}
              <Link
                to={`/events/${event.id}`}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg bg-[#B38E34] text-white hover:bg-[#202163] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B38E34] focus:ring-offset-2 w-fit"
              >
                View Details
                <svg
                  className="ml-2 w-4 h-4"
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
        </div>
      ))}
    </div>
  );
};

export default EventComponent;
