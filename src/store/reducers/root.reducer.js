import { configureStore } from "@reduxjs/toolkit";

import ReportReducer from "./report.reducer";



export default configureStore({
  reducer: {
    report: ReportReducer,
  },
  
})