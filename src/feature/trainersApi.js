
import { baseApi } from "../services/baseApi";
// export const fetch = createAsyncThunk("api/trainer", async () => {
//  const res = await getTrainers();
//   return res.data
// });
// const initialState = {
//     trainers:[],
//     loading: null,
//     error: null
// }
// const trainers= createSlice({
//   name:"trainer",
//   initialState,
//   reducers:{},
//   extraReducers:(bulider)=>{
//     bulider.addCase(fetch.pending,(state)=>{
//            state.loading=true
//     }).addCase(fetch.fulfilled,(state)=>{
//         state.loading=false
//     }).addCase(fetch.rejected,(state)=>{
//         state.error=true
//         state.loading=false
//     })
//   }

// })

export const trainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrainers: builder.query({
      query: () => "/trainer",
    }),
  }),
});

export const { useGetTrainersQuery } = trainerApi;
// export default trainers.reducer
