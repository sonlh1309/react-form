import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/myUtils';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';


const Plot = createPlotlyComponent(window.Plotly);

const PlotlyRenderers = createPlotlyRenderers(Plot);

const PivotDay = () => {

  const { listDay } = useSelector((state) => state.day);

  const [data, setData] = useState(listDay);
  const [state, setState] = useState({});

  useEffect(() => {
    if (listDay && listDay.length > 0) {
      const data = listDay.map((row) => ({
        'Ngày chứng từ': row.ngay_ct,
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
  }, [listDay]);

  const onChange = (s) => {
    setState(s);
    console.log(s)
  };
  const handlePrint = () => {
    console.log(state.rows);
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(state.rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'report.xlsx');
  };
  return (
    <>
        
      {data.length > 0 && (
        
        <>  
          <Button onClick={handleDownloadExcel}>Excel</Button>
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

export default PivotDay;
