
import { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, type Document } from '@contentful/rich-text-types';
import { getContentfulEnv } from '../lib/utils';

type CareContent = {
  title: string;
  summary: string;
  description: Document;
  imageUrl: string;
};

const fallbackContent: CareContent = {
  title: 'GAM Care – Monthly Food Drive',
  summary: 'Be part of an impactful, ongoing community initiative.',
  description: { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] },
  imageUrl: '/hero.jpg',
};

const richTextOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.CODE]: (text) => <code className="rounded bg-[#ECECF3] px-1 py-0.5 text-[0.95em]">{text}</code>,
    superscript: (text) => <sup>{text}</sup>,
    subscript: (text) => <sub>{text}</sub>,
    strikethrough: (text) => <s>{text}</s>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="text-[1.05rem] leading-[1.7] text-[#252525] sm:text-[1.18rem]">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_, children) => <h3 className="text-2xl font-semibold text-[#202163]">{children}</h3>,
    [BLOCKS.HEADING_2]: (_, children) => <h4 className="text-xl font-semibold text-[#202163]">{children}</h4>,
    [BLOCKS.HEADING_3]: (_, children) => <h5 className="text-lg font-semibold text-[#202163]">{children}</h5>,
    [BLOCKS.HEADING_4]: (_, children) => <h6 className="text-base font-semibold text-[#202163]">{children}</h6>,
    [BLOCKS.HEADING_5]: (_, children) => <h6 className="text-sm font-semibold text-[#202163]">{children}</h6>,
    [BLOCKS.HEADING_6]: (_, children) => <h6 className="text-sm font-medium text-[#202163]">{children}</h6>,
    [BLOCKS.UL_LIST]: (_, children) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
    [BLOCKS.OL_LIST]: (_, children) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="border-l-4 border-[#B38E34] pl-3 italic text-[#2f2f2f]">{children}</blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-[#d5d5df]" />,
    [INLINES.HYPERLINK]: (node, children) => {
      const href = (node.data as { uri?: string })?.uri;
      return (
        <a href={href} target="_blank" rel="noreferrer" className="underline text-[#1f2167] hover:text-[#B38E34]">
          {children}
        </a>
      );
    },
  },
};

function toAssetUrl(rawUrl?: string): string {
  if (!rawUrl) return '/hero.jpg';
  if (rawUrl.startsWith('//')) return `https:${rawUrl}`;
  if (rawUrl.startsWith('/')) return `https://images.ctfassets.net${rawUrl}`;
  return rawUrl;
}

function getLocalizedFileUrl(file: unknown): string | undefined {
  if (!file || typeof file !== 'object') return undefined;

  if ('url' in (file as Record<string, unknown>) && typeof (file as { url?: unknown }).url === 'string') {
    return (file as { url: string }).url;
  }

  const localized = Object.values(file as Record<string, { url?: string }>).find((entry) => !!entry?.url);
  return localized?.url;
}

function resolveImageUrl(imageField: unknown): string {
  if (!imageField || typeof imageField !== 'object') {
    return '/hero.jpg';
  }

  const file = (imageField as { fields?: { file?: unknown } }).fields?.file;
  return toAssetUrl(getLocalizedFileUrl(file));
}

function Care() {
  const [content, setContent] = useState<CareContent>(fallbackContent);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCareContent = async () => {
      try {
        const { spaceId, accessToken, host } = getContentfulEnv();
        const client = createClient({ space: spaceId, accessToken, host });

        const response = await client.withoutUnresolvableLinks.getEntries({
          content_type: 'gaMcare',
          limit: 1,
          order: ['-sys.updatedAt'],
        });

        const entry = response.items[0];
        if (!entry) {
          throw new Error('No GAM Care content found.');
        }

        const fields = entry.fields as Record<string, unknown>;
        const title = typeof fields.title === 'string' ? fields.title : fallbackContent.title;
        const summary = typeof fields.summary === 'string' ? fields.summary : fallbackContent.summary;
        const description =
          fields.description &&
          typeof fields.description === 'object' &&
          (fields.description as { nodeType?: string }).nodeType === BLOCKS.DOCUMENT
            ? (fields.description as Document)
            : fallbackContent.description;
        const imageUrl = resolveImageUrl(fields.image);

        if (isMounted) {
          setContent({ title, summary, description, imageUrl });
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setContent(fallbackContent);
          setErrorMessage(error instanceof Error ? error.message : 'Unable to load GAM Care content.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCareContent();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section id="gam-care" className="bg-[#efeff2] py-10 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-300 px-4 text-[#4B4B67] sm:px-6 lg:px-8">Loading GAM Care content...</div>
      </section>
    );
  }

  return (
    <section id="gam-care" className="bg-[#efeff2] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        {errorMessage && <p className="mb-4 text-red-600">{errorMessage}</p>}

        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <div className="flex h-full flex-col">
            <h2 className="font-serif text-4xl leading-tight text-[#202163] sm:text-5xl">{content.title}</h2>
            {content.summary ? <p className="mt-1 text-xl text-[#6d6d6d]">{content.summary}</p> : null}

            <article className="mt-5 flex-1 rounded-sm border border-[#dfdfdf] bg-[#f3f3f3] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] sm:p-7">
              <div className="space-y-4">{documentToReactComponents(content.description, richTextOptions)}</div>
            </article>
          </div>

          <div className="h-full">
            <div className="h-full min-h-130 overflow-hidden rounded-sm border border-[#dfdfdf] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <img
                src={content.imageUrl}
                alt={content.title || 'GAM Care image'}
                className="h-full min-h-130 w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Care;