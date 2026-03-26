function Visionary() {
  return (
    <section className="bg-[#efefef] py-12 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[420px_1fr] lg:gap-10 lg:px-8">
        <div className="mx-auto w-full max-w-[420px] lg:mx-0">
          <div className="h-[236px] w-full overflow-hidden bg-black shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
            <iframe
              title="Official Launch of Grace Arena Ministries"
              src="https://www.youtube-nocookie.com/embed/X2pllMejoBw?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <article className="self-start bg-[#f8f7f3] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <header className="border-b-2 border-[#c39d3a] bg-[#1f2167] px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold tracking-wide text-[#c39d3a] sm:text-[1.95rem] sm:leading-none">
              MEET APOSTLE DAVID OWUSU
            </h2>
          </header>

          <div className="space-y-5 px-5 py-6 text-[1rem] leading-8 text-[#222] sm:px-6 sm:text-[1.08rem] sm:leading-8 lg:text-[1.2rem] lg:leading-[2.35rem]">
            <p>
              Apostle David Owusu is a passionate revivalist, teacher, leader, author, and entrepreneur
              - driven to awaken purpose, identity, and spiritual fire in this generation. His ministry
              is marked by boldness, prophetic insight, and practical impact. Beyond ministry, he is a
              devoted family man, married to Dr. Eunice Owusu, and together they have been blessed with
              three children.
            </p>

            <p>
              He is the founder of <strong>David Owusu Ministries</strong> and the visionary behind{' '}
              <strong>Grace Arena Ministries</strong>, <strong>Grace Encounter</strong>, and{' '}
              <strong>Intervarsity Worship Experience</strong>.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Visionary;
