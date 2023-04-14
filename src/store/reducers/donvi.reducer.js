import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listDonvi: [],
};

export const DonviReducer = createSlice({
  name: "donvi",
  initialState,
  reducers: {
    getDonvi: (state, action) => {

      state.listDonvi = action.payload;
    },
  },
});

export const { getDonvi } = DonviReducer.actions;

export default DonviReducer.reducer;
