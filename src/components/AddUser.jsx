import { useEffect, useState } from "react";
import Modal from "./Modal";
import {
  Eye,
  EyeOff,
  ImagePlus,
  LockKeyhole,
  Mail,
  Phone,
  Plus,
  Save,
  ShieldCheck,
  UserRound,
  VenusAndMars,
} from "lucide-react";

const emptyForm = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  gender: "",
  role: "",
  avatar: null,
};

const fieldClass = (hasError) =>
  `w-full rounded-xl border bg-slate-50/70 py-3 pl-11  text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
    hasError
      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
      : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
  }`;

function AddUser({ isOpen, isClose, onSubmit, User = null, mode }) {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = Boolean(User);
  const isRegister = mode === "register";
  const title = isRegister
    ? "Create Account"
    : isEdit
      ? "Edit User"
      : "Add New User";
  const subtitle = isRegister
    ? "Create your account and start your fitness journey."
    : isEdit
      ? "Update this member's account details."
      : "Add a new member to your gym community.";

  const resetForm = () => {
    setForm(emptyForm);
    setImage(null);
    setErrors({});
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    isClose();
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      const file = files?.[0];
      if (!file) return;
      if (file.size === 0) {
        setErrors((previous) => ({
          ...previous,
          avatar: "Avatar image cannot be empty.",
        }));
        event.target.value = "";
        return;
      }
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        setErrors((previous) => ({
          ...previous,
          avatar: "Avatar must be a PNG or JPG image.",
        }));
        event.target.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((previous) => ({
          ...previous,
          avatar: "Avatar image must be 5MB or smaller.",
        }));
        event.target.value = "";
        return;
      }
      setImage(URL.createObjectURL(file));
      setForm((previous) => ({ ...previous, avatar: file }));
      setErrors((previous) => ({ ...previous, avatar: "", submit: "" }));
      return;
    }

    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({
      ...previous,
      [name]: "",
      submit: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};
    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const password = form.password;

    if (!fullName) nextErrors.fullName = "Full name is required.";
    else if (fullName.length < 3)
      nextErrors.fullName = "Full name must be at least 3 characters.";

    if (!email) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email address.";

    if (!isEdit && !password) nextErrors.password = "Password is required.";
    else if (password && password.length < 6)
      nextErrors.password = "Password must be at least 6 characters.";

    if (!phone) nextErrors.phone = "Phone is required.";
    else if (!/^(0|\+84)[35789][0-9]{8}$/.test(phone))
      nextErrors.phone = "Enter a valid Vietnamese phone number.";

    if (!["male", "female", "other"].includes(form.gender))
      nextErrors.gender = "Select a valid gender.";
    if (!["admin", "user"].includes(form.role))
      nextErrors.role = "Select a valid role.";

    if (form.avatar && form.avatar.size > 5 * 1024 * 1024)
      nextErrors.avatar = "Avatar image must be 5MB or smaller.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting || !validate()) return;

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("fullName", form.fullName.trim());
      formData.append("email", form.email.trim().toLowerCase());
      formData.append("phone", form.phone.trim());
      formData.append("gender", form.gender);
      formData.append("role", form.role);
      if (form.password) formData.append("password", form.password);
      if (form.avatar) formData.append("avatar", form.avatar);

      if (isEdit) await onSubmit(formData, User._id);
      else await onSubmit(formData);
      resetForm();
      isClose();
    } catch (error) {
      setErrors((previous) => ({
        ...previous,
        submit:
          error?.data?.message || error?.message || "Unable to save this user.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (User) {
      // Edit data arrives through props, so the controlled form must be synchronized here.
      setForm({
        ...emptyForm,
        fullName: User.fullName || "",
        email: User.email || "",
        phone: User.phone || "",
        gender: User.gender || "",
        role: User.role || "",
      });
      setImage(
        User.avatar ? `http://localhost:3001/uploads/${User.avatar}` : null,
      );
    } else {
      resetForm();
    }
  }, [User, isOpen]);

  if (!isOpen) return null;

  // const inputIcon = (Icon) => (
  //   <Icon className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
  // );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <p className="text-sm text-slate-500">{subtitle}</p>
        <label
          className={`group mb-6 flex cursor-pointer items-center gap-4 rounded-xl border border-dashed bg-slate-50/70 p-4 transition hover:border-teal-400 hover:bg-teal-50/40 ${
            errors.avatar ? "border-rose-400" : "border-slate-300"
          }`}
        >
          {image ? (
            <img
              src={image}
              alt="User avatar preview"
              className="h-16 w-16 rounded-xl object-cover ring-4 ring-white shadow-sm"
            />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm transition group-hover:text-teal-500">
              <ImagePlus className="h-7 w-7" />
            </span>
          )}
          <span>
            <span className="block text-sm font-semibold text-slate-800">
              Upload avatar
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              PNG, JPG or JPEG up to 5MB
            </span>
          </span>
          <input
            type="file"
            name="avatar"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleChange}
            className="sr-only"
          />
        </label>
        {errors.avatar && (
          <p className="mt-2 text-xs text-rose-500">{errors.avatar}</p>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Full Name"
            name="fullName"
            value={form.fullName}
            placeholder="e.g. Alex Morgan"
            onChange={handleChange}
            error={errors.fullName}
            icon={UserRound}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            placeholder="alex@example.com"
            onChange={handleChange}
            error={errors.email}
            icon={Mail}
          />

          <Field
            label="Password"
            name="password"
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            error={errors.password}
            icon={LockKeyhole}
          />

          <Field
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            placeholder="e.g. +1 555 0123"
            onChange={handleChange}
            error={errors.phone}
            icon={Phone}
          />
          <SelectField
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            error={errors.gender}
            icon={VenusAndMars}
            options={["male", "female", "other"]}
          />
          <SelectField
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            error={errors.role}
            icon={ShieldCheck}
            options={["admin", "user"]}
          />
        </div>

        {Object.values(errors).some(Boolean) && (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            <p className="font-semibold">Please check the following fields:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              {Object.values(errors)
                .filter(Boolean)
                .map((message, index) => (
                  <li key={`${message}-${index}`}>{message}</li>
                ))}
            </ul>
          </div>
        )}
        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : isEdit ? (
              <Save className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Add User"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
  icon: Icon,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      {type === "password" ? (
        <div className="relative">
          <Icon className="pointer-events-none  absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
          <input
            id={name}
            name={name}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            className={fieldClass(error)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      ) : (
        <div className="relative">
          <Icon className="pointer-events-none  absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            className={fieldClass(error)}
          />
        </div>
      )}
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  icon: Icon,
  options,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          className={`${fieldClass(error)} appearance-none capitalize`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

export default AddUser;
