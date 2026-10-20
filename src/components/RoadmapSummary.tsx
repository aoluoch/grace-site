import { Link } from "react-router-dom";
import { BookOpen, Globe2, HandHeart, Handshake, ArrowRight } from "lucide-react";

const steps = [
  { id: 1, title: "CONNECT", description: "With God through worship, prayer, and fellowship.", icon: Handshake },
  { id: 2, title: "GROW", description: "In the knowledge of God’s Word.", icon: BookOpen },
  { id: 3, title: "SERVE", description: "With our lives, families, and resources.", icon: HandHeart },
  { id: 4, title: "EXPAND", description: "To the unreached in the nations of the world.", icon: Globe2 },
];

function RoadmapSummary() {
  return (
    <section id="gam-roadmap" className="bg-[#efefef] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-280 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-[36px] font-semibold leading-none tracking-[-0.02em] text-[#1f2167] sm:text-[40px]">
            GAM Roadmap
          </h2>
          <p className="mt-2 text-[20px] leading-none text-[#666666]">
            Connect • Grow • Serve • Expand
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="relative rounded-2xl border border-[#ececec] bg-[#f8f8f8] px-5 pb-5 pt-6 shadow-[0_2px_8px_rgba(0,0,0,0.07)]"
              >
                <div className="absolute -top-5 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#b9953b] bg-[#c2a347] text-[15px] font-semibold text-[#fff8de] shadow-[0_2px_7px_rgba(0,0,0,0.2)]">
                  {item.id}
                </div>
                <h3 className="mt-2 flex items-center gap-1.5 text-[1.45rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1f2167]">
                  <Icon className="h-4 w-4 text-[#c2a347]" strokeWidth={2.4} />
                  <span>{item.title}</span>
                </h3>
                <p className="mt-1.5 text-[1.03rem] leading-[1.45] text-[#232323]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 rounded-md bg-[#202163] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B38E34]"
          >
            Explore the full roadmap <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RoadmapSummary;
