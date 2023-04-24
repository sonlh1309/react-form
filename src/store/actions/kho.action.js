import { getKho } from "../reducers/kho.reducer";
import callApis from "../../utils/callApis";


export const getKhoAction = (token) => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `api/60939744ac969b4078488026/dmkho?fields=ma_kho,ten_kho&access_token=${token}`,
        "GET",
      );

        await dispatch(getKho(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};

