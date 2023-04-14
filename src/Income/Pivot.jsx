import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import tableToExcel from "@linways/table-to-excel";

import axios from "axios";
import { TbFileExport } from "react-icons/tb";
import PivotTableUI from "react-pivottable/PivotTableUI";
import TableRenderers from "react-pivottable/TableRenderers";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import createPlotlyComponent from "react-plotly.js/factory";
import callApis from "../utils/callApis";

const Plot = createPlotlyComponent(window.Plotly);
const PlotlyRenderers = createPlotlyRenderers(Plot);



export default function Pivot() {
  const fetchData = async () => {
    const res = await axios.get(
      "https://638776d1d9b24b1be3f14cd4.mockapi.io/api/v1/product"
    );
    setData(res.data);
    // Bỏ thuộc tính type trong res.data và thêm thuộc tính loại sản phẩm
    const dataTemp = JSON.parse(JSON.stringify(res.data));
    const newData = dataTemp.map((item) => {
      item["loai"] = item.type?.name;
      delete item.type;
      return item;
    });
    setState({ data: newData });

  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const [data, setData] = useState();
  console.log(data )

  const [state, setState] = useState({});

  // Hàm export dữ liệu ra file excel
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

    tableToExcel.convert(htmlTable, { name: "mine.xlsx" });
  };


  return (
 
                <>
                  <button
                    className="btn__export"
                    onClick={() => handleExportClick()}
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
                      console.log(s)
                      setState(s);
                    }}
                    unusedOrientationCutoff={Infinity}
                  />
                </>
  );
}
