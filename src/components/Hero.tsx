import { useEffect, useState } from 'react';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, type Document } from '@contentful/rich-text-types';
import { getContentfulEnv } from '../lib/utils';

type LocalizedField<T> = T | Record<string, T>;

type ContentfulLink = {
  sys?: {
    type?: string;
    linkType?: 'Asset' | 'Entry';
    id?: string;
  };
};

type LocalizedAssetFile =
  | {
      url?: string;
    }
  | Record<
      string,
      {
        url?: string;
      }
    >;

type ContentfulEntry = {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    titleOne?: LocalizedField<string | ContentfulLink>;
    titleTwo?: LocalizedField<string | ContentfulLink>;
    description?: LocalizedField<Document | ContentfulLink>;
    image?: LocalizedField<
      | {
          sys?: {
            id?: string;
          };
        }
      | ContentfulLink
    >;
    [key: string]: LocalizedField<unknown> | undefined;
  };
};

type ContentfulAsset = {
  sys: {
    id: string;
  };
  fields: {
    file?: LocalizedAssetFile;
  };
};

type ContentfulResponse = {
  items?: ContentfulEntry[];
  includes?: {
    Asset?: ContentfulAsset[];
    Entry?: ContentfulEntry[];
  };
};

type Slide = {
  id: string;
  titleOne: string;
  titleTwo: string;
  description: Document;
  image: string;
};

const emptyRichText: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [],
};

const richTextOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.CODE]: (text) => (
      <code className="rounded bg-[#ECECF3] px-1 py-0.5 text-[0.95em]">{text}</code>
    ),
    superscript: (text) => <sup>{text}</sup>,
    subscript: (text) => <sub>{text}</sub>,
    strikethrough: (text) => <s>{text}</s>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_, children) => <h1 className="text-3xl font-bold text-[#202163]">{children}</h1>,
    [BLOCKS.HEADING_2]: (_, children) => <h2 className="text-2xl font-semibold text-[#202163]">{children}</h2>,
    [BLOCKS.HEADING_3]: (_, children) => <h3 className="text-xl font-semibold text-[#202163]">{children}</h3>,
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base sm:text-lg">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="list-decimal pl-5 space-y-2 text-gray-700 text-base sm:text-lg">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="border-l-4 border-[#B38E34] pl-4 italic text-gray-700">{children}</blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-[#D8D8E5]" />,
    [INLINES.HYPERLINK]: (node, children) => {
      const href = (node.data as { uri?: string })?.uri;

      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-[#1f2167] underline hover:text-[#B38E34]"
        >
          {children}
        </a>
      );
    },
  },
};

function renderRichText(document: Document) {
  return documentToReactComponents(document, richTextOptions);
}

function toAssetUrl(rawUrl?: string): string {
  if (!rawUrl) {
    return '/hero.jpg';
  }

  if (rawUrl.startsWith('//')) {
    return `https:${rawUrl}`;
  }

  if (rawUrl.startsWith('/')) {
    return `https://images.ctfassets.net${rawUrl}`;
  }

  return rawUrl;
}

function getAssetFileUrl(file?: LocalizedAssetFile): string | undefined {
  if (!file) {
    return undefined;
  }

  if ('url' in file && typeof (file as { url?: unknown }).url === 'string') {
    return (file as { url: string }).url;
  }

  const localized = Object.values(file).find((item) => item?.url);
  return localized?.url;
}

function getFieldValue<T>(field?: LocalizedField<T>): T | undefined {
  if (!field) {
    return undefined;
  }

  if (typeof field !== 'object' || Array.isArray(field)) {
    return field as T;
  }

  if ('nodeType' in (field as Record<string, unknown>) || 'sys' in (field as Record<string, unknown>)) {
    return field as T;
  }

  const localizedRecord = field as Record<string, T>;
  // Prefer en-US when available, then first truthy locale value.
  return localizedRecord['en-US'] ?? Object.values(localizedRecord).find(Boolean);
}

function resolveString(
  value: unknown,
  entryById: Map<string, ContentfulEntry>,
  fallbackKeys: string[] = ['titleOne', 'titleTwo', 'title', 'name', 'headline']
): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (!isContentfulLink(value) || value.sys?.linkType !== 'Entry' || !value.sys.id) {
    return '';
  }

  const linked = entryById.get(value.sys.id);
  if (!linked) {
    return '';
  }

  for (const key of fallbackKeys) {
    const candidate = getFieldValue(linked.fields[key] as LocalizedField<unknown> | undefined);
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim();
    }
  }

  return '';
}

function resolveDocument(value: unknown, entryById: Map<string, ContentfulEntry>): Document {
  if (value && typeof value === 'object' && (value as { nodeType?: string }).nodeType === BLOCKS.DOCUMENT) {
    return value as Document;
  }

  if (isContentfulLink(value) && value.sys?.linkType === 'Entry' && value.sys.id) {
    const linked = entryById.get(value.sys.id);
    if (linked) {
      const docCandidateKeys = ['description', 'body', 'content'];
      for (const key of docCandidateKeys) {
        const candidate = getFieldValue(linked.fields[key] as LocalizedField<unknown> | undefined);
        if (
          candidate &&
          typeof candidate === 'object' &&
          (candidate as { nodeType?: string }).nodeType === BLOCKS.DOCUMENT
        ) {
          return candidate as Document;
        }
      }
    }
  }

  return emptyRichText;
}

