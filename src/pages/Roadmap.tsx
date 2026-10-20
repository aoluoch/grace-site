import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import RoadmapGraphic from "../components/Roadmap";
import {
  BookOpen,
  Globe2,
  HandHeart,
  Handshake,
  ArrowRight,
} from "lucide-react";

const stages = [
  {
    id: 1,
    title: "Connect",
    icon: Handshake,
    tagline: "With God and His people.",
    body: "Everything at Grace Arena Ministries begins with connection. We help every person encounter the living God through heartfelt worship, fervent prayer and authentic fellowship. Whether you are new to faith or returning home, our Sunday services, prayer altars and small groups are doorways into a genuine relationship with God and a loving church family.",
    points: [
      "Weekly worship services and prayer meetings",
      "New Believers Classes to establish your foundation",
      "Small groups and fellowship for real community",
    ],
  },
  {
    id: 2,
    title: "Grow",
    icon: BookOpen,
    tagline: "In the knowledge of God’s Word.",
    body: "We are committed to raising mature, Spirit-filled believers who are rooted in Scripture. Through sound teaching, discipleship and the School of Prophets, we equip you to know God’s Word, discern His voice and walk in spiritual maturity. Growth is not accidental — it is the fruit of consistent feeding on the Word and surrender to the Holy Spirit.",
    points: [
      "Expository teaching and discipleship pathways",
      "School of Prophets and leadership development",
      "Membership classes that deepen your walk",
    ],
  },
  {
    id: 3,
    title: "Serve",
    icon: HandHeart,
    tagline: "With our lives, families and resources.",
    body: "Every believer is called and gifted to serve. At Grace Arena Ministries we help you discover your purpose and deploy your gifts — in the house of God, in your family and in the community. Through GAM Care and our outreach initiatives, service becomes a lifestyle of love that reflects the heart of Christ to a hurting world.",
    points: [
      "Ministry teams and volunteer opportunities",
      "GAM Care community and compassion outreach",
      "Stewardship of time, talent and resources",
    ],
  },
  {
    id: 4,
    title: "Expand",
    icon: Globe2,
    tagline: "To the unreached in the nations.",
    body: "The vision of Grace Arena Ministries reaches far beyond our walls. We are a sending church, carrying the gospel to the unreached and partnering with ministries across the nations. Through missions, media and the affiliated works of David Owusu Ministries, we labour to see the knowledge of God’s glory cover the earth.",
    points: [
      "Local and global missions and outreach",
      "Media and online ministry to the nations",
      "Church planting and ministry partnerships",
    ],
  },
];

function Roadmap() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#efefef]">
      <header className="bg-[#1f2167] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B38E34]">
            Our discipleship journey
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            The GAM Roadmap
          </h1>
          <p className="mt-3 max-w-2xl text-[1.1rem] leading-[1.6] text-[#c6c8e8]">
            Connect • Grow • Serve • Expand — the four movements that shape every
            life at Grace Arena Ministries, from a first encounter with God to
            carrying His presence to the nations.
          </p>
        </div>
      </header>

      <main className="flex-1">
        {/* The visual roadmap */}
        <RoadmapGraphic />

        {/* Expanded stages */}
        <section className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <article
                  key={stage.id}
                  className="rounded-2xl border border-[#dcdcdc] bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#202163] text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm font-bold text-[#B38E34]">
                          0{stage.id}
                        </span>
                        <h2 className="text-2xl font-semibold text-[#202163]">
                          {stage.title}
                        </h2>
                      </div>
                      <p className="mt-0.5 text-[#6d6d6d]">{stage.tagline}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-[1.08rem] leading-[1.75] text-[#252525]">
                    {stage.body}
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                    {stage.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-lg bg-[#f6f6f9] px-4 py-3 text-sm font-medium text-[#1f2167]"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl bg-[#1f2167] p-8 text-center sm:p-10">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Ready to take your next step?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-[#c6c8e8]">
              Wherever you are on the journey, there is a next step for you at
              Grace Arena Ministries.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/connect"
                className="inline-flex items-center gap-2 rounded-md bg-[#B38E34] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#202163]"
              >
                Connect with us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See upcoming events
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Roadmap;
