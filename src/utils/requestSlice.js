import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state,actiion)=> actiion.payload,
        clearRequest: () => {
            return [];
          },
    },
});

export const { addRequest ,clearRequest}= requestSlice.actions;
export default requestSlice.reducer;