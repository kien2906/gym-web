import axios from "axios";
const token = localStorage.getItem("token")
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:3001/api",
  headers:{
   
    Authorization : `Bearer  ${token}`
  }
});

export default axiosClient;