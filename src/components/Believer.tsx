import { Phone } from 'lucide-react';

function Believer() {
  return (
    <section id="new-believers" className="bg-[#efefef] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="overflow-hidden border border-[#d9d9d9] bg-black shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
            <iframe
              title="GAM TikTok post"
              src="https://www.tiktok.com/embed/v2/7534202091783326982"
              className="h-full min-h-[430px] w-full lg:min-h-[520px]"
              allow="encrypted-media"
              loading="lazy"
            />
          </article>

          <div className="flex h-full flex-col">
            <header>
              <h2 className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1f2167] sm:text-[2.35rem]">
                GAM New Believers Class
              </h2>
              <p className="mt-1 text-[1.2rem] text-[#6c6c6c]">Grow your faith. Connect deeply. Walk with Christ.</p>
            </header>

            <article className="mt-4 flex-1 border border-[#e0e0e0] bg-[#f6f6f6] px-5 py-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] sm:px-6 sm:py-6">
              <p className="text-[1.02rem] leading-[1.62] text-[#222222] sm:text-[1.08rem]">
                Have you recently given your life to Christ? We&apos;d love to help you grow in faith. Join our{' '}
                <span className="font-semibold">GA New Believers Class</span> every Sunday from{' '}
                <span className="font-semibold">12:15 PM to 1:15 PM EAT</span> at the{' '}
                <span className="font-semibold">Youth Church</span>, located at{' '}
                <span className="font-semibold">Grace Arena Ministries, Bungoma Road, off Baricho Road, Nairobi</span>.
              </p>

              <p className="mt-3 text-[1.02rem] leading-[1.62] text-[#222222] sm:text-[1.08rem]">
                This is a fantastic opportunity to deepen your relationship with God, connect with fellow new believers,
                and become part of our vibrant, Spirit-filled community.
              </p>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.98rem] text-[#666666]">Class Time</p>
                  <p className="text-[1.45rem] leading-tight text-[#1f2167] sm:text-[1.6rem]">
                    Every Sunday, 12:15PM - 1:15PM
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#c2a347] px-5 py-2.5 text-[1.02rem] font-medium text-[#fff8de] shadow-sm"
                >
                  <Phone className="h-4 w-4" />
                  Contact: +254 759 212 577
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Believer;
