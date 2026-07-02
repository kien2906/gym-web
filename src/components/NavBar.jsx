import { Search, Moon, Sun } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Cartproduct } from "../context/CartContext";
import { FaSignInAlt } from "react-icons/fa";
const NavBar = ({ darkMode, handClick }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const navgitive = useNavigate();
  const { addCart } = useContext(Cartproduct);
  const handLogout = () => {
    localStorage.clear();

    navgitive("/login");
  };
  //Prowess Lift
  return (
    <div>
      <div
        className={`fixed top-0 z-50 w-full flex justify-between items-center navbar py-10 px-50
        ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <h1 className="font-bold cursor-pointer">
          <Link to="/">Prowess Lift</Link>
        </h1>
        <nav>
          <ul className="flex items-center gap-10 font-bold cursor-auto">
            <li>
              <Link
                to="/"
                className={
                  location.pathname === "/"
                    ? "text-teal-400"
                    : "text-gray-500 hover:text-teal-400"
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={
                  location.pathname === "/about"
                    ? "text-teal-400"
                    : "text-gray-500 hover:text-teal-400"
                }
              >
                About
              </Link>
            </li>

            <Link
              to="/classes"
              className={
                location.pathname === "/classes"
                  ? "text-teal-400"
                  : "text-gray-500 hover:text-teal-400"
              }
            >
              Classes
            </Link>

            <li>
              <Link
                to="/contact"
                className={
                  location.pathname === "/contact"
                    ? "text-teal-400"
                    : "hover:text-teal-400 text-gray-500"
                }
              >
                Contact
              </Link>
            </li>

            {token && (
              <li>
                <Link
                  to="/Cart"
                  className={
                    location.pathname === "/Cart"
                      ? "text-teal-400"
                      : "text-gray-400 hover:text-teal-400"
                  }
                >
                  <div className="relative">
                    <FaShoppingCart className="text-xl" />

                    <div className="absolute bottom-5 left-7 flex h-6 w-6 items-center justify-center rounded-full bg-teal-400 text-sm text-white">
                      {addCart?.length || 0}
                    </div>
                  </div>
                </Link>
              </li>
            )}

            <li>
              <Search />
            </li>

            <button onClick={handClick}>{darkMode ? <Moon /> : <Sun />}</button>

            <li>
              {!token ? (
                <Link
                  to="/login"
                  className={`text-gray-500 hover:text-teal-400 ${location.pathname === "/login" ? "text-teal-500" : "text-gray-500 hover:text-teal-500"}`}
                >
                  Login
                </Link>
              ) : (
                <Link to="/profile"
             
                >
                  <li>
                    <div className="flex items-center gap-3 " >
                      <FaUserCircle className={`text-3xl text-gray-600 cursor-pointertransition   ${location.pathname==="/profile" ?"text-teal-500 " : "hover:text-teal-400"} `} />
                    </div>
                  </li>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
