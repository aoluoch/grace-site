import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import PaymentDetails from "../components/Payment";
import { Gift, Sprout, Globe2, Church, Quote } from "lucide-react";

const reasons = [
  {
    icon: Church,
    title: "Tithes & offerings",
    body: "Honouring God with the firstfruits of our increase and sustaining the ongoing work and worship of the local church.",
  },
  {
    icon: Sprout,
    title: "Seed & partnership",
    body: "Sowing in faith into the vision of the house and partnering with the ministry God has entrusted to Apostle David Owusu.",
  },
  {
    icon: Globe2,
    title: "Missions & outreach",
    body: "Taking the gospel to the unreached and funding GAM Care and outreach that transforms communities.",
  },
];

function Giving() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#efefef]">
      <header className="bg-[#1f2167] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#B38E34]">
            <Gift className="h-4 w-4" /> Generosity
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            Giving
          </h1>
          <p className="mt-3 max-w-2xl text-[1.1rem] leading-[1.6] text-[#c6c8e8]">
            Partner with Grace Arena Ministries. Every gift advances worship,
            discipleship, compassion and missions — here in Kenya and across the
            nations.
          </p>
        </div>
      </header>

      <main className="flex-1">
        {/* Why we give */}
        <section className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-[#202163] sm:text-3xl">
              Why we give
            </h2>
            <p className="mt-3 text-[1.08rem] leading-[1.75] text-[#252525]">
              Giving is an act of worship and a declaration of trust in God as
              our Provider. At Grace Arena Ministries we give cheerfully, not out
              of compulsion, knowing that God loves a cheerful giver and that
              what we sow in faith He multiplies for His glory.
            </p>
          </div>

          <figure className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[#e2e2e2] bg-white p-6 text-center shadow-sm sm:p-8">
            <Quote className="mx-auto h-7 w-7 text-[#B38E34]" />
            <blockquote className="mt-3 text-xl font-medium leading-relaxed text-[#1f2167] sm:text-2xl">
              “Each of you should give what you have decided in your heart to
              give, not reluctantly or under compulsion, for God loves a cheerful
              giver.”
            </blockquote>
            <figcaption className="mt-3 text-sm uppercase tracking-wide text-[#6d6d6d]">
              2 Corinthians 9:7
            </figcaption>
          </figure>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <article
                  key={r.title}
                  className="rounded-2xl border border-[#dcdcdc] bg-white p-6 shadow-sm"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#202163] text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[#202163]">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[1rem] leading-[1.6] text-[#333]">
                    {r.body}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* How to give — existing payment details */}
        <section className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-[#202163] sm:text-3xl">
              How to give
            </h2>
            <p className="mt-2 text-[1.05rem] text-[#555]">
              Use any of the options below. Thank you for your generosity.
            </p>
          </div>
        </section>
        <PaymentDetails />

        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#1f2167] p-8 text-center sm:p-10">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Give towards GAM Care
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-[#c6c8e8]">
              Want your gift to support our community outreach directly? Learn
              more about GAM Care.
            </p>
            <Link
              to="/care"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#B38E34] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#202163]"
            >
              Explore GAM Care
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Giving;
