import { configureStore } from "@reduxjs/toolkit";

import ReportReducer from "./report.reducer";
import IncomeReducer from "./Income.reducer";
import ProductReducer from "./Product.reducer";
import dayReducer from "./day.reducer";
import KhoReducer from "./kho.reducer";
import donviReducer from "./donvi.reducer";
import QuyReducer from "./Quy.reducer";
import YearReducer from "./Year.reducer";
import chitietReducer from "./chitiet.reducer";
import vattuReducer from "./vattu.reducer";
import thanhtoanReducer from "./thanhtoan.reducer";
import userReducer from "./user.reducer";
import evoucherReducer from "./evoucher.reducer";
import chietkhauReducer from "./chietkhau.reducer";
import groupReducer from "./group.reducer";






export default configureStore({
  reducer: {
    user: userReducer,
    report: ReportReducer,
    income: IncomeReducer,
    product: ProductReducer,
    day: dayReducer,
    kho: KhoReducer,
    donvi: donviReducer,
    year: YearReducer,
    quy: QuyReducer,
    chitiet: chitietReducer,
    vattu: vattuReducer,
    thanhtoan: thanhtoanReducer,
    evoucher: evoucherReducer,
    chietkhau: chietkhauReducer,
    group: groupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});