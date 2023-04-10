import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listProduct: [],
};

export const ProductReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state, action) => {

      state.listProduct = action.payload;
    },
  },
});

export const { getProduct } = ProductReducer.actions;

export default ProductReducer.reducer;
