import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/myUtils';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Plot = createPlotlyComponent(window.Plotly);

const PlotlyRenderers = createPlotlyRenderers(Plot);

const Pivot2 = () => {

  const { listIncome } = useSelector((state) => state.income);

  const [data, setData] = useState(listIncome);
  const [state, setState] = useState({});

  useEffect(() => {
    if (listIncome && listIncome.length > 0) {
      const data = listIncome.map((row) => ({
        Tháng: row.thang,
        'Số lượng bán': formatCurrency(row.t_sl_xuat),
        'Tiền hàng': formatCurrency(row.t_tien_hang),
        'CK sản phẩm': formatCurrency(row.t_tien_ck),
        'Doanh thu': formatCurrency(row.t_tien),
        'CK hóa đơn': formatCurrency(row.tien_ck_hd),
        Evoucher: formatCurrency(row.tien_evoucher),
        'Tổng tiền': formatCurrency(row.t_doanh_thu),
        'SL trả lại': formatCurrency(row.t_sl_nhap),
      }));
      setData(data);
    }
  }, [listIncome]);

  const onChange = (s) => {
    console.log(s);
    setState(s);
  };


  return (
    <>
      {data.length > 0 && (
        <>
         <PivotTableUI
            data={data}
            onChange={onChange}
            renderers={{ ...TableRenderers, ...PlotlyRenderers }}
            {...state}
          />

        </>
      )}
    </>
  );
};

export default Pivot2;
