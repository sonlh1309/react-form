import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";



export default function Evoucher(props) {


  const dispatch = useDispatch();
  const { listEvoucher } = useSelector((state) => state.evoucher); 
  const [data, setData] = useState(listEvoucher);


  useEffect(() => {
    setData(listEvoucher);
  }, [listEvoucher]);



  return (
    <>
      {listEvoucher &&
        listEvoucher.map((item, index) => (
          <option style={{ fontSize: '13px' }} key={index} value={item.ma}>
            {item.ten}
          </option>
      ))}   
    </>
  );
}