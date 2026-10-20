import {
  useSiteContent,
  SITE_KEYS,
  DEFAULT_GIVING,
} from "../lib/siteContent";

function Payment() {
  const { title, blocks: paymentBlocks, sideEntries } = useSiteContent(
    SITE_KEYS.giving,
    DEFAULT_GIVING,
  );

  return (
    <section id="payment" className="bg-[#efefef] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <article className="w-full overflow-hidden rounded-lg border border-[#d8d8d8] bg-[#f2f2f2] shadow-md">
          
          {/* HEADER */}
          <header className="bg-[#1f2167] px-5 py-3">
            <h2 className="text-[1.05rem] font-semibold tracking-wide text-white">
              {title}
            </h2>
          </header>

          <div className="grid gap-6 px-5 py-5 lg:grid-cols-[1.05fr_0.95fr]">
            
            {/* LEFT SIDE */}
            <div>
              <p className="text-[1.2rem] font-semibold text-[#b8aa69] leading-tight">
                THANK YOU FOR YOUR
              </p>

              <p className="inline-block mt-1 bg-white px-2 py-1 text-[2rem] font-bold text-[#1f2167] tracking-tight">
                OFFERING
              </p>

              {/* PAYMENT BLOCKS */}
              <div className="mt-5 space-y-5">
                {paymentBlocks.map((block) => (
                  <div key={block.region}>
                    <h3 className="text-[1.2rem] font-bold text-[#1f2167]">
                      {block.region}
                    </h3>

                    <div className="mt-2 space-y-1">
                      {block.entries.map((entry) => (
                        <p
                          key={`${block.region}-${entry.label}`}
                          className="text-[0.85rem] font-semibold text-[#1f2167]"
                        >
                          <span className="text-[#b8aa69] uppercase tracking-wide">
                            {entry.label}:
                          </span>{" "}
                          <span className="break-all">{entry.value}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <aside className="rounded-md border border-[#dbdbdb] bg-[#eeeeee] px-4 py-4">
              <div className="space-y-2.5">
                {sideEntries.map((entry, index) => (
                  <p
                    key={`${entry.label}-${index}`}
                    className="text-[0.85rem] font-semibold text-[#1f2167]"
                  >
                    <span className="text-[#b8aa69] uppercase tracking-wide">
                      {entry.label}:
                    </span>{" "}
                    <span className="break-all">{entry.value}</span>
                  </p>
                ))}
              </div>
            </aside>

          </div>
        </article>
      </div>
    </section>
  );
}

export default Payment;