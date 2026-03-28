const paymentBlocks = [
  {
    region: 'USA',
    entries: [
      { label: 'CASHPAPP', value: '$GRACEHOUR1' },
      { label: 'ZELLE', value: '4697567320' },
      { label: 'ACC. NAME', value: 'DOM INTERNATIONAL USA' },
    ],
  },
  {
    region: 'UK',
    entries: [
      { label: 'ACC. NO', value: '10460241' },
      { label: 'SC', value: '60-02-63' },
      { label: 'NAME', value: 'DAVID OWUSU MINISTRIES' },
    ],
  },
];

const sideEntries = [
  { label: 'PAYBILL (KENYA)', value: '919143' },
  { label: 'ACC. NAME', value: 'SEED / TITHE' },
  { label: 'PAYBILL (KENYA)', value: '7194870' },
  { label: 'ACC. NAME', value: 'SEED / TITHE' },
  { label: 'WAVE / WORLD REMIT / MPESA', value: '+254 799 403 242' },
  { label: 'ZAMBIA MOMO', value: '0975 904 802' },
  { label: 'MOMO (GHANA)', value: '0550 738 873' },
  { label: 'PAYPAL', value: 'david.kowusu@gmail.com' },
];

function Payment() {
  return (
    <section id="payment" className="bg-[#efefef] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-280 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.25fr] lg:gap-5">
          <article className="overflow-hidden border border-[#d0d0d0] bg-black shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
            <iframe
              title="Pray In Tongues With Me - Prophet David Owusu"
              src="https://www.youtube-nocookie.com/embed/_wCtwX5qH28?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
              className="h-60 w-full sm:h-80 lg:h-full lg:min-h-90"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </article>

          <article className="w-full overflow-hidden rounded-lg border border-[#d8d8d8] bg-[#f2f2f2] shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
            <header className="bg-[#1f2167] px-4 py-2.5 sm:px-5">
              <h2 className="text-[1rem] font-semibold tracking-[0.02em] text-white sm:text-[1.07rem]">
                DOM PAYMENT DETAILS
              </h2>
            </header>

            <div className="grid gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="min-w-0">
                <p className="text-[1.2rem] font-semibold leading-tight text-[#b8aa69] sm:text-[1.4rem]">
                  THANK YOU FOR YOUR
                </p>
                <p className="inline-block max-w-full bg-white px-1.5 py-0.5 text-[1.9rem] font-semibold leading-none tracking-[0.01em] text-[#1f2167] sm:text-[2.05rem]">
                  OFFERING
                </p>

                <div className="mt-4 space-y-4">
                  {paymentBlocks.map((block) => (
                    <div key={block.region}>
                      <h3 className="text-[1.25rem] font-semibold leading-none text-[#1f2167]">{block.region}</h3>
                      <div className="mt-2 space-y-1.5">
                        {block.entries.map((entry) => (
                          <p
                            key={`${block.region}-${entry.label}`}
                            className="text-[0.8rem] font-semibold leading-snug tracking-[0.01em] text-[#1f2167] whitespace-normal wrap-break-word sm:text-[0.92rem] sm:whitespace-nowrap xl:text-[0.98rem]"
                          >
                            <span className="text-[#b8aa69]">{entry.label}:</span>{' '}
                            <span className="break-all">{entry.value}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="min-w-0 rounded-md border border-[#dbdbdb] bg-[#f5f5f5] px-3 py-3 sm:px-4">
                <div className="space-y-2">
                  {sideEntries.map((entry, index) => (
                    <p
                      key={`${entry.label}-${index}`}
                      className="text-[0.78rem] font-semibold leading-snug tracking-[0.01em] text-[#1f2167] whitespace-normal wrap-break-word sm:text-[0.88rem] sm:whitespace-nowrap xl:text-[0.95rem]"
                    >
                      <span className="text-[#b8aa69]">{entry.label}:</span>{' '}
                      <span className="break-all">{entry.value}</span>
                    </p>
                  ))}
                </div>
              </aside>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Payment;
