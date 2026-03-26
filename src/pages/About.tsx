import { useEffect } from "react";
import Footer from "../components/Footer";
import Visionary from "../components/Visionary";

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#efefef]">
      <main className="flex-1">
        <Visionary />
      </main>
      <Footer />
    </div>
  );
}

export default About;
