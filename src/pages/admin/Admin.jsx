import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutaccount } from "../../feature/authSlice";

// Import icons từ react-icons (nếu chưa cài, bạn chạy: npm install react-icons)
// Hoặc bạn có thể tự thay bằng ký tự text/emoji nếu không muốn dùng thư viện.
import {
  FiUsers,
  FiAward,
  FiBookOpen,
  FiGrid,
  FiLogOut,
  FiUser,
  FiTrash2,
  FiEdit3,
  FiPlus,
} from "react-icons/fi";
import { useGetClassQuery } from "../../feature/classApi";
import { useGetTrainersQuery } from "../../feature/trainersApi";
import { useGetUsersQuery } from "../../feature/UserApi";

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const getClass = useGetClassQuery();
  const getTrainer = useGetTrainersQuery();
  const getUsers=useGetUsersQuery()
  console.log(getUsers?.data?.user)
  // console.table(getTrainer?.data?.trainers);
   const danhsachUsers= getUsers?.data?.user
  const danhsachClass = getClass?.data?.classes;
  // console.log(danhsach.length);

  // 1. Quản lý Tab hiện tại ('overview', 'users', 'trainers', 'classes')
  const [activeTab, setActiveTab] = useState("overview");

  // 2. Dữ liệu mẫu (Dễ dàng thay bằng API hoặc Redux sau này)
  const [usersList, setUsersList] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "vana@gmail.com", role: "user" },
    { id: 2, name: "Trần Thị B", email: "thib@gmail.com", role: "user" },
    { id: 3, name: "Phạm Minh C", email: "minhc@gmail.com", role: "user" },
  ]);

  const [trainersList, setTrainersList] = useState([
    { id: 1, name: "Coach Mike", specialty: "Gym / Fitness", status: "Active" },
    {
      id: 2,
      name: "Coach Sarah",
      specialty: "Yoga / Pilates",
      status: "Active",
    },
  ]);

  // Bảo vệ Route
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutaccount());
    navigate("/login");
  };

  // Các hàm xử lý xóa nhanh
  const handleDeleteUser = (id) =>
    setUsersList(usersList.filter((item) => item.id !== id));
  const handleDeleteTrainer = (id) =>
    setTrainersList(trainersList.filter((item) => item.id !== id));

  // Định nghĩa các Menu ở Sidebar
  const sidebarMenus = [
    {
      id: "overview",
      label: "Tổng quan",
      icon: <FiGrid className="w-5 h-5" />,
    },
    {
      id: "users",
      label: "Quản lý Users",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      id: "trainers",
      label: "Quản lý Trainers",
      icon: <FiAward className="w-5 h-5" />,
    },
    {
      id: "classes",
      label: "Quản lý Classes",
      icon: <FiBookOpen className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-full h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. SIDEBAR BÊN TRÁI */}
      <aside className="w-64  h-screen bg-white border-r border-slate-200 flex flex-col justify-between fixed h-screen z-10">
        <div>
          {/* Logo / Brand */}
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center text-white font-black text-xl shadow-md">
              A
            </div>
            <div>
              <h2 className="font-bold text-slate-800 leading-tight">
                AdminPanel
              </h2>
              <span className="text-xs text-teal-600 font-semibold uppercase tracking-wider">
                Hệ thống Gym
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {sidebarMenus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActiveTab(menu.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === menu.id
                    ? "bg-teal-50 text-teal-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <span
                  className={
                    activeTab === menu.id ? "text-teal-600" : "text-slate-400"
                  }
                >
                  {menu.icon}
                </span>
                {menu.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User Info & Logout ở dưới cùng Sidebar */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <FiUser className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer"
          >
            <FiLogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* 2. KHU VỰC NỘI DUNG CHÍNH (MAIN CONTENT) */}
      {/* Cần ml-64 để đẩy nội dung ra khỏi Sidebar cố định */}
      <main className="flex-1 ml-64 min-h-screen p-8 lg:p-12">
        {/* HEADER TRÊN CÙNG */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {sidebarMenus.find((m) => m.id === activeTab)?.label}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {activeTab === "overview" &&
                "Dưới đây là báo cáo hoạt động nhanh của hệ thống."}
              {activeTab === "users" &&
                "Danh sách tài khoản thành viên trong hệ thống."}
              {activeTab === "trainers" &&
                "Quản lý hồ sơ và trạng thái của huấn luyện viên."}
              {activeTab === "classes" &&
                "Lịch trình và thông tin các lớp học đang mở."}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm text-sm">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="font-medium text-slate-600">
              Hệ thống đang hoạt động
            </span>
          </div>
        </header>

        {/* CHI TIẾT CÁC TAB NỘI DUNG */}

        {/* TAB: TỔNG QUAN */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Thẻ thống kê (Stats Cards) */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-400">
                    Tổng số Users
                  </p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-1">
                    {usersList.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                  <FiUsers className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-400">
                    Trainers hoạt động
                  </p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-1">
                    {trainersList.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <FiAward className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-400">
                    Số lượng lớp học
                  </p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-1">
                    {danhsachClass?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                  <FiBookOpen className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Profile Admin */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Thông tin tài khoản Admin
              </h3>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">
                    Họ và tên
                  </span>
                  <strong className="text-slate-700">{user?.fullName}</strong>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">
                    Email liên hệ
                  </span>
                  <strong className="text-slate-700">{user?.email}</strong>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">
                    Quyền hạn
                  </span>
                  <strong className="text-red-600 uppercase text-xs font-black tracking-widest">
                    {user?.role}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: QUẢN LÝ USERS */}
        {activeTab === "users" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">
                Danh sách tài khoản
              </h3>
              <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-2xl text-sm font-bold transition-all shadow-sm">
                <FiPlus className="w-4 h-4" /> Thêm User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/55 text-xs text-slate-400 uppercase font-semibold">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Họ và tên</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Vai trò</th>
                    <th className="px-6 py-4 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {danhsachUsers.map((u) => (
                    <tr
                      key={u._id}
                      className="hover:bg-slate-50/80 transition-all"
                    >
                      <td className="px-6 py-4 text-slate-400 font-mono">
                        #{u._id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {u.fullName}
                      </td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-bold uppercase">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center justify-center gap-3">
                        <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: QUẢN LÝ TRAINERS */}
        {activeTab === "trainers" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">
                Đội ngũ Huấn luyện viên
              </h3>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl text-sm font-bold transition-all shadow-sm">
                <FiPlus className="w-4 h-4" /> Thêm Trainer
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/55 text-xs text-slate-400 uppercase font-semibold">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Họ và tên</th>
                    <th className="px-6 py-4">Chuyên môn</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {getTrainer?.data?.trainers.map((t) => (
                    <tr
                      key={t._id}
                      className="hover:bg-slate-50/80 transition-all"
                    >
                      <td className="px-6 py-4 text-slate-400 font-mono">
                        #{t._id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {t.fullName}
                      </td>
                      <td className="px-6 py-4">{t.specialty}</td>
                      <td className="px-6 py-4">
                        <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-bold uppercase">
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center justify-center gap-3">
                        <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTrainer(t.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: QUẢN LÝ CLASSES */}
        {activeTab === "classes" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">
                Danh sách lớp học
              </h3>
              <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl text-sm font-bold transition-all shadow-sm">
                <FiPlus className="w-4 h-4" /> Thêm Lớp
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/55 text-xs text-slate-400 uppercase font-semibold">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Tên Lớp học</th>
                    <th className="px-6 py-4">Huấn luyện viên</th>
                    <th className="px-6 py-4">Khung giờ</th>
                    <th className="px-6 py-4 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {danhsachClass.map((c) => (
                    <tr
                      key={c._id}
                      className="hover:bg-slate-50/80 transition-all"
                    >
                      <td className="px-6 py-4 text-slate-400 font-mono">
                        #{c._id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {c.fullName}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {c.trainer?.fullName}
                      </td>
                      <td className="px-6 py-4  font-semibold text-slate-800">
                        {c?.schedule.map((s) => (
                          <div key={s._id}>
                            <p>
                              {s.startTime} - {s.endTime}
                            </p>
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 flex items-center justify-center gap-3">
                        <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;
