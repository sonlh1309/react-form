import { getVattu } from "../reducers/vattu.reducer";
import callApis from "../../utils/callApis";


export const getVattuAction = () => {

  const get = async (dispatch) => {
    try {
      const token = "5233108aee2aa6028dc0e1627330e87c"
      const res = await callApis(
        `api/60939744ac969b4078488026/dmvt?t=1&q={"status":true}&fields=ma_vt,ten_vt&access_token=${token}`,
        "GET",
      );
        await dispatch(getVattu(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};


