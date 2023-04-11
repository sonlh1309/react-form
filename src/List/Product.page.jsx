import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { formatCurrency, formatDateDisplay } from "../utils/myUtils";
import PrintIcon from '@mui/icons-material/Print';
import Swal from "sweetalert2";
import PublishIcon from '@mui/icons-material/Publish';
import { searchReportAction } from "../store/actions/report.action";
import Row from 'react-bootstrap/Row';
import {Col, Container} from 'react-bootstrap';


import { deleteProductAction, getProductAction } from "../store/actions/Product.action";
import Search2 from "../Layout/search";
import './list.css'
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function Product(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listProduct } = useSelector((state) => state.product);
  const [data, setData] = useState(listProduct);

  const handleEdit = (row) => {
    navigate("edit", {
      state: {
        product: row,
      },
    });
  };

  const handleDelete = ( row ) => {
    const res = dispatch(deleteProductAction( row._id));
    if (res.error) {
      Swal.fire({
        icon: "error",
        title: `${res.error}`,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Xóa thành công",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  const fetchData = useCallback(() => {
    dispatch(getProductAction("2261dbde9b4b5893c15badbfbf1cb571"));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setData(listProduct);
  }, [listProduct]);

  const handleSearch = async (text, startDate, endDate) => {
    if (text === "") {
      setData(getProductAction);
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
      name: "STT",
      selector: (row, index) => index + 1,
      sortable: false,
      width: '10%',
    },
    {
      name: "Mã quốc gia",
      selector: (row) => row.ma_quocgia,
      sortable: true,
    },
    {
      name: "Tên quốc gia",
      selector: (row) => row.ten_quocgia,
      sortable: true,
    },
    {
      name: "Action",
      sortable: false,
      center: true,
      cell: (row) => (
        <Dropdown >
          <Dropdown.Toggle  className="btn_header_table" id="dropdown-basic">
            
          </Dropdown.Toggle>
          <Dropdown.Menu >
            <Dropdown.Item  onClick={() => handleEdit(row)}>Sửa</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(row)}>Xóa</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
    
  ];
  const conditionalRowStyles = [
    {
      when: (row) => listProduct.indexOf(row)  === 0,
      style: {
        backgroundColor: "#F9F9F9",
        color: "#000",
      },
    },
    {
      when: (row) => listProduct.indexOf(row)  === 'name',
      style: {
        backgroundColor: "#F9F9F9",
        color: "#000",
      },
    },
  ];
  const customStyles = {
    rdt_TableHeadRow: {
      fontWeight: "bold",
      backgroundColor: "#F9F9F9",
    },
  };

  return (
    <>
      <Container>
        <Row>
          <div className="content__head">
            <h2 className="content__title">
              Danh sách nhóm hàng hóa/dịch vụ
            </h2>
            <div className="content__right">
              <Button className="button btn_header_table" onClick={() => navigate("new")}>
                {/* <span className="button__title">Thêm mới</span> */}
                <PlusOutlined />
              </Button>
              <Button className="button btn_header_table">
                <PublishIcon fontSize="small"/>
                <span className="button__title">Xuất file </span>
              </Button>
              <Button className="button btn_header_table">
              <PrintIcon fontSize="small" ml={1} />
                <span className="button__title"> In</span>
              </Button>
            </div>
          </div>
          <div className="content__table">
            <DataTable
              noDataComponent="Không có dữ liệu"
              columns={columns}
              data={data}
              conditionalRowStyles={conditionalRowStyles}
              customStyles={customStyles}
              theadClass="bold-row"
              // conditionalCellStyles={conditionalCellStyles}
              highlightOnHover
              selectableRows={true}
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
            
        </Row>
      </Container>
    </>
  );
}