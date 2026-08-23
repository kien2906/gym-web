import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import InputCommon from "../components/InputCommon";
import { useLogingooleMutation, useLoginMutation } from "../feature/authSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

// import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { isLoading }] = useLoginMutation();
  const [loginGoogle] = useLogingooleMutation();
  // const { loading, error, message } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [mess, setMess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      email: "",
      password: "",
    };

    if (!form.email.trim()) errors.email = "Email is required";
    if (!form.password.trim()) errors.password = "Password is required";

    setFormError(errors);
    setMess("");

    if (errors.email || errors.password) return;

    try {
      const data = await loginUser(form).unwrap();
      console.log(data);
      console.log(data.message);

      setMess(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data?.user));

      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMess(error?.data?.message);
    }
  };

  const handScusses = async (res) => {
    try {
      const { credential } = res;
      console.log(credential);
      const data = await loginGoogle({
        credential: credential,
      }).unwrap();
      console.log(data?.user?.role);
       localStorage.setItem("token", data?.token);
      localStorage.setItem("user", JSON.stringify(data?.user));

      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMess(error?.data?.message);
    }
  };

  const handChange = (e) => {
    setMess("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center bg-[#f8f9fa] px-4 page">
        <div className="bg-white rounded-lg shadow-lg grid md:grid-cols-2 w-full max-w-4xl overflow-hidden">
          <div className="p-12 flex flex-col justify-center gap-6">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-[#7e7d7d]">
              Sign in to continue to Prowess Lift
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <InputCommon
                props={{
                  name: "email",
                  type: "text",
                  placeholder: "Email address",
                  classname:
                    "rounded-md p-4 outline-none border border-slate-200 w-full",
                  value: form.email,
                  handChange: handChange,
                }}
              />
              <span className="text-red-500 text-sm">{formError.email}</span>

              <div className="flex justify-start items-center w-full relative">
                <InputCommon
                  props={{
                    name: "password",
                    type: showPassword ? "text" : "password",
                    placeholder: "Password",
                    classname:
                      "rounded-md p-4 outline-none border border-slate-200 w-full",
                    value: form.password,
                    handChange: handChange,
                  }}
                />

                <button
                  type="button"
                  className="absolute right-4 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {" "}
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <span className="text-red-500 text-sm">{formError.password}</span>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#7e7d7d]">
                  <input type="checkbox" className="accent-teal-400" /> Remember
                  me
                </label>
                <a href="#" className="text-sm text-teal-400 font-medium">
                  Forgot password?
                </a>
              </div>

              {mess && (
                <p
                  className={`text-sm ${mess.toLowerCase().includes("success") ? "text-green-600" : "text-red-500"}`}
                >
                  {mess}
                </p>
              )}

              <button
                className="bg-teal-400 hover:bg-teal-600 disabled:opacity-60 text-white py-3 rounded-md font-bold transition cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "SIGN IN..." : "Sign in"}
              </button>
            </form>

            <GoogleLogin onSuccess={handScusses} />

            <p className="text-sm text-[#7e7d7d]">
              Don't have an account?{" "}
              <Link to="/register" className="text-teal-400 font-bold">
                Create one
              </Link>
            </p>

            <div>
              <div className="flex justify-center"></div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#011627] to-[#0b2a3a] p-8">
            <div className="text-center text-white px-6">
              <h3 className="text-2xl font-bold mb-3">Prowess Lift</h3>
              <p className="text-[#cfd7df] max-w-[280px] mx-auto">
                Join us and start your fitness journey today. Track progress,
                access workout plans and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
