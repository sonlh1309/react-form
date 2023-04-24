import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";



export default function Chietkhau(props) {


  const dispatch = useDispatch();
  const { listChietkhau } = useSelector((state) => state.chietkhau); 
  const [data, setData] = useState(listChietkhau);


  useEffect(() => {
    setData(listChietkhau);
  }, [listChietkhau]);



  return (
    <>
      {listChietkhau &&
        listChietkhau.map((item, index) => (
          <option style={{ fontSize: '13px' }} key={index} value={item.ma_chietkhau}>
            {item.ten_chietkhau}
          </option>
      ))}   
    </>
  );
}