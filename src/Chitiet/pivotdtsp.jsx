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

const PivotDtsp = () => {

  const { listChitiet } = useSelector((state) => state.chitiet);

  const [data, setData] = useState();
  const [state, setState] = useState({});

  useEffect(() => {
    if (listChitiet && listChitiet.length > 0) {
      const newData = listChitiet.map((row) => ({
        'Ngày': formatDateDisplay(row.ngay_ct),
        'Số chứng từ':  row.so_ct,
        'Mã chứng từ':  row.ma_ct,
        'Mã sản phẩm':  row.ma_vt,
        'Tên sản phẩm': row.ten_vt,
        'Kho/cửa hàng': row.ten_kho,
        'Số lượng bán': row.t_sl_xuat,
        'Doanh thu': formatCurrency(row.t_tien_hang),
        'VAT': row.tien_thue_nk,
        'SL trả lại': row.sl_nhap,
        'Tiền trả lại': formatCurrency(row.tien_tl),
        'Phương thức thanh toán': formatCurrency(row.ten_pt_thanh_toan),
      }));
      setData(newData);
    }
  }, [listChitiet]);



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
    <Button
      className="btn__export"
      onClick={(event) => { event.preventDefault(); handleExportClick() }}
    >
      Xuất Excel
    </Button>
    <PivotTableUI
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

export default PivotDtsp;
