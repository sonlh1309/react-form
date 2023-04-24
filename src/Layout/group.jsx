import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";



export default function Group(props) {


  const dispatch = useDispatch();
  const { listGroup } = useSelector((state) => state.group); 
  const [data, setData] = useState(listGroup);


  useEffect(() => {
    setData(listGroup);
  }, [listGroup]);



  return (
    <>
      {listGroup &&
        listGroup.map((item, index) => (
          <option style={{ fontSize: '13px' }} key={index} value={item._id}>
            {item.group_name}
          </option>
      ))}   
    </>
  );
}