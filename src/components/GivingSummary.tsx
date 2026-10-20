import { Link } from "react-router-dom";
import { Gift, ArrowRight } from "lucide-react";

const highlights = [
  "Tithes & offerings",
  "Seed & partnership",
  "Missions & outreach",
];

function GivingSummary() {
  return (
    <section id="payment" className="bg-[#efefef] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="overflow-hidden rounded-xl border border-[#d8d8d8] bg-[#1f2167] shadow-md">
          <div className="p-8 text-center sm:p-10">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#B38E34]">
              <Gift className="h-6 w-6 text-white" />
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Giving
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[1.05rem] leading-[1.6] text-[#c6c8e8]">
              Your generosity fuels the work of Grace Arena Ministries — from
              local worship and discipleship to outreach and missions across the
              nations. Give cheerfully and partner with what God is doing.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white"
                >
                  {h}
                </span>
              ))}
            </div>

            <Link
              to="/giving"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#B38E34] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#202163]"
            >
              See giving options <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export default GivingSummary;
