type DeclarationItem = {
  id: number;
  text: string;
};

const declarations: DeclarationItem[] = [
  {
    id: 1,
    text: 'I decree and declare every prophetic word concerning my life is MANIFESTING in Jesus Name.',
  },
  {
    id: 2,
    text: 'I decree and declare that the will of God concerning my life, my family, my ministry, my career and business is MANIFESTING in Jesus Name.',
  },
  {
    id: 3,
    text: 'I am MANIFESTING the will of God in Jesus Name.',
  },
  {
    id: 4,
    text: 'I declare Nations, Kings, and Princes are coming to the MANIFESTATION of my rising in Jesus Name.',
  },
  {
    id: 5,
    text: 'I decree and declare that every delay is turning into divine acceleration in Jesus Name.',
  },
  {
    id: 6,
    text: 'I am MANIFESTING my God-given purpose in Jesus Name.',
  },
  {
    id: 7,
    text: 'I decree and declare I am MANIFESTING and enjoying good health and long life in Jesus Name.',
  },
  {
    id: 8,
    text: 'In my year of PROPHETIC MANIFESTATION, I am enjoying divine peace and stability in every aspect of my life in Jesus Name.',
  },
  {
    id: 9,
    text: 'In my year of PROPHETIC MANIFESTATION, I am walking in open doors, favor and undeniable progress in Jesus Name.',
  },
];

function highlightWords(text: string) {
  return text
    .split(/(MANIFESTING|MANIFESTATION|PROPHETIC MANIFESTATION)/g)
    .map((part, index) => {
      if (
        part === 'MANIFESTING' ||
        part === 'MANIFESTATION' ||
        part === 'PROPHETIC MANIFESTATION'
      ) {
        return (
          <span key={`${part}-${index}`} className="font-semibold underline text-[#1f2167]">
            {part}
          </span>
        );
      }

      return <span key={`${part}-${index}`}>{part}</span>;
    });
}

function DeclarationCard({ item }: { item: DeclarationItem }) {
  return (
    <div className="relative pl-12">
      <div className="absolute left-0 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#c4a347] bg-[#c4a347] text-base font-semibold text-[#f9f3dc] shadow-sm">
        {item.id}
      </div>
      <article className="rounded-2xl bg-[#f3f3f3] px-5 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <p className="text-[0.98rem] leading-[1.55] text-[#222] sm:text-[1.03rem]">{highlightWords(item.text)}</p>
      </article>
    </div>
  );
}

function Declaration() {
  const middleIndex = Math.ceil(declarations.length / 2);
  const leftDeclarations = declarations.slice(0, middleIndex);
  const rightDeclarations = declarations.slice(middleIndex);

  return (
    <section className="bg-[#efefef] py-14 sm:py-16">
      <div className="mx-auto w-full max-w-285 px-4 sm:px-6 lg:px-8">
        <header className="mb-7">
          <h2 className="font-serif text-3xl leading-tight text-[#1f2167] sm:text-4xl lg:text-[2.75rem]">
            2025 Prophetic Declarations
          </h2>
          <p className="mt-1 text-[1rem] text-[#666] sm:text-[1.08rem]">Speak these over your life in Jesus’ Name.</p>
        </header>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_360px_1fr]">
          <div className="space-y-4">
            {leftDeclarations.map((item) => (
              <DeclarationCard key={item.id} item={item} />
            ))}
          </div>

          <div className="h-full overflow-hidden rounded-sm bg-black shadow-[0_4px_18px_rgba(0,0,0,0.18)]">
            <iframe
              title="Instagram reel"
              src="https://www.instagram.com/reel/DLTAiXvtv1G/embed"
              className="h-full min-h-[620px] w-full border-0 sm:min-h-[680px] lg:min-h-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="lazy"
            />
          </div>

          <div className="space-y-4">
            {rightDeclarations.map((item) => (
              <DeclarationCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Declaration;