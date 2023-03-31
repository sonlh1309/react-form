import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listReport: [],
};

export const ReportReducer = createSlice({
  name: "report",
  initialState,
  reducers: {
    getReport: (state, action) => {

      state.listReport = action.payload;
    },
  },
});

export const { getReport } = ReportReducer.actions;

export default ReportReducer.reducer;
