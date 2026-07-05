import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getTrainers from "../services/apiTrainer";

export const fetch = createAsyncThunk("api/trainer", async () => {
 const res = await getTrainers();
  return res.data
});
const initialState = {
    trainers:[],
    loading: null,
    error: null
}
const trainers= createSlice({
  name:"trainer",
  initialState,
  reducers:{},
  extraReducers:(bulider)=>{
    bulider.addCase(fetch.pending,(state)=>{
           state.loading=true
    }).addCase(fetch.fulfilled,(state)=>{
        state.loading=false
    }).addCase(fetch.rejected,(state)=>{
        state.error=true
        state.loading=false
    })
  }

})


export default trainers.reducer

