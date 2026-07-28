import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutaccount } from "../feature/authSlice";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../feature/profileApi";
import { FaCamera, FaKey } from "react-icons/fa"; // Thêm icon chìa khóa
import { useDispatch } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [updateProfile, { error }] = useUpdateProfileMutation();
  const { data: profileData, isLoading } = useGetProfileQuery(storedUser?.id);

  const [edit, setEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: storedUser?.fullName || "",
    phone: storedUser?.phone || "",
    gender: storedUser?.gender || "",
    avatar: storedUser?.avatar || "",
  });

  // Đồng bộ form khi profileData tải xong từ API
  useEffect(() => {
    if (profileData?.user) {
      setForm({
        fullName: profileData.user.fullName || "",
        phone: profileData.user.phone || "",
        gender: profileData.user.gender || "",
        avatar: profileData.user.avatar || "",
      });
    }
  }, [profileData]);

  const handLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutaccount());
    nav("/login");
  };

  const handChange = (e) => {
    const { name, value, files, type } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleEditToggle = async () => {
    if (edit) {
      try {
        const formData = new FormData();
        formData.append("fullName", form.fullName);
        formData.append("phone", form.phone);
        formData.append("gender", form.gender);

        if (form.avatar) {
          formData.append("avatar", form.avatar);
        }

        setIsSaving(true);
        const res = await updateProfile(formData).unwrap();

        localStorage.setItem("user", JSON.stringify(res?.user));
        setForm({
          fullName: res?.user?.fullName || "",
          phone: res?.user?.phone || "",
          gender: res?.user?.gender || "",
          avatar: res?.user?.avatar || "",
        });
        setEdit(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(false);
      }
    } else {
      setEdit(true);
    }
  };

  const handleCancel = () => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || storedUser;
    setForm({
      fullName: currentUser?.fullName || "",
      phone: currentUser?.phone || "",
      gender: currentUser?.gender || "",
      avatar: currentUser?.avatar || "",
    });
    setEdit(false);
  };

  const inputClass = `w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
      : "border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
  }`;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <div className="h-32 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500" />

        <div className="px-6 pb-6 sm:px-8">
          <div className="flex flex-col items-center -mt-16">
            <div className="relative">
              <img
                src={
                  form.avatar instanceof File
                    ? URL.createObjectURL(form.avatar)
                    : form.avatar
                    ? `http://127.0.0.1:3001/uploads/${form.avatar}`
                    : "https://via.placeholder.com/150"
                }
                alt="avatar"
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
              />

              {edit && (
                <>
                  <label
                    htmlFor="avatar"
                    className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-teal-500 text-white shadow-lg transition hover:bg-teal-600"
                  >
                    <FaCamera size={18} />
                  </label>

                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handChange}
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full name
              </label>
              {edit ? (
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handChange}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              ) : (
                <p className="text-sm font-medium text-gray-800">
                  {form?.fullName || "—"}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="text-sm font-medium text-gray-800">
                {storedUser?.email || "—"}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Gender
              </label>
              {edit ? (
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handChange}
                  className={inputClass}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <p className="text-sm font-medium capitalize text-gray-800">
                  {form?.gender || "—"}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone
              </label>
              {edit ? (
                <div className="space-y-2">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handChange}
                    placeholder="Enter your phone number"
                    className={inputClass}
                  />
                  {error && (
                    <p className="text-sm text-red-500">
                      {error?.data?.message || "Unable to update profile"}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm font-medium text-gray-800">
                  {form?.phone || "—"}
                </p>
              )}
            </div>
          </div>

          {/* NHÓM NÚT BẤM */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {edit ? (
              <>
                <button
                  className="flex-1 rounded-xl bg-teal-500 py-2.5 font-medium text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-teal-300"
                  onClick={handleEditToggle}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
                <button
                  className="flex-1 rounded-xl border border-gray-300 bg-white py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex-1 rounded-xl bg-teal-500 py-2.5 font-medium text-white transition hover:bg-teal-600"
                  onClick={handleEditToggle}
                >
                  Edit profile
                </button>

                {/* Nút Change Password được thêm ở đây */}
                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
                  onClick={() => nav("/change-password")}
                >
                  <FaKey size={14} className="text-gray-500" />
                  Change password
                </button>

                <button
                  className="flex-1 rounded-xl bg-red-500 py-2.5 font-medium text-white transition hover:bg-red-600"
                  onClick={handLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;