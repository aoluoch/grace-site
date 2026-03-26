export type EventDetail = {
  id: string;
  title: string;
  date: string;
  venue: string;
  posterUrl: string;
  summary: string;
  description: string;
};

export const eventDetails: EventDetail[] = [
  {
    id: "revival-night-2026",
    title: "Revival Night 2026",
    date: "Friday, April 10, 2026 • 6:00 PM",
    venue: "Grace Arena Main Sanctuary",
    posterUrl:
      "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1200&q=80",
    summary:
      "An evening of worship, prayer, and prophetic declaration focused on spiritual renewal for families and communities.",
    description:
      "Join us for an impactful night of deep worship, Bible teaching, and ministry moments. We will gather as one church to pray for breakthrough, healing, and restoration. Come expectant and invite a friend.",
  },
  {
    id: "youth-fire-conference",
    title: "Youth Fire Conference",
    date: "Saturday, May 2, 2026 • 9:00 AM",
    venue: "Grace Arena Youth Dome",
    posterUrl:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A high-energy youth gathering with inspiring speakers, practical sessions, and worship experiences for next-generation leaders.",
    description:
      "Youth Fire Conference equips young people to grow in faith, purpose, and leadership. Sessions include identity in Christ, relationships, and kingdom impact. Lunch and breakout sessions are included.",
  },
  {
    id: "kingdom-leaders-breakfast",
    title: "Kingdom Leaders Breakfast",
    date: "Wednesday, May 20, 2026 • 7:30 AM",
    venue: "Grace Arena Fellowship Hall",
    posterUrl:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A networking and mentorship breakfast designed for professionals, entrepreneurs, and ministry leaders.",
    description:
      "This breakfast creates space for meaningful connection, mentoring, and biblical leadership insights. We will discuss faith at work, stewardship, and strategic growth for impact in every sphere.",
  },
];
