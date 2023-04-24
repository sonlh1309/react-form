import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listChietkhau: [],
};

export const ChietkhauReducer = createSlice({
  name: "chietkhau",
  initialState,
  reducers: {
    getChietkhau: (state, action) => {

      state.listChietkhau = action.payload;
    },
  },
});

export const { getChietkhau } = ChietkhauReducer.actions;

export default ChietkhauReducer.reducer;
