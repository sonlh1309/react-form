import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listDay: [],
};

export const DayReducer = createSlice({
  name: "day",
  initialState,
  reducers: {
    getDay: (state, action) => {

      state.listDay = action.payload;
    },
  },
});

export const { getDay } = DayReducer.actions;

export default DayReducer.reducer;
