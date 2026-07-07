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

import Profile from "../pages/Profile";
import ClassesDetail from "../pages/ClassesDetail";
import Trainers from "../pages/Trainers";
import Testimonials from "../pages/Testimonials";
import TrainersDetail from "../pages/TrainersDetail";
import Admin from "../pages/admin/Admin";

function AppRoutes() {
  const location = useLocation();
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/register";
  const { darkMode, handleDarkMode } = useContext(Theme);
  return (
    <>
      <NavBar darkMode={darkMode} handClick={handleDarkMode} />

      <main className="mt-25">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Concact />} />
          <Route path="/classes" element={<Classess />} />
          <Route path="/classes/:id" element={<ClassesDetail />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/register" element={<Resgister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:id" element={<TrainersDetail />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </main>

      {!hideFooter && (
        <footer>
          <Footer darkMode={darkMode} />
        </footer>
      )}
    </>
  );
}

export default AppRoutes;

///cách cũ của react router
