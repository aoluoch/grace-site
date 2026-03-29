import { useEffect, useState } from "react";
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

type VisionaryContent = {
  title: string;
  description: Document;
};

const fallbackContent: VisionaryContent = {
  title: "MEET APOSTLE DAVID OWUSU",
  description: {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [],
  },
};

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
      <p className="text-[1rem] leading-8 text-[#222] sm:text-[1.08rem] sm:leading-8 lg:text-[1.2rem] lg:leading-[2.35rem]">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (_, children) => (
      <h3 className="text-2xl font-semibold text-[#202163]">{children}</h3>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h4 className="text-xl font-semibold text-[#202163]">{children}</h4>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h5 className="text-lg font-semibold text-[#202163]">{children}</h5>
    ),
    [BLOCKS.HEADING_4]: (_, children) => (
      <h6 className="text-base font-semibold text-[#202163]">{children}</h6>
    ),
    [BLOCKS.HEADING_5]: (_, children) => (
      <h6 className="text-sm font-semibold text-[#202163]">{children}</h6>
    ),
    [BLOCKS.HEADING_6]: (_, children) => (
      <h6 className="text-sm font-medium text-[#202163]">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="list-disc space-y-2 pl-6">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="list-decimal space-y-2 pl-6">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="border-l-4 border-[#B38E34] pl-3 italic text-[#2f2f2f]">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-[#d5d5df]" />,
    [BLOCKS.TABLE]: (_, children) => (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-[#d5d5df]">
          {children}
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (_, children) => <tr>{children}</tr>,
    [BLOCKS.TABLE_HEADER_CELL]: (_, children) => (
      <th className="border border-[#d5d5df] bg-[#f1f1f6] px-3 py-2 text-left">
        {children}
      </th>
    ),
    [BLOCKS.TABLE_CELL]: (_, children) => (
      <td className="border border-[#d5d5df] px-3 py-2">{children}</td>
    ),
    [BLOCKS.EMBEDDED_ENTRY]: () => null,
    [BLOCKS.EMBEDDED_ASSET]: () => null,
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
    [INLINES.ENTRY_HYPERLINK]: (_, children) => (
      <span className="underline text-[#1f2167]">{children}</span>
    ),
    [INLINES.ASSET_HYPERLINK]: (_, children) => (
      <span className="underline text-[#1f2167]">{children}</span>
    ),
    [INLINES.EMBEDDED_ENTRY]: (_, children) => <span>{children}</span>,
  },
};

function Visionary() {
  const [content, setContent] = useState<VisionaryContent>(fallbackContent);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVisionaryContent = async () => {
      try {
        const { spaceId, accessToken, host } = getContentfulEnv();
        const client = createClient({ space: spaceId, accessToken, host });

        const response = await client.withoutUnresolvableLinks.getEntries({
          content_type: "visionary",
          limit: 1,
          order: ["-sys.updatedAt"],
        });

        const entry = response.items[0];
        if (!entry) {
          throw new Error("No Visionary content found.");
        }

        const fields = entry.fields as Record<string, unknown>;
        const title =
          typeof fields.title === "string"
            ? fields.title
            : fallbackContent.title;
        const description =
          fields.description &&
          typeof fields.description === "object" &&
          (fields.description as { nodeType?: string }).nodeType ===
            BLOCKS.DOCUMENT
            ? (fields.description as Document)
            : fallbackContent.description;

        if (isMounted) {
          setContent({ title, description });
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setContent(fallbackContent);
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load visionary content.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchVisionaryContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-[#efefef] py-12 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[420px_1fr] lg:gap-10 lg:px-8">
        <div className="mx-auto w-full max-w-105 lg:mx-0">
          <div className="h-59 w-full overflow-hidden bg-black shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
            <iframe
              title="Official Launch of Grace Arena Ministries"
              src="https://www.youtube-nocookie.com/embed/X2pllMejoBw?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <article className="self-start bg-[#f8f7f3] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <header className="border-b-2 border-[#c39d3a] bg-[#1f2167] px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold tracking-wide text-[#c39d3a] sm:text-[1.95rem] sm:leading-none">
              {content.title}
            </h2>
          </header>

          <div className="space-y-5 px-5 py-6 sm:px-6">
            {isLoading && (
              <p className="text-[#4B4B67]">Loading visionary content...</p>
            )}
            {!isLoading && errorMessage && (
              <p className="text-red-600">{errorMessage}</p>
            )}
            {!isLoading && (
              <div className="space-y-5">
                {documentToReactComponents(
                  content.description,
                  richTextOptions,
                )}
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

export default Visionary;
