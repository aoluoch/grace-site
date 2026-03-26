import { Link } from "react-router-dom";
import { eventDetails } from "./EventDetail";

function EventComponent() {
  return (
    <section className="w-full py-8 sm:py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {eventDetails.map((event) => (
          <article
            key={event.id}
            className="flex h-full flex-col overflow-hidden rounded-lg border border-[#202163]/20 bg-[#F8F8FB] shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-3/4 bg-[#ECECF3] p-3">
              <img
                src={event.posterUrl}
                alt={`${event.title} poster`}
                className="h-full w-full rounded-md object-contain"
                loading="lazy"
              />
            </div>

            <div className="flex h-full flex-col gap-3 p-5">
              <h2 className="text-xl font-semibold text-[#202163]">{event.title}</h2>
              <p className="text-sm text-[#4B4B67]">{event.venue}</p>
              <p className="text-[0.95rem] leading-relaxed text-[#2E2E40]">{event.summary}</p>

              <Link
                to={`/events/${event.id}`}
                className="mt-auto inline-flex w-fit items-center rounded-md bg-[#B38E34] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#202163]"
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EventComponent;
