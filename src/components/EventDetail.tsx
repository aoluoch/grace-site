import { useEffect, useMemo, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { createClient } from 'contentful';
import { getContentfulEnv } from '../lib/utils';
import type {
  Asset,
  Entry,
  EntryCollection,
  EntryFieldTypes,
  EntrySkeletonType,
} from "contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Document } from "@contentful/rich-text-types"
import { BLOCKS } from "@contentful/rich-text-types"

interface EventSkeleton extends EntrySkeletonType {
  contentTypeId: "events"
  fields: {
    eventTitle: EntryFieldTypes.Symbol
    image: EntryFieldTypes.AssetLink
    eventSummary: EntryFieldTypes.Symbol
    description?: EntryFieldTypes.RichText
  }
}

const getFirstLocaleString = (value: unknown): string | undefined => {
  if (typeof value === "string") return value
  if (value && typeof value === "object") {
    const first = Object.values(value as Record<string, string | undefined>)[0]
    return typeof first === "string" ? first : undefined
  }
  return undefined
}

const EventDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [entry, setEntry] = useState<Entry<EventSkeleton> | null>(null)
  const [assetsMap, setAssetsMap] = useState<Record<string, Asset>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let isMounted = true
    setLoading(true)
    
    const { spaceId, accessToken, host } = getContentfulEnv();
    const client = createClient({ space: spaceId, accessToken, host });
    
    client
      .getEntries<EventSkeleton>({ content_type: "events", "sys.id": id, include: 2, limit: 1 })
      .then((res: EntryCollection<EventSkeleton>) => {
        if (!isMounted) return
        const e = res.items?.[0] ?? null
        const assets = (res.includes?.Asset ?? []) as Asset[]
        const map: Record<string, Asset> = {}
        assets.forEach((a: Asset) => {
          const aid = (a as Asset).sys?.id as string | undefined
          if (aid) map[aid] = a
        })
        setEntry(e)
        setAssetsMap(map)
      })
      .catch((e: unknown) => {
        if (!isMounted) return
        const message = e instanceof Error ? e.message : "Failed to load event"
        setError(message)
      })
      .finally(() => {
        if (!isMounted) return
        setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [id])

  const view = useMemo(() => {
    if (!entry) return null
    const title = getFirstLocaleString(entry.fields.eventTitle) ?? "Untitled Event"
    const imageId = (entry.fields.image as unknown as { sys?: { id?: string } })?.sys?.id
    const asset = imageId ? assetsMap[imageId] : undefined
    const rawUrl = getFirstLocaleString((asset as Asset | undefined)?.fields?.file?.url)
    const imageUrl = rawUrl ? (rawUrl.startsWith("http") ? rawUrl : `https:${rawUrl}`) : undefined
    const descriptionDoc = entry.fields.description as Document | undefined
    return { title, imageUrl, descriptionDoc }
  }, [entry, assetsMap])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Loading event...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!view) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Event not found.</p>
        <Link to="/events" className="text-blue-600 hover:underline">Back to Events</Link>
      </div>
    )
  }

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/events" className="text-blue-600 hover:underline">← Back to Events</Link>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">{view.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="w-full">
          {view.imageUrl && (
            <img
              src={`${view.imageUrl}?w=1600&fit=fill&fm=jpg&q=80`}
              alt={view.title}
              className="w-full h-auto md:h-full object-cover rounded-xl shadow"
            />
          )}
        </div>

        <div className="w-full">
          {view.descriptionDoc && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Event Details</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {documentToReactComponents(view.descriptionDoc, {
                  renderText: (text) => {
                    return text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < text.split('\n').length - 1 && <br />}
                      </span>
                    ));
                  },
                  renderNode: {
                    [BLOCKS.EMBEDDED_ASSET]: (node) => {
                      const assetId = node.data?.target?.sys?.id;
                      if (assetId && assetsMap[assetId]) {
                        const asset = assetsMap[assetId];
                        const rawUrl = getFirstLocaleString(asset.fields?.file?.url);
                        const imageUrl = rawUrl ? (rawUrl.startsWith("http") ? rawUrl : `https:${rawUrl}`) : undefined;
                        
                        if (imageUrl) {
                          return (
                            <img
                              src={`${imageUrl}?w=800&fit=fill&fm=jpg&q=80`}
                              alt={getFirstLocaleString(asset.fields?.title) || "Embedded asset"}
                              className="w-full h-auto rounded-lg shadow-md my-4"
                            />
                          );
                        }
                      }
                      return null;
                    },
                  },
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="mt-16 border-t border-gray-300"></div>
    </>
  )
}

export default EventDetail