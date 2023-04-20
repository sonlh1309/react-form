import React from 'react';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import { getDetailUserAction, saveTokenToReduxAction } from './store/actions/user.action';
import { deleteDetailUser } from './store/reducers/user.reducer';

import Loading from './component/Loading/Loading.component';
import { getChitietAction } from './store/actions/chitiet.action';
import { getDayAction } from './store/actions/day.action';
import { getDonviAction } from './store/actions/donvi.action';
import { getIncomeAction } from './store/actions/Income.action.';
import { getKhoAction } from './store/actions/kho.action';
import { getProductAction } from './store/actions/Product.action';
import { getQuyAction } from './store/actions/Quy.action';
import { getReportAction } from './store/actions/report.action';
import { getThanhtoanAction } from './store/actions/thanhtoan.action';
import { getVattuAction } from './store/actions/vattu.action';
import { getYearAction } from './store/actions/Year.action';
import Home from './Home/Home.page';
import Login from './Login/Login.page';
import Signup from './Signup/Signup.page';



const App = () => {

  const dispatch = useDispatch();
  const { detailUser, tokenUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const token = await Cookies.get("token");
      if (token) {
        await dispatch(saveTokenToReduxAction(token));
        const res = await dispatch(getDetailUserAction(token));
        if (!res.data) {
          await Cookies.remove("token");
          await dispatch(deleteDetailUser());
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getUser();
  }, [dispatch]);

  useEffect(() => {
    const fetch = () => {
      if (tokenUser) {
        dispatch(getChitietAction(tokenUser));
        dispatch(getDayAction(tokenUser));
        dispatch(getDonviAction(tokenUser));
        dispatch(getIncomeAction(tokenUser));
        dispatch(getKhoAction(tokenUser));
        dispatch(getProductAction(tokenUser));
        dispatch(getQuyAction(tokenUser));
        dispatch(getReportAction(tokenUser));
        dispatch(getThanhtoanAction(tokenUser));
        dispatch(getVattuAction(tokenUser));
        dispatch(getYearAction(tokenUser));
      }
    };
    fetch();
  }, [tokenUser]);

  if (loading) {
    return <Loading/>;
  }


  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="*"
            element={
              detailUser ? <Home /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/login"
            element={detailUser ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={detailUser ? <Navigate replace to="/" /> : <Signup />}
          />
        </Routes>
      </HashRouter> 
    </>
  )
}

export default App;
