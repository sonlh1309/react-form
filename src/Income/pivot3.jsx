import React, { useState, useEffect, useCallback } from 'react';
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

function PivotTable() {
  const { listIncome } = useSelector((state) => state.income);

  const [data, setData] = useState(listIncome);

  const [state, setState] = useState({
    data: data,
    rows: [],
    cols: [],
    aggregatorName: 'Count',
    vals: [],
    rendererName: 'Table'
  });
  const exportToExcel = (event) => {
    event.preventDefault();
    const worksheet = XLSX.utils.json_to_sheet(newData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const newData = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(newData, 'data.xlsx');
  }

  return (
    <div className="PivotTable">
      <PivotTableUI
        data={state.data}
        onChange={s => setState(s)}
        rows={state.rows}
        cols={state.cols}
        aggregatorName={state.aggregatorName}
        vals={state.vals}
        rendererName={state.rendererName}
      />
    </div>
  );
}

export default PivotTable;
