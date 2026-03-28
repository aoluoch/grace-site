import { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, type Document } from '@contentful/rich-text-types';
import { getContentfulEnv } from '../lib/utils';

type MembershipContent = {
  title: string;
  summary: string;
  description: Document;
  imageUrl: string;
};

const fallbackContent: MembershipContent = {
  title: 'GAM Membership & Discipleship Classes',
  summary: 'Grow with us in grace and purpose.',
  description: { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] },
  imageUrl: '/membership-poster.png',
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
      <p className="text-[1.02rem] leading-[1.62] text-[#222222] sm:text-[1.08rem]">{children}</p>
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
  if (!rawUrl) return '/membership-poster.png';
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
    return '/membership-poster.png';
  }

  const file = (imageField as { fields?: { file?: unknown } }).fields?.file;
  return toAssetUrl(getLocalizedFileUrl(file));
}

function Membership() {
  const [content, setContent] = useState<MembershipContent>(fallbackContent);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMembershipContent = async () => {
      try {
        const { spaceId, accessToken, host } = getContentfulEnv();
        const client = createClient({ space: spaceId, accessToken, host });

        const response = await client.withoutUnresolvableLinks.getEntries({
          content_type: 'membership',
          limit: 1,
          order: ['-sys.updatedAt'],
        });

        const entry = response.items[0];
        if (!entry) {
          throw new Error('No membership content found.');
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
          setErrorMessage(error instanceof Error ? error.message : 'Unable to load membership content.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMembershipContent();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section id="gam-membership" className="bg-[#efefef] py-10 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-280 px-4 text-[#4B4B67] sm:px-6 lg:px-8">
          Loading membership content...
        </div>
      </section>
    );
  }

  return (
    <section id="gam-membership" className="bg-[#efefef] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-280 px-4 sm:px-6 lg:px-8">
        {errorMessage && <p className="mb-4 text-red-600">{errorMessage}</p>}

        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="flex items-center justify-center overflow-hidden border border-[#dadada] bg-[#f3f3f3] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <img
              src={content.imageUrl}
              alt={`${content.title} poster`}
              className="h-auto max-h-[70vh] w-full object-contain lg:max-h-155"
              loading="lazy"
            />
          </article>

          <div className="flex h-full flex-col">
            <header>
              <h2 className="text-[1rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1f2167] sm:text-[2.35rem]">
                {content.title}
              </h2>
              {content.summary ? <p className="mt-1 text-[1.2rem] text-[#6c6c6c]">{content.summary}</p> : null}
            </header>

            <article className="mt-4 flex-1 border border-[#e0e0e0] bg-[#f6f6f6] px-5 py-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] sm:px-6 sm:py-6">
              <div className="space-y-4">{documentToReactComponents(content.description, richTextOptions)}</div>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.98rem] text-[#666666]">Registration</p>
                  <p className="text-[1.06rem] leading-snug text-[#2a2a2a]">Call or WhatsApp +254 759 212 577</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Membership;
