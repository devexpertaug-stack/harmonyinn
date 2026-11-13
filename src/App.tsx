import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Rooms from "@/pages/Rooms";
import "@/styles/globals.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          {/* Add other routes as they're created */}
          <Route path="/dining" element={<div className="pt-24 min-h-screen">Dining Page Coming Soon</div>} />
          <Route path="/events" element={<div className="pt-24 min-h-screen">Events Page Coming Soon</div>} />
          <Route path="/gallery" element={<div className="pt-24 min-h-screen">Gallery Page Coming Soon</div>} />
          <Route path="/about" element={<div className="pt-24 min-h-screen">About Page Coming Soon</div>} />
          <Route path="/contact" element={<div className="pt-24 min-h-screen">Contact Page Coming Soon</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
