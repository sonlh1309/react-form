import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { formatCurrency,  } from "../utils/myUtils";

import { useDispatch, useSelector } from "react-redux";
import { getIncomeAction } from "../store/actions/Income.action.";

import {Col, Form} from 'react-bootstrap';

import './Income.css'

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


    const fetchData = useCallback(() => {
      dispatch(getIncomeAction("dfc7bc8e19751c1d7ae3c668cda7f5c6", year));
    }, [dispatch,year]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);


  

  const changeTab = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };
 
    
    
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
                    {/*  */}
                  </div>
                </Form>`
              </MDBTabsPane>
              <MDBTabsPane show={basicActive === "tab2"}>
                <Form style={{ border: '1px solid #DDDDDD', marginTop: '10px', padding: '8px' }}>
                  <div div className="content__table" style={{ marginTop: '20px', overflow: 'auto' }}>  

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