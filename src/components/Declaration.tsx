import { useEffect, useMemo, useState } from 'react';
import { createClient } from 'contentful';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, type Document } from '@contentful/rich-text-types';
import { getContentfulEnv } from '../lib/utils';

type DeclarationItem = {
  id: string;
  number: number;
  description: Document;
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
    [BLOCKS.PARAGRAPH]: (_, children) => <p className="text-[0.98rem] leading-[1.55] text-[#222] sm:text-[1.03rem]">{children}</p>,
    [BLOCKS.HEADING_1]: (_, children) => <h3 className="text-2xl font-semibold text-[#1f2167]">{children}</h3>,
    [BLOCKS.HEADING_2]: (_, children) => <h4 className="text-xl font-semibold text-[#1f2167]">{children}</h4>,
    [BLOCKS.HEADING_3]: (_, children) => <h5 className="text-lg font-semibold text-[#1f2167]">{children}</h5>,
    [BLOCKS.HEADING_4]: (_, children) => <h6 className="text-base font-semibold text-[#1f2167]">{children}</h6>,
    [BLOCKS.HEADING_5]: (_, children) => <h6 className="text-sm font-semibold text-[#1f2167]">{children}</h6>,
    [BLOCKS.HEADING_6]: (_, children) => <h6 className="text-sm font-medium text-[#1f2167]">{children}</h6>,
    [BLOCKS.UL_LIST]: (_, children) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
    [BLOCKS.OL_LIST]: (_, children) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
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

function DeclarationCard({ item }: { item: DeclarationItem }) {
  return (
    <div className="relative pl-12">
      <div className="absolute left-0 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#c4a347] bg-[#c4a347] text-base font-semibold text-[#f9f3dc] shadow-sm">
        {item.number}
      </div>
      <article className="rounded-2xl bg-[#f3f3f3] px-5 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="space-y-2">{documentToReactComponents(item.description, richTextOptions)}</div>
      </article>
    </div>
  );
}

function Declaration() {
  const [declarations, setDeclarations] = useState<DeclarationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDeclarations = async () => {
      try {
        const { spaceId, accessToken, host } = getContentfulEnv();
        const client = createClient({ space: spaceId, accessToken, host });

        const response = await client.withoutUnresolvableLinks.getEntries({
          content_type: 'declarations',
          order: ['fields.number'],
          limit: 100,
        });

        const mapped: DeclarationItem[] = response.items
          .map((item) => {
            const numberField = (item.fields as Record<string, unknown>)?.number;
            const descriptionField = (item.fields as Record<string, unknown>)?.description;

            const number =
              typeof numberField === 'number'
                ? numberField
                : typeof numberField === 'string'
                ? Number(numberField)
                : NaN;

            const description = descriptionField as Document | undefined;

            if (!Number.isFinite(number) || !description || description.nodeType !== BLOCKS.DOCUMENT) {
              return null;
            }

            return {
              id: item.sys.id,
              number,
              description,
            };
          })
          .filter((item): item is DeclarationItem => item !== null)
          .sort((a, b) => a.number - b.number);

        if (isMounted) {
          setDeclarations(mapped);
          setErrorMessage(mapped.length ? null : 'No declarations found.');
        }
      } catch (error) {
        if (isMounted) {
          setDeclarations([]);
          setErrorMessage(error instanceof Error ? error.message : 'Unable to load declarations.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDeclarations();

    return () => {
      isMounted = false;
    };
  }, []);

  const [leftDeclarations, rightDeclarations] = useMemo(() => {
    const middleIndex = Math.ceil(declarations.length / 2);
    return [declarations.slice(0, middleIndex), declarations.slice(middleIndex)];
  }, [declarations]);

  return (
    <section className="bg-[#efefef] py-14 sm:py-16">
      <div className="mx-auto w-full max-w-285 px-4 sm:px-6 lg:px-8">
        <header className="mb-7">
          <h2 className="font-serif text-3xl leading-tight text-[#1f2167] sm:text-4xl lg:text-[2.75rem]">
            2026 Prophetic Declarations
          </h2>
          <p className="mt-1 text-[1rem] text-[#666] sm:text-[1.08rem]">Speak these over your life in Jesus’ Name.</p>
        </header>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_360px_1fr]">
          <div className="space-y-4">
            {isLoading && <p className="text-[#4B4B67]">Loading declarations...</p>}
            {!isLoading && errorMessage && <p className="text-red-600">{errorMessage}</p>}
            {!isLoading && !errorMessage && leftDeclarations.map((item) => (
              <DeclarationCard key={item.id} item={item} />
            ))}
          </div>

          {/* Instagram post remains in the middle */}
          <div className="h-full overflow-hidden rounded-sm bg-black shadow-[0_4px_18px_rgba(0,0,0,0.18)]">
            <iframe
              title="Instagram reel"
              src="https://www.instagram.com/reel/DLTAiXvtv1G/embed"
              className="h-full min-h-155 w-full border-0 sm:min-h-170 lg:min-h-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="lazy"
            />
          </div>

          <div className="space-y-4">
            {!isLoading && !errorMessage && rightDeclarations.map((item) => (
              <DeclarationCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Declaration;