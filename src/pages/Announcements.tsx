import { useEffect } from 'react';
import AnnouncementComponent from '../components/AnnouncementComponent';
import Footer from '../components/Footer';

function Announcements() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#efefef]">
      <header className="bg-[#1f2167] py-10 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Announcements</h1>
          <p className="mt-2 text-[1.05rem] text-[#c6c8e8]">
            Stay up to date with the latest news, notices, and messages from Grace Arena Ministries.
          </p>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <AnnouncementComponent />
      </main>

      <Footer />
    </div>
  );
}

export default Announcements;
