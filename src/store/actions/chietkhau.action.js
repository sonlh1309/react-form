import { getChietkhau } from "../reducers/chietkhau.reducer";
import callApis from "../../utils/callApis";


export const getChietkhauAction = (token) => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `api/60939744ac969b4078488026/dmchietkhau?t=1&q={%22status%22:true}&fields=ma_chietkhau,ten_chietkhau&access_token=${token}`,
        "GET",
      );

        await dispatch(getChietkhau(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};

