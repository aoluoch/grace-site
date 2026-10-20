import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import EventDetail from "./components/EventDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Connect from "./pages/Connect";
import Sermons from "./pages/Sermons";
import Roadmap from "./pages/Roadmap";
import Care from "./pages/Care";
import Giving from "./pages/Giving";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:eventId" element={<EventDetail />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/sermons" element={<Sermons />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/care" element={<Care />} />
      <Route path="/giving" element={<Giving />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <Admin />
          </ProtectedRoute>
        }
      />
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
