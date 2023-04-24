import { getEvoucher } from "../reducers/evoucher.reducer";
import callApis from "../../utils/callApis";


export const getEvoucherAction = (token) => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `api/60939744ac969b4078488026/evoucher?t=1&q={"status":true}&fields=ma,ten&access_token=${token}`,
        "GET",
      );

        await dispatch(getEvoucher(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};

