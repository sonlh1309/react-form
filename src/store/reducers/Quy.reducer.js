import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listQuy: [],
};

export const QuyReducer = createSlice({
  name: "quy",
  initialState,
  reducers: {
    getQuy: (state, action) => {

      state.listQuy = action.payload;
    },
  },
});

export const { getQuy } = QuyReducer.actions;

export default QuyReducer.reducer;
