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
            Effective date: October 20, 2026
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
                visit our website, create an account, use our member area, or
                submit information through our online forms.
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
                  <span className="font-medium text-[#202163]">
                    Account information.
                  </span>{" "}
                  When you create a member account, we collect your name, email
                  address, and a securely hashed password. We never store your
                  password in plain text.
                </li>
                <li>
                  <span className="font-medium text-[#202163]">
                    Information you submit through forms.
                  </span>{" "}
                  Depending on the form, this may include your name, email
                  address, phone number, preferred contact method, and the
                  details you choose to share — for example prayer requests,
                  appointment or counseling bookings, event registrations,
                  testimonies, contact messages, newsletter sign-ups, and member
                  profile details (such as your organization or city).
                </li>
                <li>
                  <span className="font-medium text-[#202163]">
                    Donation-related information
                  </span>{" "}
                  required to process and confirm gifts through listed payment
                  channels.
                </li>
                <li>
                  <span className="font-medium text-[#202163]">
                    Technical and usage information,
                  </span>{" "}
                  such as browser type, device details, pages visited, and
                  cookies or similar technologies used to keep you signed in.
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
                  Create and manage your member account and secure sign-in.
                </li>
                <li>
                  Respond to prayer requests, appointment and counseling
                  bookings, contact messages, and other inquiries.
                </li>
                <li>
                  Manage event registrations and let you view and cancel your
                  own bookings in the member area.
                </li>
                <li>
                  Process donations and maintain giving records where
                  applicable.
                </li>
                <li>
                  Send ministry updates and newsletters if you have requested
                  communication from us.
                </li>
                <li>
                  Maintain the security of our services and prevent misuse.
                </li>
                <li>
                  Improve website performance, content, and user experience.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                4. Cookies and Sessions
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                When you sign in, we use a secure session cookie provided by our
                backend service to keep you logged in and protect your account.
                These are essential to the operation of the member area. You can
                control cookies through your browser settings, but disabling
                them may prevent you from signing in.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                5. Sharing of Information
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We do not sell your personal information. We share information
                with trusted service providers only when needed to run our
                website and services, or to comply with legal obligations. These
                providers include:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  <span className="font-medium text-[#202163]">Appwrite</span> —
                  our backend provider, which hosts member accounts, form
                  submissions, and related data on secured cloud
                  infrastructure (European Union region).
                </li>
                <li>
                  <span className="font-medium text-[#202163]">Contentful</span>{" "}
                  — our content management platform, used to publish website
                  content.
                </li>
                <li>
                  Payment and donation providers listed on our giving pages,
                  which process gifts under their own privacy policies.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                6. Data Retention
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We keep personal information only for as long as needed to
                provide our services, respond to your requests, maintain giving
                and ministry records, and meet legal obligations. You may ask us
                to delete your account or submissions at any time, subject to
                applicable law and record-keeping responsibilities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                7. Data Security
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We take reasonable administrative and technical measures to
                protect personal information, including hashed passwords and
                access controls that restrict submissions to you and authorized
                administrators. However, no online system can guarantee absolute
                security.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                8. Your Rights and Choices
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                You may access and update your account details and profile from
                the member area, and unsubscribe from communications at any
                time. You may also contact us to request access, correction, or
                deletion of personal information we hold, including closing your
                account, subject to applicable law and record-keeping
                responsibilities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                9. Children&rsquo;s Privacy
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Our online accounts and forms are intended for adults. We do not
                knowingly collect personal information from children without the
                consent of a parent or guardian. If you believe a child has
                provided us information, please contact us so we can remove it.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                10. Third-Party Links
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Our website may include links to third-party platforms such as
                social media or payment providers. Their privacy practices are
                governed by their own policies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                11. Changes to This Policy
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We may update this Privacy Policy from time to time. Updates
                will be posted on this page with a revised effective date.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                12. Contact Us
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
