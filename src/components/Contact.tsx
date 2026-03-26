function Contact() {
  return (
    <section id="contact" className="bg-[#efefef] pb-10 sm:pb-12 lg:pb-16">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <article className="border border-[#dcdcdc] bg-[#f4f4f6] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:p-8 lg:p-9">
          <div className="mb-4 h-[3px] w-full bg-[#c4ae59]" />

          <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1f2167] sm:text-[2.5rem]">
            Have You Recently Given Your Life to Christ?
          </h2>

          <p className="mt-4 text-[1.15rem] leading-[1.55] text-[#212121] sm:text-[1.3rem]">
            We&apos;d love to help you grow in faith. Join our{' '}
            <span className="font-semibold underline">Grace Arena New Believers Classes</span> every Sunday from{' '}
            <span className="font-semibold">12:15 - 1:15 p.m.</span> at the <span className="font-semibold">Youth Church.</span>
          </p>

          <p className="mt-4 text-[1.12rem] leading-[1.6] text-[#212121] sm:text-[1.25rem]">
            This is a fantastic opportunity to deepen your relationship with God, connect with fellow new believers,
            and become part of our vibrant community.
          </p>

          <div className="mt-6 rounded-[6px] border border-[#d8d8de] bg-[#efeff3] px-5 py-5 sm:px-6 sm:py-6">
            <p className="text-[0.92rem] font-semibold uppercase tracking-[0.13em] text-[#6d6d83] sm:text-[1rem]">
              For More Information
            </p>
            <p className="mt-1.5 text-[2rem] font-semibold leading-none text-[#1f2167] sm:text-[2.3rem]">+254 759 212 577</p>
            <p className="mt-3 text-[1.03rem] italic text-[#676767] sm:text-[1.12rem]">We can&apos;t wait to see you there.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Contact;
