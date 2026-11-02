import { useEffect } from "react";
import { Link } from "react-router-dom";
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
            Terms and Conditions
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
                1. Agreement
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                These Terms and Conditions govern your use of the Grace Arena
                Ministries website, including accounts, forms, event
                registration, the member area, and the professional care
                request. By using the website or creating an account, you agree
                to these Terms and to our{" "}
                <Link
                  to="/privacy-policy"
                  className="font-medium text-[#202163] underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                . If you do not agree, please do not use the website.
              </p>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                The Terms are governed by the laws of the Republic of Kenya,
                including the Data Protection Act, 2019. Nothing in these Terms
                limits a right that the Act, or any other Kenyan law, does not
                allow us to limit.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                2. Who may use the website
              </h2>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  Accounts and forms are for people aged 18 and over. Under the
                  Data Protection Act, a person under 18 is a child, and we do
                  not knowingly collect a child’s personal data unless a parent
                  or guardian consents.
                </li>
                <li>
                  If you send information about another person, including a
                  child, you confirm that you have authority to do so and, where
                  the law requires it, that person’s consent or a parent or
                  guardian’s consent.
                </li>
                <li>
                  You agree to give accurate information and to keep your
                  password confidential. Tell us promptly if you believe someone
                  else has used your account.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                3. The services
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We provide ministry information and online features such as
                prayer requests, appointments, professional help requests, event
                registration, testimonies, newsletters, giving information, and
                a member area. We may add, change, or discontinue a feature.
                Availability can be interrupted for maintenance or circumstances
                outside our control.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                4. Your personal data
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Grace Arena Ministries is the data controller for personal data
                you submit here. The Privacy Policy states what we collect, why
                we collect it, the fact that supply is voluntary, who receives
                it, and your rights under sections 26, 34, 35, 36, 38, and 40 of
                the Data Protection Act.
              </p>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Sending a form or creating an account is your consent to use
                that information for the purpose of the form. Prayer, testimony,
                and professional help requests may include sensitive personal
                data, such as religious belief or information about health or
                family circumstances. By sending that request you consent to our
                handling it for that purpose, and to its storage by our backend
                provider in the European Union, as described in the Privacy
                Policy. You may withdraw consent by contacting us. Withdrawal
                does not affect processing that was already lawful.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                5. Acceptable use
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                You agree not to:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-[1rem] leading-7 text-[#3f3f59]">
                <li>
                  Break Kenyan law, or submit unlawful, abusive, harassing, or
                  misleading content.
                </li>
                <li>
                  Submit another person’s personal data without authority, or
                  use personal data from this website for your own commercial
                  purpose.
                </li>
                <li>
                  Attempt to access an account, record, or system you are not
                  allowed to use, or interfere with the website.
                </li>
                <li>Upload malicious code.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                6. Submissions
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                You are responsible for what you submit. A testimony may be
                shared for ministry purposes when you have agreed to that use.
                Prayer requests, personal messages, and professional help
                requests are kept for the ministry team that needs them to
                respond. They are not published on the website. You can ask us
                to correct or delete a submission as described in the Privacy
                Policy.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                7. Professional care
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                A professional help request lets the care team contact you about
                the kind of help you asked for. It is a confidential ministry
                service. It is not an emergency service and it is not a
                substitute for medical care, crisis services, or advice from a
                qualified professional. If you or someone else is in immediate
                danger, contact local emergency services. Health-related details
                you choose to send are treated as sensitive personal data and
                are limited to the care team and authorized ministry
                administrators.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                8. Giving
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Giving is voluntary. Gifts are made through the payment channels
                listed on the giving page, under those channels’ own terms. A
                gift is generally not refundable, except where Kenyan law
                requires a refund or the gift was taken in clear error. Contact
                us if you believe a gift was made in error.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                9. Intellectual property
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Text, graphics, logos, sermons, and other media on this website
                belong to Grace Arena Ministries or its licensors and are
                protected by Kenyan copyright and related laws. You may share a
                link for personal ministry use. You may not copy the content for
                a commercial purpose without our permission.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                10. Other services
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We use service providers to host the website and its data, and
                we link to social media and payment services. Their terms apply
                when you use their services. We are not responsible for their
                content.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                11. Ministry content
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Sermons, prayer, and other ministry content are offered for
                spiritual encouragement. They are not medical, legal, financial,
                or psychological advice. We do not promise that the website will
                always be available or free of errors.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                12. Liability
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                To the extent Kenyan law allows, Grace Arena Ministries is not
                liable for indirect or consequential loss arising from your use
                of the website. This section does not exclude liability for
                fraud, for harm caused by negligence where the law does not
                allow exclusion, or for a duty owed to you under the Data
                Protection Act.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                13. Suspension and closing an account
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We may suspend or close an account that breaks these Terms or
                misuses the website. You may ask us to close your account. We
                will delete or return personal data we no longer need, subject
                to any record the law requires us to keep.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                14. Changes
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                We may update these Terms by posting the new version on this
                page with a new effective date. If you continue to use the
                website after that date, you accept the updated Terms. A change
                to how we use personal data is also covered by the Privacy
                Policy.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#202163]">
                15. Complaints and disputes
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Please contact us first so we can try to resolve a concern.
                Disputes about these Terms are subject to the laws of Kenya and
                to the Kenyan courts. A complaint about personal data may also
                be made to the Office of the Data Protection Commissioner under
                section 56 of the Data Protection Act, through{" "}
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
                16. Contact
              </h2>
              <p className="text-[1rem] leading-7 text-[#3f3f59]">
                Grace Arena Ministries, Bungoma Road, off Baricho Road, Nairobi,
                Kenya. Email{" "}
                <span className="font-medium text-[#202163]">
                  gracearenakenya@gmail.com
                </span>{" "}
                or call{" "}
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

export default Terms;
