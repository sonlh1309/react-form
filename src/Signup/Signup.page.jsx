import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAction } from "../store/actions/user.action";
import './Signup.css'



function Signup(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkRegister } = useSelector((state) => state.user);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [error, setError] = useState();

  const [checkEmail, setCheckEmail] = useState();
  const [checkName, setCheckName] = useState();
  const [checkPassword, setCheckPassword] = useState();
  const [checkRePassword, setCheckRePassword] = useState();
  const [checkAddress, setCheckAddress] = useState();
  const [checkPhone, setCheckPhone] = useState();

  useEffect(() => {
    if (checkRegister) {
      if (checkRegister.data) {
        setError("Đăng ký thành công");
      } else {
        setError(checkRegister);
      }
    }
  }, [checkRegister]);

  const signUp = (event) => {
    event.preventDefault();
    if (email) {
    }
    dispatch(
      registerUserAction({
        email,
        name,
        password,
        rePassword,
        address,
        phone,
        group_id: "60939745ac969b40784883ed",
        id_app: "62e0b3885271e2560e8bb7d3",
      }),
    );
  };

  return (
    <>
    <div className="signin">
        <div className="form">
          <h2>Đăng ký</h2>
          <form onSubmit={signUp}  className="form">
          <input
              type="text"
              placeholder="Tên đăng nhập"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
           <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
           <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
             <input
              type="text"
              placeholder="Số điện thoại"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <input type="submit" value="Đăng ký" className="submit" />
            
            <p style={{ color: 'white' }}>{error}</p>
            <div className="login__link d-flex flex-row justify-content-between w-100">
              {/* <a href="#!" style={{ color: '#FFF' }}>Quên mật khẩu?</a> */}
              <Link to="/login" style={{ color: 'user/participant/edit#FFF' }}>Đăng nhập</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
