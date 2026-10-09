import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutaccount } from "../../feature/authSlice";
import { useGetUsersQuery } from "../../feature/UserApi";
import { useGetClassQuery } from "../../feature/classApi";
import { useGetAllPaymentsQuery } from "../../feature/paymentApi";

import {
  FiGrid,
  FiUsers,
  FiAward,
  FiBookOpen,
  FiCreditCard,
  FiLogOut,
} from "react-icons/fi";

export function Dashboard() {
  const { data: usersData } = useGetUsersQuery();
  const { data: classesData } = useGetClassQuery();
  const { data: paymentsData } = useGetAllPaymentsQuery();

  const users = usersData?.user ?? [];
  const classes = classesData?.classes ?? [];
  const payments = paymentsData?.payment ?? [];
  const openClasses = classes.filter((item) => item.status === "open").length;
  const closedClasses = classes.filter(
    (item) => item.status === "closed",
  ).length;
  const successfulPayments = payments.filter(
    (item) => item.status === "success",
  ).length;
  const pendingPayments = payments.filter(
    (item) => item.status === "pending",
  ).length;
  const failedPayments = payments.filter(
    (item) => item.status === "failed",
  ).length;
  const maxClassCount = Math.max(openClasses, closedClasses, 1);
  const maxPaymentCount = Math.max(
    successfulPayments,
    pendingPayments,
    failedPayments,
    1,
  );

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
          <p className="mt-4 text-4xl font-bold text-slate-900">
            {users.length}
          </p>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800">Lớp học</h2>
          <p className="mt-4 text-4xl font-bold text-slate-900">
            {classes.length}
          </p>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800">Thanh toán</h2>
          <p className="mt-4 text-4xl font-bold text-slate-900">
            {payments.length}
          </p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-2">
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Tình trạng lớp học
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Phân bố lớp đang mở và đã đóng
              </p>
            </div>
            <FiBookOpen className="text-teal-500" />
          </div>
          <div className="mt-8 space-y-5">
            {[
              { label: "Đang mở", count: openClasses, color: "bg-teal-500" },
              { label: "Đã đóng", count: closedClasses, color: "bg-rose-400" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm font-semibold text-slate-600">
                  <span>{item.label}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${(item.count / maxClassCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Trạng thái thanh toán
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tổng quan các giao dịch
              </p>
            </div>
            <FiCreditCard className="text-teal-500" />
          </div>
          <div className="mt-8 flex h-44 items-end justify-around gap-6 border-b border-slate-100 px-4">
            {[
              {
                label: "Thành công",
                count: successfulPayments,
                color: "bg-teal-500",
              },
              {
                label: "Đang chờ",
                count: pendingPayments,
                color: "bg-amber-400",
              },
              {
                label: "Thất bại",
                count: failedPayments,
                color: "bg-rose-400",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-sm font-bold text-slate-700">
                  {item.count}
                </span>
                <div
                  className={`w-full max-w-48 rounded-t-xl ${item.color} transition-all duration-500`}
                  style={{
                    height: `${Math.max((item.count / maxPaymentCount) * 115, item.count ? 12 : 10)}px`,
                  }}
                />
                <span className="text-center text-xs font-medium text-slate-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>
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
      <aside className="w-64 bg-white rounded-tr-3xl  rounded-br-3xl flex flex-col ">
        <div className="p-6 text-center font-bold text-2xl border-b border-slate-200 ">
          Admin
        </div>

        <nav className="px-3 py-4 space-y-2 flex-1  ">
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

        <div className="p-3 border-t border-slate-200 ">
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
