import { useEffect } from "react";
import Footer from "../components/Footer";

function Terms() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#efefef]">
      <header className="bg-[#1f2167] py-10 sm:py-12">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-[1.02rem] text-[#c6c8e8] sm:text-[1.08rem]">
            Effective date: October 20, 2026
          </p>
        </div>
      </header>

      <main className="flex-1">
        <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="space-y-7 rounded-lg border border-[#d8d8de] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:p-8">
            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                1. Acceptance of Terms
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                These Terms of Service (Terms) govern your use of the Grace
                Arena Ministries website and online services, including member
                accounts, forms, and the member area. By accessing or using our
                website or creating an account, you agree to these Terms. If you
                do not agree, please do not use our services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                2. Our Services
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We provide ministry-related information and online features such
                as prayer requests, appointment and counseling bookings, event
                registration, testimonies, newsletters, giving information, and
                a member area where you can manage your account and submissions.
                We may add, change, or discontinue features at any time.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                3. Accounts and Eligibility
              </h2>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  Member accounts are intended for adults. You agree to provide
                  accurate and current information when registering.
                </li>
                <li>
                  You are responsible for keeping your password confidential and
                  for all activity that occurs under your account.
                </li>
                <li>
                  Please notify us promptly of any unauthorized use of your
                  account.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                4. Acceptable Use
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                You agree not to use our services to:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  Break any law, or post unlawful, abusive, harassing, or
                  misleading content.
                </li>
                <li>
                  Submit another person&rsquo;s personal information without
                  their consent.
                </li>
                <li>
                  Attempt to gain unauthorized access to accounts, data, or our
                  systems, or disrupt the operation of the website.
                </li>
                <li>
                  Upload malicious code or otherwise interfere with other
                  users&rsquo; use of the services.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                5. Your Submissions and Content
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                You are responsible for the content you submit, including prayer
                requests, testimonies, and messages. By submitting a testimony
                or similar content, you give Grace Arena Ministries permission
                to use and share it for ministry purposes unless you tell us
                otherwise. Prayer requests and personal messages are handled
                with care and are only accessible to you and authorized
                administrators, as described in our{" "}
                <a
                  href="/privacy-policy"
                  className="font-medium text-[#202163] underline underline-offset-4"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                6. Donations and Giving
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Donations are voluntary and are processed through the payment
                channels listed on our giving pages. Gifts are generally
                non-refundable except where required by law or in the case of a
                clear processing error. Please contact us if you believe a gift
                was made in error.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                7. Intellectual Property
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                The content on this website, including text, graphics, logos,
                and media, belongs to Grace Arena Ministries or its licensors
                and is protected by applicable laws. You may not reproduce or
                distribute it for commercial purposes without our permission.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                8. Third-Party Services and Links
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We rely on third-party providers to operate our services and may
                link to external platforms such as social media or payment
                providers. We are not responsible for the content or practices
                of third-party sites, which are governed by their own terms and
                policies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                9. Disclaimers
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Our services are provided on an &ldquo;as is&rdquo; and &ldquo;as
                available&rdquo; basis. Pastoral, prayer, and ministry content is
                offered for spiritual encouragement and is not a substitute for
                professional medical, legal, financial, or psychological advice.
                We do not warrant that the services will be uninterrupted or
                error-free.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                10. Limitation of Liability
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                To the fullest extent permitted by law, Grace Arena Ministries
                will not be liable for any indirect, incidental, or
                consequential damages arising from your use of, or inability to
                use, our services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                11. Suspension and Termination
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We may suspend or terminate accounts that violate these Terms or
                misuse our services. You may close your account at any time by
                contacting us.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                12. Changes to These Terms
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We may update these Terms from time to time. Updates will be
                posted on this page with a revised effective date, and your
                continued use of the services means you accept the changes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                13. Governing Law
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                These Terms are governed by the laws of the Republic of Kenya,
                without regard to conflict-of-law principles.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                14. Contact Us
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                If you have any questions about these Terms, please contact us at
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

export default Terms;
