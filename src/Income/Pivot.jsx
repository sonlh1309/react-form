import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { formatCurrency,  } from "../utils/myUtils";
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import { aggregators } from 'react-pivottable/Utilities';
import Plotly from "plotly.js/dist/plotly";
import TableRenderers from "react-pivottable/TableRenderers";

import { useDispatch, useSelector } from "react-redux";



export default function Pivot() {
  const { listIncome } = useSelector((state) => state.income);
  
  const [pivotData, setPivotData] = useState([]);
  
  useEffect(() => {
    if (listIncome && listIncome.length > 0) {
      const data = listIncome.map((row) => ({
        "Tháng": row.thang,
        "Số lượng bán": formatCurrency(row.t_sl_xuat),
        "Tiền hàng": formatCurrency(row.t_tien_hang),
        "CK sản phẩm": formatCurrency(row.t_tien_ck),
        "Doanh thu": formatCurrency(row.t_tien),
        "CK hóa đơn": formatCurrency(row.tien_ck_hd),
        "Evoucher": formatCurrency(row.tien_evoucher),
        "Tổng tiền": formatCurrency(row.t_doanh_thu),
        "SL trả lại": formatCurrency(row.t_sl_nhap),
      }));
      setPivotData(data);
    }
  }, [listIncome]);

  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [vals, setVals] = useState([]);

  
  const handlePivotChange = useCallback((data) => {
    const { rows, cols } = data;
    const newRows = [...new Set(rows)];
    const newCols = [...new Set(cols)];
  
    setRows(newRows);
    setCols(newCols);
    setVals(data.vals);
  }, []);

  const PlotlyRenderers = createPlotlyRenderers(Plotly);
  
  return (
    <div>
      {pivotData.length > 0 && (
        <PivotTableUI
          data={pivotData}
          onChange={handlePivotChange && handlePivotChange}
          renderers={Object.assign({}, TableRenderers || {}, PlotlyRenderers || {})}
          aggregators={aggregators}
          rows={rows}
          cols={cols}
          vals={vals}
          unusedOrientationCutoff={Infinity}
        />
      )}
    </div>
  );
}
