import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";



import { getKhoAction } from "../store/actions/kho.action";




export default function Kho(props) {


  const dispatch = useDispatch();
  const { listKho } = useSelector((state) => state.kho); 
  const [data, setData] = useState(listKho);


  // kho
  const fetchData1 = useCallback(() => {
    dispatch(getKhoAction(""));
  }, [dispatch]);

  useEffect(() => {
    fetchData1();
  }, [fetchData1]);

  useEffect(() => {
    setData(listKho);
  }, [listKho]);

  

  return (
    <>
      {listKho &&
        listKho.map((item, index) => (
          <option key={index} value={item._id}>
            {item.ma_kho}
          </option>
      ))}   
    </>
  );
}