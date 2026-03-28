import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Values from '../components/Values';
import Roadmap from '../components/Roadmap';
import Membership from '../components/Membership';
import Believer from '../components/Believer';
import Declaration from '../components/Declaration';
import Separator from '../components/Separator';
import Care from '../components/Care';
import Payment from '../components/Payment';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const NAVBAR_OFFSET = 80;

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    let attempts = 0;
    let timeoutId: number | undefined;

    const scrollToHashTarget = () => {
      attempts += 1;

      const sectionId = decodeURIComponent(location.hash.replace('#', ''));
      const target = document.getElementById(sectionId);

      if (!target) {
        if (attempts < 12) {
          timeoutId = window.setTimeout(scrollToHashTarget, 120);
        }
        return;
      }

      const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    };

    window.requestAnimationFrame(scrollToHashTarget);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [location.hash]);

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