import axiosClient from "../api/axiosClient";

const Register = async (data) => {
  const res = await axiosClient.post("/users/register", data);;
  return res.data;
};

export default Register;
