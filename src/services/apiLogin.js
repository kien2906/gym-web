


import axiosClient from "../api/axiosClient";


const loginApi= async (data) =>{
  
    const res= await axiosClient.post("/users/login",data)
    return res.data

}

export default loginApi