function resolveImageUrl(
  value: unknown,
  assetUrlById: Map<string, string>,
  entryById: Map<string, ContentfulEntry>
): string {
  if (!value) {
    return '/hero.jpg';
  }

  if (typeof value === 'string') {
    return toAssetUrl(value);
  }

  if (isContentfulLink(value)) {
    const { linkType, id } = value.sys ?? {};

    if (linkType === 'Asset' && id) {
      return assetUrlById.get(id) || '/hero.jpg';
    }

    if (linkType === 'Entry' && id) {
      const linked = entryById.get(id);
      const nestedImage = linked ? getFieldValue(linked.fields.image as LocalizedField<unknown> | undefined) : undefined;
      return resolveImageUrl(nestedImage, assetUrlById, entryById);
    }
  }

  if (typeof value === 'object' && value && 'sys' in (value as Record<string, unknown>)) {
    const id = (value as { sys?: { id?: string } }).sys?.id;
    if (id) {
      return assetUrlById.get(id) || '/hero.jpg';
    }
  }

  return '/hero.jpg';
}

function isContentfulLink(value: unknown): value is ContentfulLink {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const sys = (value as ContentfulLink).sys;
  return !!sys?.id && sys.type === 'Link';
}

function Hero() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (slides.length ? (prev + 1) % slides.length : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (slides.length ? (prev - 1 + slides.length) % slides.length : 0));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchSlides = async () => {
      try {
        const { spaceId, accessToken, host } = getContentfulEnv();
        const endpoint = new URL(`https://${host}/spaces/${spaceId}/environments/master/entries`);
        endpoint.searchParams.set('access_token', accessToken);
        endpoint.searchParams.set('content_type', 'gamHero');
        endpoint.searchParams.set('include', '10');
        endpoint.searchParams.set('order', 'sys.createdAt');
        endpoint.searchParams.set('locale', '*');

        const response = await fetch(endpoint.toString());
        if (!response.ok) {
          throw new Error(`Failed to fetch hero content (${response.status})`);
        }

        const data = (await response.json()) as ContentfulResponse;
        const assets = data.includes?.Asset ?? [];
        const includedEntries = data.includes?.Entry ?? [];
        const allEntries = [...(data.items ?? []), ...includedEntries];
        const entryById = new Map(allEntries.map((entry) => [entry.sys.id, entry]));

        const assetUrlById = new Map(
          assets.map((asset) => [asset.sys.id, toAssetUrl(getAssetFileUrl(asset.fields.file))])
        );

        const mappedSlides: Slide[] = (data.items ?? []).map((item) => {
          const rawTitleOne = getFieldValue(item.fields.titleOne);
          const rawTitleTwo = getFieldValue(item.fields.titleTwo);
          const rawDescription = getFieldValue(item.fields.description);
          const rawImage = getFieldValue(item.fields.image);

          const titleOne = resolveString(rawTitleOne, entryById);
          const titleTwo = resolveString(rawTitleTwo, entryById);
          const description = resolveDocument(rawDescription, entryById);
          const image = resolveImageUrl(rawImage, assetUrlById, entryById);

          return {
            id: item.sys.id,
            titleOne: titleOne || 'Grace Arena Ministries',
            titleTwo: titleTwo || 'When We Pray, Testimonies Follow',
            description,
            image,
          };
        });

        if (isMounted) {
          setSlides(mappedSlides);
          setErrorMessage(mappedSlides.length ? null : 'No hero slides found in Contentful.');
        }
      } catch (error) {
        if (isMounted) {
          setSlides([]);
          setErrorMessage(error instanceof Error ? error.message : 'Unable to load hero content.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.changedTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null || slides.length <= 1) {
      return;
    }

    const swipeDistance = touchStartX - touchEndX;
    const minimumSwipeDistance = 50;

    if (swipeDistance > minimumSwipeDistance) {
      nextSlide();
    } else if (swipeDistance < -minimumSwipeDistance) {
      prevSlide();
    }
  };

  if (isLoading) {
    return (
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[#202163]">Loading hero content...</div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-red-600">{errorMessage}</div>
      </section>
    );
  }

  return (
    <div className="relative w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative min-h-150 lg:min-h-125 flex items-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full touch-pan-y">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-opacity duration-500 h-full ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch py-12 lg:py-16">
                  <div className="order-2 lg:order-1 space-y-6 h-full flex flex-col justify-center">
                    <p className="text-[#B38E34] text-sm sm:text-base tracking-wider uppercase">{slide.titleTwo}</p>

                    <div>
                      <h1 className="text-[#202163] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        {slide.titleOne}
                      </h1>
                      <div className="w-full h-1 bg-[#B38E34] mt-4" />
                    </div>

                    <div className="space-y-4">{renderRichText(slide.description)}</div>
                  </div>

                  <div className="order-1 lg:order-2 h-full">
                    <div className="relative w-full h-full min-h-105 max-w-md mx-auto lg:max-w-none">
                      <img
                        src={slide.image}
                        alt={`${slide.titleOne} poster`}
                        className="w-full h-full object-cover rounded-lg shadow-2xl"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 && (
          <div className="flex justify-center gap-2 pb-8">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#B38E34] w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
