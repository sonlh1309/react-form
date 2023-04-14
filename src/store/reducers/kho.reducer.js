import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listKho: [],
};

export const KhoReducer = createSlice({
  name: "kho",
  initialState,
  reducers: {
    getKho: (state, action) => {

      state.listKho = action.payload;
    },
  },
});

export const { getKho } = KhoReducer.actions;

export default KhoReducer.reducer;
