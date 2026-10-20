import { Link } from "react-router-dom";
import { HeartHandshake, ArrowRight } from "lucide-react";

function CareSummary() {
  return (
    <section id="gam-care" className="bg-[#efeff2] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-[#dfdfdf] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <div className="grid items-center gap-0 lg:grid-cols-2">
            <div className="p-7 sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#202163]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#202163]">
                <HeartHandshake className="h-4 w-4" /> Community Outreach
              </span>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#202163] sm:text-5xl">
                GAM Care
              </h2>
              <p className="mt-3 text-xl text-[#6d6d6d]">
                Our heart for the community in action.
              </p>
              <p className="mt-4 text-[1.08rem] leading-[1.7] text-[#252525]">
                Through GAM Care, Grace Arena Ministries reaches out beyond the
                walls of the church — feeding families, supporting the
                vulnerable, and sharing the love of Christ with our community
                through ongoing drives and compassion initiatives.
              </p>
              <Link
                to="/care"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#B38E34] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#202163]"
              >
                Learn about GAM Care <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="hidden h-full min-h-72 bg-[#1f2167] lg:block">
              <div className="flex h-full flex-col justify-center gap-4 p-9 text-white">
                <p className="text-2xl font-semibold leading-snug">
                  “Give, and it will be given to you.”
                </p>
                <p className="text-sm uppercase tracking-wide text-[#c6c8e8]">
                  Luke 6:38
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareSummary;
