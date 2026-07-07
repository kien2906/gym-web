import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutaccount } from "../../feature/authSlice";
function Admin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutaccount());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-8 text-white">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-sm opacity-80">
            Welcome back, {user?.name || "Admin"}. Here you can manage users and
            view system info.
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 p-6 bg-slate-50">
              <h2 className="text-xl font-semibold mb-2">Admin Info</h2>
              <p className="text-gray-600">Name: {user?.name}</p>
              <p className="text-gray-600">Email: {user?.email}</p>
              <p className="text-gray-600">Role: {user?.role}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 bg-slate-50">
              <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
              <ul className="space-y-2 text-gray-700">
                <li>- View user accounts</li>
                <li>- Manage classes</li>
                <li>- Review orders and messages</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 p-6 bg-slate-50">
            <h2 className="text-xl font-semibold mb-4">Dashboard Summary</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-3xl font-bold">8</p>
                <p className="text-sm text-gray-500">Active Trainers</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-3xl font-bold">24</p>
                <p className="text-sm text-gray-500">Classes Available</p>
              </div>
            </div>
          </div>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
