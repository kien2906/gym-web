import axios from "axios";



const getReviews = async () =>{
  const res= await axios.get("http://localhost:4000/reviews")
  return res.data

}
export default getReviews