import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import callApi from "../utils/callApi";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { Button } from "antd";

export default function ChangePass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tokenUser } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const [value, setValue] = useState();

  const onSubmit = async (data) => {
    const res = await callApi(
      `api/changepassword?access_token=${tokenUser}`,
      "POST",
      data,
    );
    if (res.error) {
      Swal.fire({
        icon: "error",
        title: `${res.error}`,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Đổi mật khẩu thành công",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <>
      <div className="home-content">
        <div className="content__container">
          <div className="content__head">
            <h2
              className="content__title"
              style={{
                padding: "2px",
                paddingTop: "10px",
                margin: "10px",
              }}
            >
              <VpnKeyOutlinedIcon style={{ marginRight: 5, marginBottom: 2 }} />
              Đổi mật khẩu
            </h2>
          </div>
          <div className="content__table">
            {/* sử dụng useForm trong react hook form */}
            <Form 
              id="form-change-pass"
              onSubmit={handleSubmit(onSubmit)}
              style={{
                margin: "0px 25%",
                padding: "15px 0",
                marginBottom: "30px",
                padding: "15px 0px",
                border: "1px solid #343b4b",
                borderRadius: "10px",
              }}
            >
              <div style={{ margin: "20px 10%" }}>
                <TextField
                  label="Mật khẩu cũ"
                  type="password"
                  style={{ width: "100%" }}
                  {...register("oldPassword", {
                    required: true,
                  })}
                />
              </div>
              <div style={{ margin: "20px 10%" }}>
                <TextField
                  label="Mật khẩu mới"
                  type="password"
                  style={{ width: "100%" }}
                  {...register("newPassword", {
                    required: true,
                  })}
                />
              </div>
              <div style={{ margin: "20px 10%" }}>
                <TextField
                  label="Nhập lại mật khẩu mới"
                  type="password"
                  style={{ width: "100%" }}
                  {...register("reNewPassword", {
                    required: true,
                  })}
                />
              </div>
              <TextField type="submit" value="Đổi mật khẩu" className="submit"
                style={{ 
                  margin: "20px 10%" 
                 }}
              />
              {/* <Button className="button" type="submit" form="form-change-pass">
                <span className="button__title">Đổi mật khẩu</span>
              </Button> */}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}



