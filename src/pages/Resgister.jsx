import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import InputCommon from "../components/InputCommon";
function Resgister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const handSubmit = async (e) => {
    e.preventDefault();

    const newError = {};

    if (!form.name) {
      newError.name = "Name cannot be empty";
    }

    if (!form.email) {
      newError.email = "Email cannot be empty";
    }

    if (!form.gender) {
      newError.gender = "Gender cannot be empty";
    }

    if (!form.password) {
      newError.password = "Password cannot be empty";
    }
    if (!form.confirmPassword) {
      newError.confirmPassword = "Cofirm cannot be empty";
    }
    if (
      form.confirmPassword &&
      form.password &&
      form.confirmPassword !== form.password
    ) {
      newError.confirmPassword = "Incorrect password confirmation";
    }

    setTimeout(() => {
      setError({});
    }, 5000);
    setError(newError);

    try {
      const res = await authApi.register({
        name: form.name,
        email: form.email,
        gender: form.gender,
        password: form.password,
      });
      console.log(res.data);

      if (res.status === 201) {
        navigate("/login");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handChagne = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-[#f8f9fa] px-4 py-10  page">
      <div className="bg-white rounded-lg shadow-lg grid md:grid-cols-2 w-full max-w-5xl overflow-hidden">
        {/* Form */}
        <div className="p-10 flex flex-col justify-center gap-5">
          <h2 className="text-3xl font-bold">Create Account</h2>

          <p className="text-[#7e7d7d]">
            Join Prowess Lift and start your fitness journey.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handSubmit}>
            <InputCommon
              props={{
                type: "text",
                placeholder: "Username",
                name: form.name,
                handChange: handChagne,
                classname:
                  "rounded-md p-4 outline-none border border-slate-200",
              }}
            />

            <span className="text-red-500 text-sm page">
              {error && error.name}
            </span>

            <InputCommon
              props={{
                type: "email",
                placeholder: "Email",
                name: form.email,
                handChange: handChagne,
                classname:
                  "rounded-md p-4 outline-none border border-slate-200",
              }}
            />
            <span className="text-red-500 text-sm">{error && error.email}</span>
            <select
              name="gender"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
              className="rounded-md p-4 outline-none border border-slate-200 text-gray-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <span className="text-red-500 text-sm">
              {error && error.gender}
            </span>

            <div className="relative">
              <InputCommon
                props={{
                  type: "email",
                  placeholder: "Password",
                  name: form.password,
                  handChange: handChagne,
                  classname:
                    "rounded-md p-4 outline-none border border-slate-200 w-full",
                }}
              />
              <span className="text-red-500 text-sm">
                {error && error.password}
              </span>
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
              ></button>
            </div>

            <div className="relative">
              <InputCommon
                props={{
                  placeholder: "Confirm Password",
                  name: form.confirmPassword,
                  handChange: handChagne,
                  classname:
                    "rounded-md p-4 outline-none border border-slate-200 w-full",
                }}
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
              ></button>
            </div>

            <span className="text-red-500 text-sm">
              {error && error.confirmPassword}
            </span>

            <button className="bg-teal-400 hover:bg-teal-600 text-white py-3 rounded-md font-bold transition cursor-pointer">
              Create Account
            </button>
          </form>

          <p className="text-sm text-[#7e7d7d]">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-400 font-bold">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#011627] to-[#0b2a3a] p-8">
          <div className="text-center text-white px-6">
            <h3 className="text-2xl font-bold mb-3">Prowess Lift</h3>

            <p className="text-[#cfd7df] max-w-[300px] mx-auto">
              Create your account to access workout plans, track your progress,
              and become the best version of yourself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resgister;
