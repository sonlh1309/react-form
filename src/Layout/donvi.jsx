import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getDonviAction } from "../store/actions/donvi.action";


export default function Donvi(props) {


  const dispatch = useDispatch();
  const { listDonvi } = useSelector((state) => state.donvi); 
  const [data, setData] = useState(listDonvi);


  // kho
  const fetchData1 = useCallback(() => {
    dispatch(getDonviAction(""));
  }, [dispatch]);

  useEffect(() => {
    fetchData1();
  }, [fetchData1]);

  useEffect(() => {
    setData(listDonvi);
  }, [listDonvi]);

  

  return (
    <>
      {listDonvi &&
        listDonvi.map((item, index) => (
          <option style={{ fontSize:'13px' }} key={index} value={item._id}>
            {item.ten_dvcs}
          </option>
      ))}   
    </>
  );
}