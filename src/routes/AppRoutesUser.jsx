import Home from "../pages/Home";
import About from "../pages/About";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import PaymentSuccess from "../pages/PaymentSuccess";
import Transactions from "../pages/Traction";
import ChangePassword from "../pages/ChangePassword";

function UserRouter() {
  const location = useLocation();
  const nav = useNavigate();
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/register";
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const isPageAdmin = location.pathname.startsWith("/admin");
  const { darkMode, handleDarkMode } = useContext(Theme);
  return (
    <>
      {!isPageAdmin && (
        <NavBar darkMode={darkMode} handClick={handleDarkMode} />
      )}

      <main className={"mt-25"}>
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
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:id" element={<TrainersDetail />} />
          <Route path="/transactions" element={<Transactions/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/payment" element={<PaymentSuccess />} />
        </Routes>
      </main>

      {!hideFooter && !isPageAdmin && (
        <footer>
          <Footer darkMode={darkMode} />
        </footer>
      )}
    </>
  );
}

export default UserRouter;

///cách cũ của react router
