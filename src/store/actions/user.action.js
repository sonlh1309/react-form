import callApis from "../../utils/callApis";
import { Buffer } from "buffer";
import {
  getTokenUser,
  getDetailUser,
  registerUser
} from "../reducers/user.reducer";
import callApi from "../../utils/callApi";


export const getTokenUserAction = (username, password) => {
  var credentials = Buffer.from(username + ":" + password).toString("base64");
  var basicAuth = "Basic " + credentials;
  const add = async (dispatch) => {
    try {
      const res = await callApis(
        `auth/local?group_id=60939745ac969b40784883ed&id_app=62e0b3885271e2560e8bb7d3`,
        "GET",
        "",
        {
          // sever check username, password. Nếu hợp lệ trả về status 200 cho phép truy cập, nếu ko trả về status 401
          Authorization: basicAuth,
        },
      );
      if (res.data) {
        await dispatch(getTokenUser(res.data.token));
        const detailUser = await callApi(
          `api/profile?access_token=${res.data.token}`,
          "GET",
        );
        await dispatch(getDetailUser(detailUser.data));
        return res.data;
      } else {
        await dispatch(getTokenUser(res));
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return add;
};

export const saveTokenToReduxAction = (token) => {
  const add = async (dispatch) => {
    try {
      await dispatch(getTokenUser(token));
    } catch (err) {
      // console.log("true");
    }
  };
  return add;
};

export const getDetailUserAction = (token) => {
  const add = async (dispatch) => {
    try {
      const res = await callApis(`api/profile?access_token=${token}`, "GET");
      if (res.data) {
        await dispatch(getDetailUser(res.data));
      }
      return res;
    } catch (err) {
      // console.log("true");
    }
  };
  return add;
};

export const registerUserAction = (data) => {
  const add = async (dispatch) => {
    try {
      const res = await callApis(`signup`, "POST", data);
      await dispatch(registerUser(res));
      return res.data;
    } catch (err) {
      // console.log("true");
    }
  };
  return add;
};
