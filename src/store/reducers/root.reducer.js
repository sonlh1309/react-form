import { configureStore } from "@reduxjs/toolkit";

import ReportReducer from "./report.reducer";
import IncomeReducer from "./Income.reducer";


export default configureStore({
  reducer: {
    report: ReportReducer,
    income: IncomeReducer,
  },
  
})