import { useEffect } from "react";
import { Link } from "react-router-dom";
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
            Effective date: 2 November 2026
          </p>
        </div>
      </header>

      <main className="flex-1">
        <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="space-y-7 rounded-lg border border-[#d8d8de] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:p-8">
            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                1. Who we are
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Grace Arena Ministries is the data controller for personal data
                collected through this website. Our address is Bungoma Road, off
                Baricho Road, Nairobi, Kenya. You can reach us at{" "}
                <span className="font-medium text-[#202163]">
                  gracearenakenya@gmail.com
                </span>{" "}
                or on{" "}
                <span className="font-medium text-[#202163]">0759 212574</span>.
              </p>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                This notice explains how we collect and use personal data under
                the Data Protection Act, 2019 (Kenya) and its regulations. It is
                given before you submit information, as required by section 29
                of the Act. Please read it with our{" "}
                <Link
                  to="/terms"
                  className="font-medium text-[#202163] underline underline-offset-4"
                >
                  Terms and Conditions
                </Link>
                .
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                2. Principles we follow
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We process personal data in line with section 25 of the Act. We
                collect it lawfully and for clear ministry purposes, we ask only
                for what we need, we take reasonable steps to keep it accurate,
                we keep it only as long as those purposes require, and we
                protect it with access controls. We do not sell personal data,
                and we do not use it for commercial marketing unless you have
                expressly asked to hear from us.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                3. Personal data we collect
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We collect personal data directly from you when you use the
                website. Depending on what you do, this may include:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  <span className="font-medium text-[#202163]">
                    Account data.
                  </span>{" "}
                  Your name, email address, and a password that is stored only
                  as a secure hash. We do not store the password in plain text.
                </li>
                <li>
                  <span className="font-medium text-[#202163]">
                    Form data.
                  </span>{" "}
                  Name, email, phone number, and the message or details you
                  choose to send through prayer requests, appointments,
                  professional help requests, event registration, testimonies,
                  contact messages, newsletter sign-up, or your member profile
                  (such as organization or city).
                </li>
                <li>
                  <span className="font-medium text-[#202163]">
                    Sensitive personal data.
                  </span>{" "}
                  Prayer requests, testimonies, and ministry participation can
                  reveal conscience or religious belief. A professional help or
                  counseling request, and anything you write about health,
                  family, or marital circumstances, can be sensitive personal
                  data under section 2 of the Act. Please share only what you
                  want us to know.
                </li>
                <li>
                  <span className="font-medium text-[#202163]">
                    Session data.
                  </span>{" "}
                  A sign-in cookie and a record of your last activity on this
                  browser, used only to keep you signed in and to sign you out
                  after 15 minutes without activity.
                </li>
              </ul>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Giving instructions on this website are payment details you use
                with the listed channels. Those channels receive what you submit
                to them under their own privacy notices. We do not collect card
                numbers on this website.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                4. Why we use it, and whether you must provide it
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Collection through our forms and account pages is voluntary. If
                you do not provide the details a form asks for, we cannot create
                the account, register you, or respond to that request. We do
                not collect this data because a law forces you to give it to us.
              </p>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We rely on the grounds in sections 30 and 45 of the Act:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  Your consent, shown when you create an account or send a form,
                  including consent to handle sensitive personal data you choose
                  to include.
                </li>
                <li>
                  Steps you ask us to take before or during a request, such as
                  an event registration, appointment, or professional help
                  request.
                </li>
                <li>
                  The legitimate activities of Grace Arena Ministries as a
                  religious body, for people who are members or in regular
                  contact with us, with safeguards that keep prayer and care
                  requests inside the ministry unless you consent to wider
                  sharing.
                </li>
                <li>
                  Our legitimate interest in keeping the website secure, and any
                  legal duty that requires us to keep or disclose a record.
                </li>
              </ul>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We use the data to run your account, respond to prayer,
                appointment, professional help, and contact requests, manage
                event registration, publish a testimony only when you have
                allowed that use, send updates you asked for, and protect the
                website from misuse. We do not make decisions about you by
                automated processing alone.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                5. Who receives it, including transfers outside Kenya
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Access inside the ministry is limited. You can see your own
                member records. Authorized administrators can see submissions so
                they can respond. The professional care team can see
                professional help requests so they can contact you. They cannot
                edit or delete those requests.
              </p>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We also use processors who act on our instructions:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  <span className="font-medium text-[#202163]">Appwrite</span>,
                  which hosts accounts and form submissions in the European
                  Union (Frankfurt, Germany).
                </li>
                <li>
                  <span className="font-medium text-[#202163]">Contentful</span>
                  , which hosts published website content. It does not receive
                  your account or form submissions.
                </li>
                <li>
                  Payment channels named on the giving page, if you choose to
                  give through them.
                </li>
                <li>
                  A public authority or other person when Kenyan law or a court
                  order requires disclosure.
                </li>
              </ul>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Storing account and form data in the European Union is a
                transfer outside Kenya under sections 48 and 49 of the Act. The
                provider is contractually required to protect the data and to
                use it only to provide the service. Where the data is sensitive,
                we rely on your consent when you submit it, together with those
                safeguards. Pages may also load fonts or embedded media from
                providers such as Google, YouTube, Instagram, or TikTok. Those
                providers may receive technical information such as your IP
                address under their own policies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                6. Cookies and sign-in
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                A session cookie keeps you signed in. It is essential for the
                member area, the ministry control center, and the care desk. We
                also store the time of your last activity in this browser so we
                can sign you out after 15 minutes of inactivity. You can block
                cookies in your browser, but you will not be able to stay signed
                in.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                7. How long we keep personal data
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We keep personal data only for as long as the purpose requires,
                in line with section 39 of the Act. Account data stays while
                your account is open. A request is kept while we are responding
                and for a limited period afterwards so we can follow up and keep
                a ministry record. We then delete it or remove the details that
                identify you, unless a longer period is required for a legal
                claim, a legal duty, or a record you have asked us to keep. You
                may ask us to delete data that is no longer needed.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                8. Security and personal data breaches
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We use technical and organisational measures under sections 41
                and 42 of the Act. Passwords are hashed. Form records are
                restricted by access controls. An idle sign-in ends after 15
                minutes. Our processors are required to protect the data and to
                follow our instructions. No online service can promise absolute
                security.
              </p>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                If personal data is accessed by an unauthorised person and there
                is a real risk of harm, we will notify the Office of the Data
                Protection Commissioner without delay, within 72 hours of
                becoming aware, and we will write to affected people where
                section 43 of the Act requires it.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                9. Your rights
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Under the Act you have the right to:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  Be informed of the use of your personal data (section 26).
                </li>
                <li>
                  Access personal data we hold about you, and receive a copy in
                  a commonly used format where section 38 applies. We will
                  respond within 30 days, or tell you if a complex request needs
                  more time.
                </li>
                <li>
                  Correct false or misleading data, and ask us to delete false
                  or misleading data (sections 26 and 40).
                </li>
                <li>
                  Object to processing, and ask us to restrict it while an
                  objection or correction is considered (sections 34 and 36).
                </li>
                <li>
                  Withdraw consent at any time. Withdrawal does not undo
                  processing that was already lawful. If you withdraw consent
                  for a request, we will stop using it for that purpose unless
                  the law requires us to keep it.
                </li>
                <li>
                  Not be subject to a decision based solely on automated
                  processing that produces a legal effect or significantly
                  affects you (section 35). We do not make such decisions.
                </li>
              </ul>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Write to gracearenakenya@gmail.com to exercise these rights. We
                may ask for information to confirm it is your request. You may
                also lodge a complaint with the Office of the Data Protection
                Commissioner under section 56 of the Act, through{" "}
                <a
                  href="https://www.odpc.go.ke"
                  className="font-medium text-[#202163] underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.odpc.go.ke
                </a>
                .
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                10. Children
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                A child is a person under 18. This website is directed at
                adults. We do not knowingly process a child’s personal data
                unless a parent or guardian has consented and the processing
                protects the child’s best interests, as required by section 33
                of the Act. If you believe we hold a child’s data without that
                authority, contact us and we will delete it.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                11. Links to other sites
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Links to social media, maps, or payment providers leave this
                website. Those organisations are separate data controllers and
                their notices apply once you use their services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                12. Changes to this notice
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We will post any change on this page and change the effective
                date. If a change affects sensitive personal data in a new way,
                we will ask for consent before using your data for that new
                purpose.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                13. Contact
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Data protection questions and requests go to Grace Arena
                Ministries, Bungoma Road, off Baricho Road, Nairobi, at{" "}
                <span className="font-medium text-[#202163]">
                  gracearenakenya@gmail.com
                </span>{" "}
                or{" "}
                <span className="font-medium text-[#202163]">0759 212574</span>.
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
