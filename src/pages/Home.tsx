import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Values from "../components/Values";
import Roadmap from "../components/Roadmap";
import Membership from "../components/Membership";
import Believer from "../components/Believer";
import Declaration from "../components/Declaration";
import Separator from "../components/Separator";
import Care from "../components/Care";
import Payment from "../components/Payment";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const sectionId = decodeURIComponent(location.hash.replace("#", ""));
    let cancelled = false;
    const timers: number[] = [];

    const getNavbarOffset = () => {
      const nav = document.querySelector(
        '[data-site-navbar="true"]',
      ) as HTMLElement | null;
      return (nav?.offsetHeight ?? 64) + 8;
    };

    const getTargetTop = (el: HTMLElement) =>
      Math.max(
        el.getBoundingClientRect().top + window.scrollY - getNavbarOffset(),
        0,
      );

    const scrollToHashTarget = (retriesLeft = 30) => {
      if (cancelled) return;

      const target = document.getElementById(sectionId);

      if (!target) {
        if (retriesLeft > 0) {
          timers.push(
            window.setTimeout(() => scrollToHashTarget(retriesLeft - 1), 100),
          );
        }
        return;
      }

      window.scrollTo({ top: getTargetTop(target), behavior: "smooth" });

      // Re-check position after async content (Contentful images, rich text)
      // has had time to load and cause layout shifts.
      const correctionDelays = [400, 900, 1500];
      for (const delay of correctionDelays) {
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            const el = document.getElementById(sectionId);
            if (!el) return;
            const expected = getTargetTop(el);
            if (Math.abs(window.scrollY - expected) > 4) {
              window.scrollTo({ top: expected, behavior: "smooth" });
            }
          }, delay),
        );
      }
    };

    const rafId = requestAnimationFrame(() => scrollToHashTarget());

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
    };
    // Use full `location` object so the effect fires on every navigation,
    // even if the hash string is identical to a previous visit.
  }, [location]);

  return (
    <main>
      <Hero />
      <Separator />
      <Values />
      <Separator />
      <Roadmap />
      <Separator />
      <Declaration />
      <Separator />
      <Care />
      <Separator />
      <Membership />
      <Separator />
      <Believer />
      <Separator />
      <Payment />
      <Separator />
      <Contact />
      <Footer />
    </main>
  );
}

export default Home;
