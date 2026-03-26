import { CheckCircle2, Phone } from 'lucide-react';

const membershipPoints = [
  'Weekly interactive Zoom sessions',
  'Tailored for new and aspiring members',
  'Learn, grow, and discover your purpose',
];

function Membership() {
  return (
    <section id="gam-membership" className="bg-[#efefef] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="overflow-hidden border border-[#dadada] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <img
              src="/membership-poster.png"
              alt="GAM Discipleship classes poster"
              className="h-full min-h-[360px] w-full object-cover lg:min-h-[620px]"
              loading="lazy"
            />
          </article>

          <div className="flex h-full flex-col">
            <header>
              <h2 className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1f2167] sm:text-[2.35rem]">
                GAM Membership &amp; Discipleship Classes
              </h2>
              <p className="mt-1 text-[1.2rem] text-[#6c6c6c]">Grow with us in grace and purpose.</p>
            </header>

            <article className="mt-4 flex-1 border border-[#e0e0e0] bg-[#f6f6f6] px-5 py-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] sm:px-6 sm:py-6">
              <p className="text-[1.02rem] leading-[1.62] text-[#222222] sm:text-[1.08rem]">
                Are you new to <span className="font-semibold">Grace Arena Ministries</span> and eager to learn more
                about how we operate as a ministry? Or perhaps you feel called to serve in one of our departments?
              </p>

              <p className="mt-3 text-[1.02rem] leading-[1.62] text-[#222222] sm:text-[1.08rem]">
                Then the <span className="font-semibold">GAM Membership Classes</span> on Zoom are just for you.
                Classes began on <span className="font-semibold">15th May 2025</span> and are held{' '}
                <span className="font-semibold">every Thursday from 8:00PM to 9:00PM (East African Time)</span>.
              </p>

              <ul className="mt-4 space-y-2.5">
                {membershipPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[1rem] leading-snug text-[#2a2a2a] sm:text-[1.05rem]">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#c2a347]" strokeWidth={2.5} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-3 text-[#2a2a2a]">
                <div>
                  <p className="text-[0.98rem] text-[#666666]">Zoom Meeting ID</p>
                  <p className="text-[1.45rem] leading-tight text-[#1f2167] sm:text-[1.6rem]">309 165 0498</p>
                </div>

                <div>
                  <p className="text-[0.98rem] text-[#666666]">Password</p>
                  <p className="text-[1.45rem] leading-tight text-[#1f2167] sm:text-[1.6rem]">DOMHOUR</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.98rem] text-[#666666]">Registration</p>
                  <p className="text-[1.06rem] leading-snug text-[#2a2a2a]">Call or WhatsApp +254 759 212 577</p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#c2a347] px-5 py-2.5 text-[1.02rem] font-medium text-[#fff8de] shadow-sm"
                >
                  <Phone className="h-4 w-4" />
                  Register Now
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Membership;
