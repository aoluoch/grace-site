import { CheckCircle2, Phone } from 'lucide-react';

const donationItems = [
  'Non-perishable food',
  'Toiletries',
  'Sanitary towels',
  'Clothing & shoes',
  'Blankets & bedding',
  'Cash contributions',
];

function Care() {
  return (
    <section id="gam-care" className="bg-[#efeff2] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <div className="flex h-full flex-col">
            <h2 className="font-serif text-4xl leading-tight text-[#202163] sm:text-5xl">
              GAM Care – Monthly Food Drive
            </h2>
            <p className="mt-1 text-xl text-[#6d6d6d]">
              Be part of an impactful, ongoing community initiative.
            </p>

            <article className="mt-5 flex-1 rounded-sm border border-[#dfdfdf] bg-[#f3f3f3] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] sm:p-7">
              <p className="text-[1.1rem] leading-[1.7] text-[#252525] sm:text-[1.25rem]">
                <span className="font-semibold">The GAM Care Department</span> is once again leading
                the food drive and we invite you to be part of this impactful initiative. If
                you’re able, please support us by donating:
              </p>

              <ul className="mt-5 space-y-2.5">
                {donationItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1.05rem] text-[#272727] sm:text-[1.15rem]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c2a64a]" strokeWidth={2.4} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[1.05rem] text-[#6d6d6d]">Schedule</p>
                  <p className="text-[1.9rem] leading-tight text-[#202163] sm:text-[2.2rem]">
                    Every <span className="underline">2nd Sunday</span> of the month
                  </p>
                </div>

                <div className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#bfa64a] px-5 py-3 text-center text-[1.5rem] leading-tight text-white shadow-sm sm:min-w-67.5">
                  <Phone className="h-4 w-4" />
                  <span>Contact: +254 722 231 076</span>
                </div>
              </div>
            </article>
          </div>

          <div className="h-full">
            <div className="h-full min-h-130 overflow-hidden rounded-sm border border-[#dfdfdf] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <img
                src="/hero.jpg"
                alt="GAM Care food drive"
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