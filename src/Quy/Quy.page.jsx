import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { formatCurrency,  } from "../utils/myUtils";

import { useDispatch, useSelector } from "react-redux";
import { getIncomeAction } from "../store/actions/Income.action.";


import {Col, Form} from 'react-bootstrap';
import PrintIcon from '@mui/icons-material/Print';
import './Quy.css'
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import * as XLSX from 'xlsx';

import { Button } from "antd";
import { saveAs } from 'file-saver';
import Kho from "../Layout/makho";
import Donvi from "../Layout/donvi";
import { getQuyAction } from "../store/actions/Quy.action";
import Pivotquy from "./pivotquy";


export default function Quy() {
  const dispatch = useDispatch()
  const { listQuy } = useSelector((state) => state.quy);
  const [data, setData] = useState(listQuy);

  const [year, setYear] = useState('');
  const [dvcs, setDvcs] = useState('');
  const [kho, setKho] = useState('');

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [basicActive, setBasicActive] = useState("tab1");


    const fetchData = useCallback(() => {
      dispatch(getQuyAction("5233108aee2aa6028dc0e1627330e87c", year, dvcs , kho ));
    }, [dispatch,year,dvcs,kho]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    useEffect(() => {
      if (isButtonClicked) {
        setData(listQuy);
      }
    }, [isButtonClicked, listQuy]);
  
    const handleButtonClick = () => {
      setIsButtonClicked(true);
      setYear(document.getElementById("Select").value);
      setDvcs(document.getElementById("dvcs").value);
      setKho(document.getElementById("kho").value);
  };
  
  const changeTab = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

    const columns = [
      {
        name: "Quý",
        selector: (row) => row.quy,
        sortable: true,
      },
      {
        name: "Số lượng bán",
        selector: (row) => row.t_sl_xuat,
        sortable: false,
        format: (row) => formatCurrency(row.t_sl_xuat),
      },
      {
        name: "Tiền hàng",
        selector: (row) => row.t_tien_hang,
        sortable: true,
        format: (row) => formatCurrency(row.t_tien_hang),
      },
      {
        name: "CK sản phẩm",
        selector: (row) => row.t_tien_ck,
        sortable: false,
        format: (row) => formatCurrency(row.t_tien_ck),
      },
      {
        name: "Doanh thu ",
        selector: (row) => row.t_tien,
        sortable: true,
        format: (row) => formatCurrency(row.t_tien),
      },
      {
        name: "CK hóa đơn",
        selector: (row) => row.tien_ck_hd,
        sortable: true,
        format: (row) => formatCurrency(row.tien_ck_hd),
      },
      {
        name: "Evoucher",
        selector: (row) => row.tien_evoucher,
        sortable: true,
        format: (row) => formatCurrency(row.tien_evoucher),
      },
      {
        name: "Tổng tiền",
        selector: (row) => row.t_doanh_thu,
        sortable: true,
        format: (row) => formatCurrency(row.t_doanh_thu),
      },
      {
        name: "SL trả lại",
        selector: (row) => row.t_sl_nhap,
        sortable: true,
        
      },
      {
        name: "Tiền trả lại",
        selector: (row) => row.t_tien_tl,
        sortable: true,
        format: (row) => formatCurrency(row.t_tien_tl),
      },
      
  ];
    const conditionalRowStyles = [
      {
        when: (row) => listQuy.indexOf(row) === 0,
        style: {
          backgroundColor: "#F9F9F9",
          color: "#000",
        },
      },
    ];
    const exportToExcel = () => {

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: 'application/octet-stream'});
      saveAs(data, 'data.xlsx');
    }
  return (
    <>
      <div className=" navbars" style={{ paddingLeft:'10px', paddingRight: '10px' }}>
        <Button  className="button btn_header_table " onClick={handleButtonClick}>
          <span className="button__title " >Xem</span>
        </Button>
        <Button className="button btn_header_table" onclick={exportToExcel}>
          <PrintIcon/>
        </Button>
        <Button className="button btn-white" > 
          <span className="button__title">Lọc</span>
        </Button>
      </div>

      <div className="row scrollable-content">
        <Col md={3}>
          <Form style={{ border: '1px solid #DDDDDD', marginTop:'60px', padding:'8px' }}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Năm</Form.Label>
              <Form.Select id="Select" >
                <option>2022</option>
                <option>2020</option>
                <option>2021</option>
                <option>2023</option>
                <option>2024</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Kho</Form.Label>
              <Form.Select id="kho" >
                <option value="">-- Chọn kho --</option>
                <Kho/>  
                <option></option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Đơn vị</Form.Label>
              <Form.Select id="dvcs" >
                <option value="">-- Chọn đơn vị --</option>
                 <Donvi />
                <option></option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
        
        <Col md={9} >
          <div style={{ marginTop: '60px' }}>
            <MDBTabs className="mb-3">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => changeTab("tab1")}
                  active={basicActive === "tab1"}
                >
                  Dữ liệu
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => changeTab("tab2")}
                  active={basicActive === "tab2"}
                >
                  Phân tích
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
          </div>
          <div>
            <MDBTabsContent>
              <MDBTabsPane show={basicActive === "tab1"}>
                <Form style={{ border: '1px solid #DDDDDD', marginTop: '10px', padding: '8px' }}>
                  <div className="content__table" style={{ marginTop: ' 20px'  }}> 
                    <DataTable className="table__data"
                      noDataComponent="Năm"
                      columns={columns}
                      data={data} 
                      fixedHeader={true}
                      fixedHeaderScrollHeight= "500px"
                      conditionalRowStyles={conditionalRowStyles}
                      highlightOnHover
                      selectableRows={false}
                      pagination
                      paginationPerPage={25}
                      paginationRowsPerPageOptions={[ 5,25,50, 100]}
                      paginationComponentOptions={{
                        rowsPerPageText: "Số hàng trên trang:",
                        rangeText: "{count} hàng",
                        noRowsText: "{name}",
                      }}
                    />
                  </div>
                </Form>`
              </MDBTabsPane>
              <MDBTabsPane show={basicActive === "tab2"}>
                <Form style={{ border: '1px solid #DDDDDD', marginTop: '10px', padding: '8px' }}>
                  <div div className="content__table" style={{ marginTop: '20px', overflow: 'auto' }}>  
                      <Pivotquy />
                    {/* <button onClick={exportToExcel}>Xuất Excel</button> */}
                  </div>
                </Form>
              </MDBTabsPane>
            </MDBTabsContent>
          </div>
        </Col>
      </div>
    </>
  )
}