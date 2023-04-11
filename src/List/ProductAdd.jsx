import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { addProductAction, editProductAction } from "../store/actions/Product.action";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
import { Button } from "antd";


export default function ProductAdd(props) {
  const nav = useNavigate();
  const dispatch = useDispatch();

  // lấy object state đang cần chỉnh sửa
  const { state } = useLocation();
  const isEdit = state && state.product ? true : false;
  // quản lý các giá trị của ng nhập 
  const { register, handleSubmit, reset } = useForm({
    defaultValues: isEdit ? state.product : {},
  });



  const addProduct = async (data) => {
    if (data.ma_quocgia.toString().includes(" ")) {
      Swal.fire({
        title: "Lỗi",
        text: "Mã quốc gia không được chứa khoảng trắng",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    } else {
      data.ma_quocgia = data.ma_quocgia.toString().toUpperCase();
      if (isEdit) {
        const res = await dispatch(
          editProductAction(data._id, data)
        );
        if (res.error) {
          Swal.fire({
            icon: "error",
            title: `${res.error}`,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Sửa thành công",
            showConfirmButton: false,
            timer: 1000,
          });
          reset(data);
          nav("/Product");
        }
      } else {
        const res = await dispatch(addProductAction(data));
        if (res.error) {
          Swal.fire({
            icon: "error",
            title: `${res.error}`,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Thêm thành công",
            showConfirmButton: false,
            timer: 1000,
          });
          reset(data);
          nav("/Product");
        }
      }
    }
  };

  return (
    <>
      <Container>
        <div className="content__head">
          <h2 className="content__title">
            Danh sách nhóm hàng hóa/dịch vụ
          </h2>
          <div className="content__right">
            <Button className="button btn_header_table" onClick={handleSubmit((data) => addProduct(data))}>
              <span className="button__title">Lưu</span>
            </Button>
            <Button className="button btn_header_table" onClick={() => nav("/Product")}>
              <span className="button__title">Hủy </span>
            </Button>

          </div>
        </div>

        <div className="home-content">
          <div className="content__container">
            <div className="content__head">
              <div className="d-flex flex-row align-items-center pl-5 pt-2">
                <span className="title-add-member">
                  {isEdit ? "Sửa thông tin quốc gia" : "Thêm quốc gia"}
                </span>
              </div>
            </div>
            <div>
              <div className="content__tabs d-flex flex-row p-4">
                <div className="col-md-6">
                  <Form>
                    <Form.Group>
                      <div className="mb-3">
                        <Form.Label>Mã quốc gia (*)</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("ma_quocgia", {
                            required: true,
                          })}
                        />
                      </div>

                      <div className="mb-3">
                        <Form.Label>Tên quốc gia (*)</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("ten_quocgia", { required: true })}
                        />
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>  
     </Container>
     
    </>
  );
}
