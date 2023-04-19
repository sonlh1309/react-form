import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getVattuAction } from "../store/actions/vattu.action";

export default function Vattu(props) {


  const dispatch = useDispatch();
  const { listVattu } = useSelector((state) => state.vattu); 
  const [data, setData] = useState(listVattu);


  // kho
  const fetchData1 = useCallback(() => {
    dispatch(getVattuAction(""));
  }, [dispatch]);

  useEffect(() => {
    fetchData1();
  }, [fetchData1]);

  useEffect(() => {
    setData(listVattu);
  }, [listVattu]);



  return (
    <>
      {listVattu &&
        listVattu.map((item, index) => (
          <option style={{ fontSize: '13px' }} key={index} value={item.ma_vt}>
            {item.ten_vt}
          </option>
      ))}   
    </>
  );
}