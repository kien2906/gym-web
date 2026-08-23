import { Search, Moon, Sun, LogOut, User, History } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useGetProfileQuery } from "../feature/profileApi";
import { useEffect } from "react";
import { useGetCartQuery } from "../feature/cartSlice";
const NavBar = ({ darkMode, handClick }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const nav = useNavigate();

  const { data: profile } = useGetProfileQuery(user?.id);
  const {data}=useGetCartQuery()
  const cartItemCount = data?.cart?.items?.length;
  console.log(profile?.user?.avatar);
  useEffect(() => {
    console.log("Navbar profile:", profile);
  }, [profile]);
  // Prowess Lift

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login");
  };
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
                to="/trainers"
                className={
                  location.pathname === "/trainers"
                    ? "text-teal-400"
                    : "hover:text-teal-400 text-gray-500"
                }
              >
                Trainers
              </Link>
            </li>

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

            {token && profile?.user?.role === "user" ? (
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
                      {cartItemCount || 0}
                    </div>
                  </div>
                </Link>
              </li>
            ) : (
              ""
            )}

            <button onClick={handClick}>{darkMode ? <Moon /> : <Sun />}</button>

            <li className="relative group">
              {!token ? (
                <Link
                  to="/login"
                  className={`hover:text-teal-400 ${
                    location.pathname === "/login"
                      ? "text-teal-500"
                      : "text-gray-500"
                  }`}
                >
                  Login
                </Link>
              ) : (
                <>
                  <button className="flex items-center focus:outline-none">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-teal-400 hover:scale-105 transition duration-200">
                      <img
                        src={
                          user?.avatar
                            ? `http://localhost:3001/uploads/${user?.avatar}`
                            : "https://via.placeholder.com/150"
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>

                  <div
                    className={`absolute  mt-3 w-52 rounded-xl shadow-lg py-2 border z-50 opacity-0
                        invisible group-hover:visible   transition-all duration-200 group-hover:opacity-100
                        ${
                          darkMode
                            ? "bg-black border-gray-800 text-white"
                            : "bg-white border-gray-100 text-black"
                        }`}
                  >
                    {/* Mục 1: Thông tin cá nhân */}
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-teal-500/10 hover:text-teal-400 transition"
                    >
                      <FaUserCircle className="text-lg" />
                      Thông tin cá nhân
                    </Link>

                    {/* Mục 2: Lịch sử giao dịch */}
                    <Link
                      to="/transactions"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-teal-500/10 hover:text-teal-400 transition"
                    >
                      <History size={18} />
                      Lịch sử giao dịch
                    </Link>

                    {/* Mục 3: Đăng xuất */}
                    <div className="border-t border-gray-200 dark:border-gray-800 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition text-left"
                      >
                        <LogOut size={18} />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
