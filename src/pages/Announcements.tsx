import { useEffect } from 'react';
import AnnouncementComponent from '../components/AnnouncementComponent';
import Footer from '../components/Footer';

function Announcements() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f8]">
      <header className="relative overflow-hidden bg-linear-to-br from-[#1f2167] via-[#252680] to-[#181a52] py-14 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#B38E34]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-white/5 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E7C877]">
            Grace Arena Ministries
          </span>
          <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
            Announcements
          </h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-[#c6c8e8]">
            Stay up to date with the latest news, notices, and messages from
            Grace Arena Ministries.
          </p>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <AnnouncementComponent />
      </main>

      <Footer />
    </div>
  );
}

export default Announcements;
