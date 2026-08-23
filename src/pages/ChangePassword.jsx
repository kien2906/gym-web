import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../feature/changePassword";

function ChangePassword() {
  const nav = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [change, { isLoading }] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError("Vui lòng điền đầy đủ tất cả các trường.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const changePassword = await change(form).unwrap();
      console.log("API SUCCESS:", changePassword);
      setSuccess(changePassword?.message);

      setForm({
        currentPassword: "",
        confirmPassword: "",
        newPassword: "",
      });
      setShowPassword({
        current: false,
        new: false,
        confirm: false,
      });
    } catch (error) {
      setError(error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 flex items-center justify-center">
      {/* Nới rộng khung từ max-w-md thành max-w-xl và tăng p-8 sm:p-10 */}
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10">
        {/* Nút Quay lại & Tiêu đề */}
        <button
          onClick={() => nav(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition mb-6"
        >
          <FaArrowLeft /> Quay lại trang cá nhân
        </button>

        <div className="mb-8 border-b border-gray-100 pb-5">
          <h1 className="text-2xl font-bold text-gray-900">Đổi mật khẩu</h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Cập nhật mật khẩu định kỳ để bảo vệ tài khoản của bạn.
          </p>
        </div>

        {/* Thông báo Alert */}
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <FaExclamationCircle className="shrink-0 text-base" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <FaCheckCircle className="shrink-0 text-base" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mật khẩu hiện tại */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu hiện tại"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((pre) => ({
                    ...pre,
                    current: !pre.current,
                  }))
                }
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword.current ? (
                  <FaEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Mật khẩu mới */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((pre) => ({
                    ...pre,
                    new: !pre.new,
                  }))
                }
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword.new ? (
                  <FaEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-gray-400">
              Mật khẩu phải chứa ít nhất 6 ký tự.
            </p>
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu mới"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((pre) => ({
                    ...pre,
                    confirm: !pre.confirm,
                  }))
                }
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword.confirm ? (
                  <FaEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Nhóm Button */}
          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={() => nav(-1)}
              className="flex-1 rounded-xl border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-xl bg-teal-600 py-3 text-sm font-medium text-white transition hover:bg-teal-700 disabled:bg-teal-300"
            >
              {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
