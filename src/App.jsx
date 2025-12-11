import "./App.css";
import React from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Landing from "./pages/Landing";
import FallBackPage from "./pages/404Page";
import CardView from "./components/ClinicCard/Components/CardView";
import FindImmunisationServices from "./pages/FindImmunisationServices";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdvanceFilterProvider } from "./lib/Context/AdvanceFilterContext";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/findImmunisationServices"
          element={<FindImmunisationServices />}
        />
        <Route path="/clinic-LocationView/:clinicID" element={<CardView />} />
        <Route path="*" element={<FallBackPage />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AdvanceFilterProvider>
        <App />
      </AdvanceFilterProvider>
    </Router>
  );
}
