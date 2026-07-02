import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const nav = useNavigate();
  const handLogout = () => {
    localStorage.clear();

    nav("/login");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="h-32 bg-gradient-to-r from-teal-500 to-blue-500"></div>

        {/* Avatar */}
        <div className="flex flex-col items-center -mt-16">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
          />

          <h2 className="text-xl font-bold mt-3">{user?.name}</h2>

          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>

        {/* Info */}
        <div className="p-6 space-y-4 mt-2">
          <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{user?.name}</span>
          </div>

          <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>

          <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-500">Gender</span>
            <span className="font-medium">{user?.gender || "N/A"}</span>
          </div>

          <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-500">Role</span>
            <span className="font-medium">{user?.role}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-6 flex gap-3">
          <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition">
            Edit
          </button>

          <button
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
            onClick={handLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
