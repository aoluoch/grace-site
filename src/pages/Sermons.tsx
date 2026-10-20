import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { listSermons } from "../lib/api";
import type { Models } from "appwrite";
import { PlayCircle, Headphones, Video } from "lucide-react";

interface Sermon extends Models.Row {
  title: string;
  speaker?: string;
  description?: string;
  videoUrl?: string;
  audioUrl?: string;
  topic?: string;
  date?: string;
}

function Sermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let active = true;
    listSermons()
      .then((res) => {
        if (active) setSermons(res.rows as unknown as Sermon[]);
      })
      .catch(() => {
        if (active) setSermons([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#efefef]">
      <header className="bg-[#1f2167] py-10 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Sermons &amp; Media
          </h1>
          <p className="mt-2 max-w-2xl text-[1.05rem] text-[#c6c8e8]">
            Video sermons, audio teachings and testimony stories from Grace
            Arena and Apostle David Owusu.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-56 animate-pulse rounded-xl bg-white/70"
              />
            ))}
          </div>
        ) : sermons.length === 0 ? (
          <div className="rounded-xl border border-[#dcdcdc] bg-white p-10 text-center">
            <PlayCircle className="mx-auto h-12 w-12 text-[#B38E34]" />
            <h2 className="mt-4 text-xl font-semibold text-[#202163]">
              Sermons coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#676767]">
              Our media library is being prepared. Check back soon for video
              sermons and audio teachings.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((s) => (
              <article
                key={s.$id}
                className="flex flex-col overflow-hidden rounded-xl border border-[#dcdcdc] bg-white shadow-sm"
              >
                <div className="p-6">
                  {s.topic && (
                    <span className="inline-block rounded-full bg-[#202163]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#202163]">
                      {s.topic}
                    </span>
                  )}
                  <h2 className="mt-3 text-lg font-semibold text-[#202163]">
                    {s.title}
                  </h2>
                  {s.speaker && (
                    <p className="mt-1 text-sm text-[#676767]">{s.speaker}</p>
                  )}
                  {s.description && (
                    <p className="mt-3 line-clamp-3 text-sm text-[#212121]">
                      {s.description}
                    </p>
                  )}
                </div>
                <div className="mt-auto flex gap-3 border-t border-[#eee] p-4">
                  {s.videoUrl && (
                    <a
                      href={s.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#202163] hover:text-[#B38E34]"
                    >
                      <Video className="h-4 w-4" /> Watch
                    </a>
                  )}
                  {s.audioUrl && (
                    <a
                      href={s.audioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#202163] hover:text-[#B38E34]"
                    >
                      <Headphones className="h-4 w-4" /> Listen
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Sermons;
