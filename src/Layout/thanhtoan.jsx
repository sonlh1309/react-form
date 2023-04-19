import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getThanhtoanAction } from "../store/actions/thanhtoan.action";

export default function Thanhtoan(props) {


  const dispatch = useDispatch();
  const { listThanhtoan } = useSelector((state) => state.thanhtoan); 
  const [data, setData] = useState(listThanhtoan);


  // kho
  const fetchData1 = useCallback(() => {
    dispatch(getThanhtoanAction(""));
  }, [dispatch]);

  useEffect(() => {
    fetchData1();
  }, [fetchData1]);

  useEffect(() => {
    setData(listThanhtoan);
  }, [listThanhtoan]);



  return (
    <>
      {listThanhtoan &&
        listThanhtoan.map((item, index) => (
          <option style={{ fontSize: '13px' }} key={index} value={item._id}>
            {item.ten}
          </option>
      ))}   
    </>
  );
}