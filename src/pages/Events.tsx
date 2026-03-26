import { useEffect } from "react";
import Footer from "../components/Footer";

function Events() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[#202163]">Events</h1>
        <p className="mt-4 text-gray-700">Welcome to the Events page.</p>
      </main>
      <Footer />
    </div>
  );
}

export default Events;
