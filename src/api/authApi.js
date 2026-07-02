import { data } from "react-router-dom";
import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => {
    return axiosClient.post("/auth/login", data);
  },

  register: (data) => {
    return axiosClient.post("/auth/register", data);
  },

  
};

const getClasses = async () => {
  const res = await axiosClient.get("http://localhost:5000/classes");
  return res.data
};

const getVideos = async () => {
  const res = await axiosClient.get("http://localhost:5000/video");
  return res.data
};

export default authApi;
export {getClasses,getVideos}