import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listThanhtoan: [],
};

export const ThanhtoanReducer = createSlice({
  name: "thanhtoan",
  initialState,
  reducers: {
    getThanhtoan: (state, action) => {

      state.listThanhtoan = action.payload;
    },
  },
});

export const { getThanhtoan } = ThanhtoanReducer.actions;

export default ThanhtoanReducer.reducer;
