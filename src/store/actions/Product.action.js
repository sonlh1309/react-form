
import { getProduct } from "../reducers/Product.reducer";
import callApi from "../../utils/callApi";


export const getProductAction = (token) => {
  const get = async (dispatch) => {
    try {
      const res = await callApi(
        `api/62e0b3885271e2560e8bb7d3/quocgia?access_token=${token}&limit=1000`,
        "GET",
      );
      await dispatch(getProduct(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};

export const addProductAction = (token,data) => {
  const add = async (dispatch) => {
    try {
      const res1 = await callApi(
        `api/62e0b3885271e2560e8bb7d3/quocgia?access_token=${token}`,
        "POST",
        data,
      );
      const res = await callApi(
        `api/62e0b3885271e2560e8bb7d3/quocgia?access_token=${token}&limit=1000`,
        "GET",
      );
      await dispatch(getProduct(res.data));
      return res1;
    } catch (err) {
      console.log(err);
    }
  };
  return add;
};


export const deleteProductAction = (id) => {
  const remove = async (dispatch) => {
    try {
      const token = "2261dbde9b4b5893c15badbfbf1cb571";
      const res1 = await callApi(
        `api/62e0b3885271e2560e8bb7d3/quocgia/${id}?access_token=${token}`,
        "DELETE",
      );
      const res = await callApi(
        `api/62e0b3885271e2560e8bb7d3/quocgia?access_token=${token}&limit=1000`,
        "GET",
      );
      await dispatch(getProduct(res.data));
      return res1;
    } catch (err) {
      console.log(err);
    }
  };
  return remove;
};

export const editProductAction = ( id, data) => {
  const edit = async (dispatch) => {
    try {
      const token = "2261dbde9b4b5893c15badbfbf1cb571";
      const res1 = await callApi(
        `api/62e0b3885271e2560e8bb7d3/quocgia/${id}?access_token=${token}`,
        "PUT",
        data,
      );
      const res = await callApi(
        `api/62e0b3885271e2560e8bb7d3/quocgia?access_token=${token}&limit=1000`,
        "GET",
      );
      await dispatch(getProduct(res.data));
      return res1;
    } catch (err) {
      console.log(err);
    }
  };
  return edit;
};


