import React, { useState, useEffect } from 'react';
import { formatCurrency,formatDateDisplay } from '../utils/myUtils';
import tableToExcel from "@linways/table-to-excel";
import PivotTableUI from 'react-pivottable/PivotTableUI';
// import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';

import { Button } from 'antd';
import { useSelector } from 'react-redux';

import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import createPlotlyComponent from "react-plotly.js/factory";


const Plot = createPlotlyComponent(window.Plotly);
const PlotlyRenderers = createPlotlyRenderers(Plot);

const PivotDay = () => {

  const { listDay } = useSelector((state) => state.day);

  const [data, setData] = useState();
  const [state, setState] = useState({});

  useEffect(() => {
    if (listDay && listDay.length > 0) {
      const newData = listDay.map((row) => ({
        'Ngày chứng từ': formatDateDisplay(row.ngay_ct),
        'Số lượng bán': formatCurrency(row.t_sl_xuat),
        'Tiền hàng': formatCurrency(row.t_tien_hang),
        'CK sản phẩm': formatCurrency(row.t_tien_ck),
        'Doanh thu': formatCurrency(row.t_tien),
        'CK hóa đơn': formatCurrency(row.tien_ck_hd),
        Evoucher: formatCurrency(row.tien_evoucher),
        'Tổng tiền': formatCurrency(row.t_doanh_thu),
        'SL trả lại': formatCurrency(row.t_sl_nhap),
      }));
      setData(newData);
    }
  }, [listDay]);



  const handleExportClick = () => {

    var htmlTable = document.querySelector(".pvtTable").cloneNode(true);

    const htmlTableHead = htmlTable.querySelector("thead");
    const htmlHeadRows = htmlTableHead.querySelectorAll("tr");
    htmlHeadRows.forEach((headRow) => {
      const htmlHeadCells = headRow.querySelectorAll("th");
      htmlHeadCells.forEach((htmlCell) => {
        const isAxisLabel = htmlCell.classList.contains("pvtAxisLabel");
        const isColLabel = htmlCell.classList.contains("pvtColLabel");
        const isTotalLabel = htmlCell.classList.contains("pvtTotalLabel");

        if (isAxisLabel) {
          htmlCell.setAttribute("data-a-h", "left");
          htmlCell.setAttribute("data-a-v", "middle");
        }
        if (isColLabel) {
          htmlCell.setAttribute("data-a-h", "center");
          htmlCell.setAttribute("data-a-v", "middle");
        }
        if (isTotalLabel) {
          // htmlCell.setAttribute("data-exclude", "true");
          htmlCell.setAttribute("data-a-h", "center");
          htmlCell.setAttribute("data-a-v", "middle");
        }
      });
    });

    const htmlTableBody = htmlTable.querySelector("tbody");
    const htmlBodyRows = htmlTableBody.querySelectorAll("tr");
    htmlBodyRows.forEach((bodyRow) => {
      const htmlBodyCells = bodyRow.querySelectorAll("th, td");
      htmlBodyCells.forEach((htmlCell) => {
        const isRowLabel = htmlCell.classList.contains("pvtRowLabel");
        const isValue = htmlCell.classList.contains("pvtVal");
        const isTotal = htmlCell.classList.contains("pvtTotal");
        const isTotalLabel = htmlCell.classList.contains("pvtTotalLabel");
        const isGrandTotal = htmlCell.classList.contains("pvtGrandTotal");

        if (isRowLabel) {
          htmlCell.setAttribute("data-a-h", "left");
          htmlCell.setAttribute("data-a-v", "middle");
        }
        if (isValue) {
          htmlCell.setAttribute("data-a-h", "right");
          htmlCell.setAttribute("data-a-v", "middle");
          htmlCell.setAttribute("data-t", "n");
        }
        if (isTotal || isTotalLabel || isGrandTotal) {
          // htmlCell.setAttribute("data-exclude", "true");
          htmlCell.setAttribute("data-a-h", "right");
          htmlCell.setAttribute("data-a-v", "middle");
          htmlCell.setAttribute("data-t", "s");
        }
      });
    });

    tableToExcel.convert(htmlTable, { name: "Pivotday.xlsx" });
  }; 
  return (
  
    <>
    <button
      className="btn__export"
      onClick={(event) => { event.preventDefault(); handleExportClick() }}
    >
      Xuất Excel
    </button>

    {/* Sử dụng chart */}
    <PivotTableUI
      //renderres
      renderers={Object.assign(
        {},
        TableRenderers,
        PlotlyRenderers
      )}
      data={data}
      {...state}
      onChange={(s) => {

        setState(s);
      }}
      unusedOrientationCutoff={Infinity}
    />
  </>
  );
};

export default PivotDay;
