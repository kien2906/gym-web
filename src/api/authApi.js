
import axios from "axios";
import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => {
    return axiosClient.post("/auth/login", data);
  },

  register: (data) => {
    return axiosClient.post("/auth/register", data);
  },

  
};


const getVideos = async () => {
  const res = await axios.get("http://localhost:4000/video");
  return res.data
};

export default authApi;
export {getVideos}