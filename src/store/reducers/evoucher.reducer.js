import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listEvoucher: [],
};

export const EvoucherReducer = createSlice({
  name: "evoucher",
  initialState,
  reducers: {
    getEvoucher: (state, action) => {

      state.listEvoucher = action.payload;
    },
  },
});

export const { getEvoucher } = EvoucherReducer.actions;

export default EvoucherReducer.reducer;
