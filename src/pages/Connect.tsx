import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PrayerRequestForm from "../components/forms/PrayerRequestForm";
import AppointmentForm from "../components/forms/AppointmentForm";
import TestimonyForm from "../components/forms/TestimonyForm";
import ContactForm from "../components/forms/ContactForm";
import SubscribeForm from "../components/forms/SubscribeForm";
import { HandHelping, CalendarClock, Sparkles, Mail, Send } from "lucide-react";

const TABS = [
  {
    id: "prayer",
    label: "Prayer Request",
    icon: HandHelping,
    blurb:
      "Share a confidential prayer request. Only our authorized prayer team can see it.",
    render: () => <PrayerRequestForm />,
  },
  {
    id: "appointment",
    label: "Appointment",
    icon: CalendarClock,
    blurb:
      "Request a pastoral visit, counseling session or ministration. We'll confirm a time with you.",
    render: () => <AppointmentForm />,
  },
  {
    id: "testimony",
    label: "Testimony",
    icon: Sparkles,
    blurb: "Tell us what God has done. Approved testimonies may be shared to encourage others.",
    render: () => <TestimonyForm />,
  },
  {
    id: "subscribe",
    label: "Newsletter & SMS",
    icon: Mail,
    blurb:
      "Subscribe to approved ministry updates by email or SMS. Update preferences any time.",
    render: () => <SubscribeForm />,
  },
  {
    id: "contact",
    label: "General Inquiry",
    icon: Send,
    blurb: "Have a question? Send us a message and the right team will respond.",
    render: () => <ContactForm />,
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

function getInitialTab(): TabId {
  if (typeof window === "undefined") return "prayer";
  const hash = window.location.hash.replace("#", "");
  return (TABS.some((t) => t.id === hash) ? hash : "prayer") as TabId;
}

function Connect() {
  const [active, setActive] = useState<TabId>(getInitialTab);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const activeTab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div className="flex min-h-screen flex-col bg-[#efefef]">
      <header className="bg-[#1f2167] py-10 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Connect</h1>
          <p className="mt-2 max-w-2xl text-[1.05rem] text-[#c6c8e8]">
            Prayer requests, appointments, testimonies, newsletter sign-ups and
            inquiries — every submission is routed to the right team.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#202163] text-white"
                    : "bg-white text-[#202163] hover:bg-[#202163]/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <section className="mt-6 rounded-xl border border-[#dcdcdc] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 h-[3px] w-14 bg-[#B38E34]" />
          <h2 className="text-2xl font-semibold text-[#202163]">
            {activeTab.label}
          </h2>
          <p className="mb-6 mt-1 text-sm text-[#676767]">{activeTab.blurb}</p>
          {activeTab.render()}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Connect;
