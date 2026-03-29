

const paymentBlocks = [
  {
    region: "USA",
    entries: [
      { label: "CASHPAPP", value: "$GRACEHOUR1" },
      { label: "ZELLE", value: "4697567320" },
      { label: "ACC. NAME", value: "DOM INTERNATIONAL USA" },
    ],
  },
  {
    region: "UK",
    entries: [
      { label: "ACC. NO", value: "10460241" },
      { label: "SC", value: "60-02-63" },
      { label: "NAME", value: "DAVID OWUSU MINISTRIES" },
    ],
  },
];

const sideEntries = [
  { label: "PAYBILL (KENYA)", value: "919143" },
  { label: "ACC. NAME", value: "SEED / TITHE" },
  { label: "PAYBILL (KENYA)", value: "7194870" },
  { label: "ACC. NAME", value: "SEED / TITHE" },
  { label: "WAVE / WORLD REMIT / MPESA", value: "+254 799 403 242" },
  { label: "ZAMBIA MOMO", value: "0975 904 802" },
  { label: "MOMO (GHANA)", value: "0550 738 873" },
  { label: "PAYPAL", value: "david.kowusu@gmail.com" },
];

function Payment() {
  return (
    <section id="payment" className="bg-[#efefef] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <article className="w-full overflow-hidden rounded-lg border border-[#d8d8d8] bg-[#f2f2f2] shadow-md">
          
          {/* HEADER */}
          <header className="bg-[#1f2167] px-5 py-3">
            <h2 className="text-[1.05rem] font-semibold tracking-wide text-white">
              DOM PAYMENT DETAILS
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