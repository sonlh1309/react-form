import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTokenUserAction } from "../store/actions/user.action";
import Cookies from "js-cookie";
import "./Login.css";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const signIn = async (event) => {
    event.preventDefault();
    const res = await dispatch(getTokenUserAction(username, password));
    if (res.message) {
      setError(res.message);
    } else {
      Cookies.set("token", res.token, { expires: 1 });
      navigate("/");
    }
  };
  return (
    <>
      <div className="login">
        <div className="form">
          <h2>Đăng nhập</h2>
          <form onSubmit={signIn} className="form">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
                />
              {/* <button className="submit" type="submit">
              Đăng nhập */}
            {/* </button> */}
                <input type="submit" value="Đăng nhập" className="submit" />
            <p style={{ color: 'white' }}>{error}</p>
            <div className="login__link d-flex flex-row justify-content-between w-100">
              <a href="#!" style={{ color: '#FFF' }}>Quên mật khẩu?</a>
              <Link to="/signup" style={{ color: '#FFF' }}>Đăng kí</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
