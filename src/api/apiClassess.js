import axiosClient from "./axiosClient";
import axios from "axios";
const getClasses = async () => {
  const res = await axios.get("http://localhost:4000/classes");
  return res.data;
};

const getClassesId = async (id) => {
  const res = await axios.get(`http://localhost:4000/classes/${id}`);
  return res.data;
};

export default getClasses;
export {getClassesId}