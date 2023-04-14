import { getKho } from "../reducers/kho.reducer";
import callApis from "../../utils/callApis";


export const getKhoAction = () => {

  const get = async (dispatch) => {
    try {
      const token = "5233108aee2aa6028dc0e1627330e87c"
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

