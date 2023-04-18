import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listYear: [],
};

export const YearReducer = createSlice({
  name: "year",
  initialState,
  reducers: {
    getYear: (state, action) => {

      state.listYear = action.payload;
    },
  },
});

export const { getYear } = YearReducer.actions;

export default YearReducer.reducer;
