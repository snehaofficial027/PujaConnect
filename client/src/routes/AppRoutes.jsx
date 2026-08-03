import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Pujas from "../pages/Pujas";
import Pandits from "../pages/Pandits";
import Contact from "../pages/Contact";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pujas" element={<Pujas />} />
        <Route path="/pandits" element={<Pandits />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;