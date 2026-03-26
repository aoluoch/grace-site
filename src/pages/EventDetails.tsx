import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { eventDetails } from "../components/EventDetail";

function EventDetails() {
  const { eventId } = useParams();
  const event = eventDetails.find((item) => item.id === eventId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#202163]">Event not found</h1>
            <p className="mt-3 text-[#4B4B67]">The event you selected does not exist.</p>
            <Link
              to="/events"
              className="mt-6 inline-flex rounded-md bg-[#B38E34] px-4 py-2 text-sm font-medium text-white hover:bg-[#202163]"
            >
              Back to Events
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Link to="/events" className="text-sm font-medium text-[#B38E34] hover:text-[#202163]">
          ← Back to Events
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <div className="aspect-3/4 rounded-lg bg-[#ECECF3] p-3">
            <img
              src={event.posterUrl}
              alt={`${event.title} poster`}
              className="h-full w-full rounded-md object-contain"
            />
          </div>

          <article className="rounded-lg border border-[#202163]/20 bg-[#F8F8FB] p-6 shadow-sm">
            <h1 className="text-3xl font-bold text-[#202163]">{event.title}</h1>
            <p className="mt-3 text-[#4B4B67]">{event.venue}</p>
            <p className="mt-6 text-base leading-relaxed text-[#2E2E40]">{event.description}</p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EventDetails;
