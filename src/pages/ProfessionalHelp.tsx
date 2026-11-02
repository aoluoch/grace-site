import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import Footer from "../components/Footer";
import ProfessionalHelpForm from "../components/forms/ProfessionalHelpForm";
import Gimage from "../assets/fav.png";
import { CARE_PHONES } from "../lib/professionalHelp";

function ProfessionalHelp() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#efeff2]">
      <header className="bg-[#1f2167] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B38E34]">
            Professional care
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            Reach out to our team
          </h1>
          <p className="mt-3 max-w-2xl text-[1.1rem] leading-relaxed text-[#c6c8e8]">
            Grace Arena&rsquo;s professional care team is here for confidential
            support. Call, speak with us after service, or send a request and
            we will follow up.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-5">
          <section className="rounded-2xl border border-[#dfdfdf] bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
            <img
              src={Gimage}
              alt="Grace Arena Ministries"
              className="mx-auto h-16 w-auto object-contain"
            />
            <p className="mt-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#202163]">
              Reach out to
            </p>
            <ul className="mt-4 space-y-3 text-center">
              {CARE_PHONES.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center gap-2 text-2xl font-bold tracking-wide text-[#202163] hover:text-[#B38E34]"
                  >
                    <Phone className="h-5 w-5 text-[#B38E34]" />
                    {phone}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-[#ececf3] pt-6">
              <p className="flex items-center gap-2 text-xl font-semibold text-[#202163]">
                <MapPin className="h-6 w-6 shrink-0 text-[#e23d8c]" />
                <span className="underline decoration-[#202163] decoration-2 underline-offset-4">
                  Information Desk
                </span>
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug text-[#212121]">
                Speak privately with our team after service
              </p>
            </div>

            <p className="mt-8 text-sm text-[#676767]">
              Care team member?{" "}
              <Link
                to="/login"
                state={{ from: "/therapy" }}
                className="font-semibold text-[#202163] hover:text-[#B38E34]"
              >
                Sign in to your desk
              </Link>
            </p>
          </section>

          <section className="rounded-2xl border border-[#dfdfdf] bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
            <div className="mb-6 h-[3px] w-14 bg-[#B38E34]" />
            <h2 className="text-2xl font-semibold text-[#202163]">
              Request professional help
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#676767]">
              Tell us how to reach you and the kind of help you need. Only the
              professional care team and ministry office can see this request.
            </p>
            <div className="mt-6">
              <ProfessionalHelpForm />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProfessionalHelp;
