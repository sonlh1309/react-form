import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listVattu: [],
};

export const VattuReducer = createSlice({
  name: "vattu",
  initialState,
  reducers: {
    getVattu: (state, action) => {

      state.listVattu = action.payload;
    },
  },
});

export const { getVattu } = VattuReducer.actions;

export default VattuReducer.reducer;
