import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDateDisplay, formatDateValue } from "../utils/myUtils";
import PrintIcon from '@mui/icons-material/Print';
import "react-datepicker/dist/react-datepicker.css";
import {Col,Form} from 'react-bootstrap';
import { getDayAction } from "../store/actions/day.action";
// import { getKhoAction } from "../store/actions/report.action";
import { getKhoAction } from "../store/actions/kho.action";
import { getDonviAction } from "../store/actions/donvi.action";
import './dtsp.css'
import { Button } from "antd";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import Kho from "../Layout/makho";
import Donvi from "../Layout/donvi";
import PivotDtsp from "./pivotdtsp";
import Vattu from "../Layout/vattu";
import Thanhtoan from "../Layout/thanhtoan";
import { getChitietAction ,getSearchchitietAction } from "../store/actions/chitiet.action";

export default function Chitietsp(props) {


  const dispatch = useDispatch();

  const { listChitiet } = useSelector((state) => state.chitiet);
  const [search, setSearch] = useState(listChitiet);

  const [data, setData] = useState(listChitiet);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [dvcs, setDvcs] = useState('');
  const [mavt, setMavt] = useState('');
  const [kho,  setKho ] = useState('');
  const [pttt, setPttt] = useState('');
  const [mact, setMact] = useState('');

  // const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [basicActive, setBasicActive] = useState("tab1");
  
  const fetchData = useCallback(() => {
    dispatch(getChitietAction("5233108aee2aa6028dc0e1627330e87c"));
  }, [dispatch ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  const fetchSearch = useCallback(() => {
    dispatch(getSearchchitietAction("5233108aee2aa6028dc0e1627330e87c", fromDate, toDate, dvcs, mavt, kho, pttt, mact ));
  }, [dispatch, fromDate, toDate, dvcs, mavt, kho, pttt, mact ]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  useEffect(() => {
    setData(listChitiet);
  }, [ listChitiet]);


  const handleButtonClick = () => {

    setFromDate(document.getElementById("fromdate").value);
    setToDate(document.getElementById("todate").value);
    setKho(document.getElementById("kho").value);
    setMact(document.getElementById("mact").value);
    setMavt(document.getElementById("sanpham").value);
    setDvcs(document.getElementById("dvcs").value);
    setPttt(document.getElementById("pttt").value);

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
        name: "Số chứng từ ",
        selector: (row) => row.so_ct,
        sortable: false,
      },
      {
        name: "Mã chứng từ",
        selector: (row) => row.ma_ct,
        sortable: true,

      },
      {
        name: "Mã sản phẩm",
        selector: (row) => row.ma_vt,
        sortable: false,
      },
      {
        name: "Tên sản phẩm",
        selector: (row) => row.ten_vt,
        sortable: false,
      },
      {
        name: "Kho/cửa hàng ",
        selector: (row) => row.ten_kho,
        sortable: true,
      },
      {
        name: "SL bán",
        selector: (row) => row.sl_xuat,
        sortable: true,
      },
      {
        name: "Doanh thu",
        selector: (row) => row.tien_hang,
        sortable: true,
        format: (row) => formatCurrency(row.tien_hang),
      },
      {
        name: "VAT",
        selector: (row) => row.tien_thue_nk,
        sortable: true,
      },
      {
        name: "SL trả lại",
        selector: (row) => row.sl_nhap,
        sortable: true,
      },
      {
        name: "Tiền trả lại",
        selector: (row) => row.tien_tl,
        sortable: true,
      },
      {
        name: "Phương thức thanh toán",
        selector: (row) => row.ten_pt_thanh_toan,
        sortable: true,
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
              <Form.Control style={{ fontSize:'13px' }}
                type="date"
                  name="doj"
                  id="fromdate"
                  defaultValue="2023-01-01"
                placeholder="Date of Joining"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Đến ngày</Form.Label>
              <Form.Control  style={{ fontSize:'13px' }} 
                type="date" 
                  name="doj" 
                  id="todate"
                  defaultValue="2023-04-18"

                placeholder="Date of Joining" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Kho</Form.Label>
              <Form.Select id="kho"  style={{ fontSize:'13px' }}>
                <option value="">--</option>
                <Kho />
                <option value="" className="btn-add"></option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Mã chứng từ</Form.Label>
              <Form.Select id="mact"  style={{ fontSize:'13px' }}>
                <option value="SO1,PBL">All</option>
                <option value="PBL">Phiếu bán lẻ</option>
                <option value="SO1">Đơn đặt hàng</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Sản phẩm</Form.Label>
              <Form.Select id="sanpham"  style={{ fontSize:'13px' }}>
                <option value="">--</option>
                <Vattu/>
                <option value="" className="btn-add"></option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Đơn vị</Form.Label>
              <Form.Select id="dvcs"  style={{ fontSize:'13px' }} >
                <option value="">--</option>
                <Donvi/>
                 <option value="" className="btn-add"></option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>P.T thanh toán</Form.Label>
              <Form.Select id="pttt"  style={{ fontSize:'13px' }}>
                <option value="">--</option>
                <Thanhtoan/>
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
                </Form>
              </MDBTabsPane>
              <MDBTabsPane show={basicActive === "tab2"}>
                <Form style={{ border: '1px solid #DDDDDD', marginTop: '10px', padding: '8px' }}>
                  <div div className="content__table" style={{ marginTop: '20px', overflow: 'auto' }}>  
                  <PivotDtsp/>
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