import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://e-comm06.vercel.app/api",
   headers: {
    "Content-Type": "application/json",
  },
});

// npx json-server --watch api/db.json --port 3000
export default axiosClient;