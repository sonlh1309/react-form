import { configureStore } from "@reduxjs/toolkit";

import ReportReducer from "./report.reducer";
import IncomeReducer from "./Income.reducer";
import ProductReducer from "./Product.reducer";
import dayReducer from "./day.reducer";
import KhoReducer from "./kho.reducer";
import donviReducer from "./donvi.reducer";








export default configureStore({
  reducer: {
    report: ReportReducer,
    income: IncomeReducer,
    product: ProductReducer,
    day: dayReducer,
    kho: KhoReducer,
    donvi: donviReducer
  },
  
})