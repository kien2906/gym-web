import axios from "axios";

const getTrainers = async () => {
  const res = await axios.get("http://localhost:4000/trainers");

  return res.data;
};

const getTrainersId = async (id) => {
  const res = await axios.get(`http://localhost:4000/trainers/${id}`);

  return res.data;
};


export default getTrainers;
export {getTrainersId}