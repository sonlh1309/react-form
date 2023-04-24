import React, { useState, useEffect } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import tableToExcel from "@linways/table-to-excel";
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../utils/myUtils';
import { Button } from 'antd';


const Plot = createPlotlyComponent(window.Plotly);
const PlotlyRenderers = createPlotlyRenderers(Plot);

const Pivot2 = (props) => {

  const datas = props.data;
  const [data, setData] = useState([]);
  const [state, setState] = useState({});

  useEffect(() => {
    if (datas && datas.length > 0) {
      const newData = datas.map((row) => ({
        'Tháng': row.thang,
        'Số lượng bán': formatCurrency(row.t_sl_xuat),
        'Tiền hàng': formatCurrency(row.t_tien_hang),
        'CK sản phẩm': formatCurrency(row.t_tien_ck),
        'Doanh thu': formatCurrency(row.t_tien),
        'CK hóa đơn': formatCurrency(row.tien_ck_hd),
        'Evoucher': formatCurrency(row.tien_evoucher),
        'Tổng tiền': formatCurrency(row.t_doanh_thu),
        'SL trả lại': formatCurrency(row.t_sl_nhap),
      }));
     
      setData(newData);
      setState({});
    }
  }, [datas]);

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

    tableToExcel.convert(htmlTable, { name: "PivotYear.xlsx" });
  }; 

  return (
    <div key={JSON.stringify(data)}>
      {data.length > 0 && (
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
      )}
    </div>
  );
};



export default Pivot2;
