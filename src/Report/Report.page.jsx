import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";

import { useDispatch, useSelector } from "react-redux";

import { formatCurrency, formatDateDisplay } from "../utils/myUtils";
import PrintIcon from '@mui/icons-material/Print';

import PublishIcon from '@mui/icons-material/Publish';
import { searchReportAction } from "../store/actions/report.action";
import Row from 'react-bootstrap/Row';
import {Col} from 'react-bootstrap';

import { getReportAction } from "../store/actions/report.action";
import Search2 from "../Layout/search";
import './report.css'

export default function Report(props) {

  const dispatch = useDispatch();

  const { listReport } = useSelector((state) => state.report);

  const [data, setData] = useState(listReport);

  const fetchData = useCallback(() => {
    dispatch(getReportAction("flex.public.token"));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setData(listReport);
  }, [listReport]);

  const handleSearch = async (text, startDate, endDate) => {
    if (text === "") {
      setData(listReport);
    } else {
      let newData;
        if (!startDate) {
          startDate = new Date(0);
        }
        if (!endDate) { 
          endDate = new Date();
        }
        newData = await searchReportAction(text, startDate, endDate);
        setData(newData);
    }
  };
 
  const columns = [
    {
      name: "Số hợp đồng",
      selector: (row) => row.ma_hd,
      sortable: true,
    },
    {
      name: "Tên hợp đồng",
      selector: (row) => row.ten_hd,
      sortable: true,
    },
    {
      name: "Người giới thiệu hợp đồng",
      selector: (row) => row.nguoi_gioi_thieu_hd,
      sortable: true,
    },
    {
      name: "Email hóa đơn",
      selector: (row) => row.email_hd,
      sortable: true,
    },
    {
      name: "Ngày tạo hợp đồng",
      selector: (row) => row.ngay_ct,
      sortable: true,
      format: (row) => formatDateDisplay(row.ngay_ct),
    },
    {
      name: "Ngày hiệu lực hợp đồng",
      selector: (row) => row.ngay_hieu_luc,
      sortable: true,
      format: (row) => formatDateDisplay(row.ngay_hieu_luc),
    },
    {
      name: "Giá trị hợp đồng",
      selector: (row) => row.gia_tri_hd,
      sortable: true,
      format: (row) => formatCurrency(row.gia_tri_hd),
    },
    
  ];
  const conditionalRowStyles = [
    {
      when: (row) => listReport.indexOf(row) % 2 === 0,
      style: {
        backgroundColor: "#F9F9F9",
        color: "#000",
      },
    },
    {
      when: (row) => listReport.indexOf(row) % 2 !== 0,
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    },
  ];

  return (
    <>

        <Row>
          <Col sm={3} >
          <Search2 handleSearch={handleSearch} /> 
            
          </Col>
          <Col sm={9}>
            <div className="content__head">
              <h2 className="content__title">
                Báo cáo bán hàng theo thời gian 
              </h2>
              <div className="content__right">
                <button className="button btn-success">
                  <span className="button__title">Xem trước</span>
                </button>
                <button className="button btn-success">
                  <PublishIcon fontSize="small"/>
                  <span className="button__title">Xuất file </span>
                </button>
                <button className="button btn-success">
                <PrintIcon fontSize="small" ml={1} />
                  <span className="button__title"> In</span>
                </button>
              </div>
            </div>
            <div className="content__table">
              <DataTable
                noDataComponent="Không có dữ liệu"
                columns={columns}
                data={data}
                conditionalRowStyles={conditionalRowStyles}
                highlightOnHover
                selectableRows={false}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
                paginationComponentOptions={{
                  rowsPerPageText: "Số hàng trên trang:",
                  rangeText: "{count} hàng",
                  noRowsText: "Không có dữ liệu",
                }}
              />
            </div>
          </Col>
        </Row>

    </>
  );
}