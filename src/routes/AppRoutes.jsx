import Home from "../pages/Home";
import About from "../pages/About";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useContext } from "react";
import Login from "../pages/Login";
import Footer from "../components/Footer";
import { Theme } from "../context/ThemeContext";

import Concact from "../pages/Contact";
import Classess from "../pages/Classess";
import Cart from "../pages/Cart";
import Resgister from "../pages/Resgister";
import { AnimatePresence } from "framer-motion";
import Profile from "../pages/Profile";
function AppRoutes() {


  const location = useLocation();
  const hideFooter = location.pathname === "/login" || location.pathname==="/register";
  const {darkMode, handleDarkMode} =useContext(Theme)
  return (
    <AnimatePresence>
      <NavBar darkMode={darkMode} handClick={handleDarkMode} />

      <main className="mt-25">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Concact/>}/>
           <Route path="/classes" element={<Classess/>}/>
           <Route path="/Cart" element={<Cart/>}/>
           <Route path="/register" element={<Resgister/>}/>
           <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </main>

      {!hideFooter && (
        <footer>
          <Footer darkMode={darkMode} />
        </footer>
      )}
    </AnimatePresence>
  );
}

export default AppRoutes;

