import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { formatCurrency,  } from "../utils/myUtils";

import { useDispatch, useSelector } from "react-redux";
import { getIncomeAction } from "../store/actions/Income.action.";


import {Col, Form} from 'react-bootstrap';

import './Income.css'

import PivotTableUI from "react-pivottable/PivotTableUI";
import PivotTable from "react-pivottable";
import 'react-pivottable/pivottable.css';
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";

export default function Income() {
  const dispatch = useDispatch()
  const { listIncome } = useSelector((state) => state.income);
  const [data, setData] = useState(listIncome);
  const [year, setYear] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [basicActive, setBasicActive] = useState("tab1");
  const [pivotData, setPivotData] = useState([]);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [vals, setVals] = useState([]);

    const fetchData = useCallback(() => {
      dispatch(getIncomeAction("dfc7bc8e19751c1d7ae3c668cda7f5c6", year));
    }, [dispatch,year]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    useEffect(() => {
      if (isButtonClicked) {
        setData(listIncome);
      }
    }, [isButtonClicked, listIncome]);
  
    const handleButtonClick = () => {
      setIsButtonClicked(true);
      setYear(document.getElementById("Select").value);
  };
  
  const changeTab = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };


  const handlePivotChange = (data) => {
    setPivotData(data);
    setRows(data.rows);
    setCols(data.cols);
    setVals(data.vals);
    
  };
  const pivotDatas = listIncome.map((row) => ({
    Tháng: row.thang,
    "Số lượng bán": row.t_sl_xuat,
    "Tiền hàng": formatCurrency(row.t_tien_hang),
    "CK sản phẩm": formatCurrency(row.t_tien_ck),
    "Doanh thu": formatCurrency(row.t_tien),
    "CK hóa đơn": formatCurrency(row.tien_ck_hd),
    Evoucher: formatCurrency(row.tien_evoucher),
    "Tổng tiền": formatCurrency(row.t_doanh_thu),
    "SL trả lại": row.t_sl_nhap,
  }));
    const pivotTableRenderers = PivotTableUI.renderers;
    const columns = [
      {
        name: "Tháng",
        selector: (row) => row.thang,
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
        when: (row) => listIncome.indexOf(row) === 0,
        style: {
          backgroundColor: "#F9F9F9",
          color: "#000",
        },
      },
    ];
    
  return (
    <>
      <div className="scrollable" style={{ paddingTop:'5px' }}> 
        <div className="scrollable-header" style={{ height:'50px' }}>
          <div className=" navbars" style={{ paddingLeft:'10px', paddingRight: '10px' }}>
            <button  className="button btn-primarys">
              <span className="button__title" onClick={handleButtonClick}>Xem</span>
            </button>
            <button className="button btn-primarys">
              <span className="button__title">In </span>
            </button>
            <button className="button btn-white" > 
              <span className="button__title">Lọc</span>
            </button>
          </div>
        </div>
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
              <Form.Select id="" >
                <option>--</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select" style={{color: '#333', fontSize:'15px', fontWeight:'600' }}>Đơn vị</Form.Label>
              <Form.Select id="" >
                <option>--</option>
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
                    <PivotTableUI
                      data={pivotDatas}
                      onChange={handlePivotChange}
                      renderers={pivotTableRenderers}
                      rows={rows}
                      cols={cols}
                      vals={vals}
                      fixedHeaderScrollHeight= "100px"
                      aggregatorName="Count"
                    />
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