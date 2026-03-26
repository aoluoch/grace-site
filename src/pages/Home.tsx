import { useEffect } from 'react';
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

function Home() {
  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    const sectionId = window.location.hash.replace('#', '');
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    // Delay ensures section is laid out before smooth scrolling.
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

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