import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CareContent from "../components/Care";
import {
  HeartHandshake,
  Utensils,
  Users,
  HandHeart,
  ArrowRight,
} from "lucide-react";

const pillars = [
  {
    icon: Utensils,
    title: "Feeding the hungry",
    body: "Our monthly food drive provides essential supplies to families and individuals in need across the community.",
  },
  {
    icon: Users,
    title: "Caring for the vulnerable",
    body: "We reach out to widows, orphans, the elderly and the overlooked — offering practical support and the hope of Christ.",
  },
  {
    icon: HandHeart,
    title: "Compassion in action",
    body: "GAM Care mobilises members to serve with their time and resources, turning faith into tangible love for our neighbours.",
  },
];

function Care() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#efeff2]">
      <header className="bg-[#1f2167] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#B38E34]">
            <HeartHandshake className="h-4 w-4" /> Community Outreach
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            GAM Care
          </h1>
          <p className="mt-3 max-w-2xl text-[1.1rem] leading-[1.6] text-[#c6c8e8]">
            The compassion arm of Grace Arena Ministries — extending the love of
            Christ beyond our walls through practical care, generosity and
            community impact.
          </p>
        </div>
      </header>

      <main className="flex-1">
        {/* Intro + pillars */}
        <section className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-[#202163] sm:text-3xl">
              Faith expressed through love
            </h2>
            <p className="mt-3 text-[1.08rem] leading-[1.75] text-[#252525]">
              At Grace Arena Ministries we believe the gospel is both proclaimed
              and demonstrated. GAM Care is how we put our faith to work —
              meeting real needs, restoring dignity, and showing our community
              that they are seen, valued and loved by God.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className="rounded-2xl border border-[#dfdfdf] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#202163]/10 text-[#202163]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[#202163]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[1rem] leading-[1.6] text-[#333]">
                    {p.body}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Live Contentful-powered GAM Care content (unchanged) */}
        <CareContent />

        {/* Get involved */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#1f2167] p-8 text-center sm:p-10">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Be part of the impact
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-[#c6c8e8]">
              Volunteer your time, donate supplies, or give financially to
              sustain GAM Care’s ongoing work in the community.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/connect#subscribe"
                className="inline-flex items-center gap-2 rounded-md bg-[#B38E34] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#202163]"
              >
                Get involved <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/giving"
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Give to GAM Care
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Care;
