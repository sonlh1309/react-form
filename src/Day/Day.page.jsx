import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency, formatDateDisplay } from "../utils/myUtils";
import "react-datepicker/dist/react-datepicker.css";
import {Col,Form} from 'react-bootstrap';
import { getDayAction } from "../store/actions/day.action";
import './day.css'
import { Button } from "antd";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PivotDay from "./pivotday";
import Kho from "../Layout/makho";
import Donvi from "../Layout/donvi";


export default function Day(props) {


  const dispatch = useDispatch();

  const { listDay } = useSelector((state) => state.day);


  const [data, setData] = useState(listDay);
  const [fromDate, setFromDate] = useState(new Date().toISOString().slice(0, 10));
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const [dvcs, setDvcs] = useState('');
  const [kho, setKho] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [basicActive, setBasicActive] = useState("tab1");


  const fetchData = useCallback(() => {
    dispatch(getDayAction("5233108aee2aa6028dc0e1627330e87c", fromDate ,toDate, dvcs , kho ));
  }, [dispatch, fromDate, toDate , dvcs , kho]);

  useEffect(() => {
    if (isButtonClicked) {
      fetchData();
    }
  }, [isButtonClicked,fetchData]);

  useEffect(() => {
    if (isButtonClicked) {
      setData(listDay);
    }
  }, [isButtonClicked, listDay]);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setFromDate(document.getElementById("fromdate").value);
    setToDate(document.getElementById("todate").value);
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
        name: "Ngày",
        selector: (row) => row.ngay_ct,
        sortable: false,
        format: (row) => formatDateDisplay(row.ngay_ct),
      },
      {
        name: "Số lượng ",
        selector: (row) => row.t_sl_xuat,
        sortable: false,
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
      
  ];
    

  const conditionalRowStyles = [
  ];

  return (
    <>
      <div className=" navbars" style={{ paddingLeft:'10px', paddingRight: '10px' }}>
        <Button  className="button btn_header_table ">
          <span className="button__title " onClick={handleButtonClick}>Xem</span>
        </Button>
        <Button className="button btn_header_table">
          <span className="button__title">In </span>
        </Button>
        <Button className="button btn-white" > 
          <span className="button__title">Lọc</span>
        </Button>
      </div>

      <div className="row scrollable-content">
        <Col md={3}>
          <Form style={{ border: '1px solid #DDDDDD', marginTop:'60px', padding:'8px' }}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Từ ngày</Form.Label>
            {/* <DatePicker selected={fromDate} onChange={(e) => setFromDate(e.target.value)} /> */}
            <Form.Control
              type="date"
              name="doj"
              id="fromdate"
              defaultValue={fromDate}
              placeholder="Date of Joining"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Đến ngày</Form.Label>
            <Form.Control 
              type="date" 
              name="doj" 
              id="todate"
              defaultValue={toDate}
              placeholder="Date of Joining" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Kho</Form.Label>
              <Form.Select id="kho" >
                <option value="">-- Chọn Kho --</option>
                <Kho />
                <option value="" className="btn-add"></option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Đơn vị</Form.Label>
              <Form.Select id="dvcs" >
                <option value="">-- Chọn đơn vị --</option>
                <Donvi/>
                 <option value="" className="btn-add"></option>
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
                  <PivotDay/>
                  </div>
                </Form>
              </MDBTabsPane>
            </MDBTabsContent>
          </div>
        </Col>
      </div>
    </>
  );
}