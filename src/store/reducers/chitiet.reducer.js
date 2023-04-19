import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listChitiet: [],
};

export const ChitietReducer = createSlice({
  name: "chitiet",
  initialState,
  reducers: {
    getChitiet: (state, action) => {

      state.listChitiet = action.payload;
    },
  },
});

export const { getChitiet } = ChitietReducer.actions;

export default ChitietReducer.reducer;
