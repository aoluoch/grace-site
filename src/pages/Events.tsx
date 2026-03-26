import { useEffect } from "react";
import EventComponent from "../components/EventComponent";
import Footer from "../components/Footer";

function Events() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[#202163]">Events</h1>
        <p className="mt-4 text-[#4B4B67]">
          Explore upcoming events, view full posters, and open each listing to see more details.
        </p>
        <EventComponent />
      </main>
      <Footer />
    </div>
  );
}

export default Events;
