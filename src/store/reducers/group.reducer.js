import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listGroup: [],
};

export const GroupReducer = createSlice({
  name: "group",
  initialState,
  reducers: {
    getGroup: (state, action) => {

      state.listGroup = action.payload;
    },
  },
});

export const { getGroup } = GroupReducer.actions;

export default GroupReducer.reducer;
