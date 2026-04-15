import { useEffect } from "react";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#efefef]">
      <header className="bg-[#1f2167] py-10 sm:py-12">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-[1.02rem] text-[#c6c8e8] sm:text-[1.08rem]">
            Effective date: April 15, 2026
          </p>
        </div>
      </header>

      <main className="flex-1">
        <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="space-y-7 rounded-lg border border-[#d8d8de] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:p-8">
            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                1. Introduction
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Grace Arena Ministries (we, us, or our) is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, store, and protect personal information when you
                visit our website.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                2. Information We Collect
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We may collect the following types of information:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  Contact information you share with us, such as your name,
                  email address, or phone number.
                </li>
                <li>
                  Donation-related information required to process and confirm
                  gifts through listed payment channels.
                </li>
                <li>
                  Basic technical information, such as browser type, device
                  details, and pages visited.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                3. How We Use Your Information
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We use collected information to:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  Respond to inquiries and provide ministry-related support.
                </li>
                <li>
                  Process donations and maintain giving records where
                  applicable.
                </li>
                <li>
                  Improve website performance, content, and user experience.
                </li>
                <li>
                  Share ministry updates if you have requested communication
                  from us.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                4. Sharing of Information
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We do not sell your personal information. We may share
                information with trusted service providers only when needed to
                run our website, process donations, or comply with legal
                obligations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                5. Data Security
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We take reasonable administrative and technical measures to
                protect personal information. However, no online system can
                guarantee absolute security.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                6. Your Rights and Choices
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                You may contact us to request access, correction, or deletion of
                personal information we hold, subject to applicable law and
                record-keeping responsibilities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                7. Third-Party Links
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Our website may include links to third-party platforms such as
                social media or payment providers. Their privacy practices are
                governed by their own policies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                8. Changes to This Policy
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We may update this Privacy Policy from time to time. Updates
                will be posted on this page with a revised effective date.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                9. Contact Us
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                If you have any questions about this Privacy Policy, please
                contact us at
                <span className="font-medium text-[#202163]">
                  {" "}
                  gracearenakenya@gmail.com
                </span>{" "}
                or call
                <span className="font-medium text-[#202163]"> 0759 212574</span>
                .
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
