import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import EventDetail from "./components/EventDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:eventId" element={<EventDetail />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route
        path="*"
        element={
          <h1 className="text-2xl font-semibold text-[#202163]">
            Page not found
          </h1>
        }
      />
    </Routes>
  );
}

export default App;
