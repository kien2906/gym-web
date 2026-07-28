import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutaccount } from "../../feature/authSlice";

import {
  FiGrid,
  FiUsers,
  FiAward,
  FiBookOpen,
  FiCreditCard,
  FiLogOut,
} from "react-icons/fi";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-2 text-slate-600">
              Chào mừng quản trị viên đến với trang quản trị.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Tổng tài khoản
          </h2>
          <p className="mt-4 text-4xl font-bold text-slate-900">--</p>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800">Lớp học</h2>
          <p className="mt-4 text-4xl font-bold text-slate-900">--</p>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800">Thanh toán</h2>
          <p className="mt-4 text-4xl font-bold text-slate-900">--</p>
        </div>
      </div>
    </div>
  );
}

function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role?.toString().toLowerCase() !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logoutaccount());
    navigate("/login");
  };

  const sidebarMenus = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: <FiGrid />,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: <FiUsers />,
    },
    {
      label: "Trainers",
      path: "/admin/trainers",
      icon: <FiAward />,
    },
    {
      label: "Classes",
      path: "/admin/classes",
      icon: <FiBookOpen />,
    },
    {
      label: "Payments",
      path: "/admin/payments",
      icon: <FiCreditCard />,
    },
  ];
  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 text-center font-bold text-2xl border-b border-slate-200">
          Admin
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2">
          {sidebarMenus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === "/admin"}
              className={({ isActive }) => {
                return `flex items-center gap-3 p-3 rounded-xl transition ${
                  isActive
                    ? "bg-teal-500 text-white"
                    : "hover:bg-slate-100 text-slate-700"
                }`;
              }}
            >
              {menu.icon}
              {menu.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-xl text-red-500 hover:bg-red-50"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
export default AdminLayout;
