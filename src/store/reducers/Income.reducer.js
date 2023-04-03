import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listIncome: [],
};

export const IncomeReducer = createSlice({
  name: "income",
  initialState,
  reducers: {
    getIncome: (state, action) => {

      state.listIncome = action.payload;
    },
  },
});

export const { getIncome } = IncomeReducer.actions;

export default IncomeReducer.reducer;
