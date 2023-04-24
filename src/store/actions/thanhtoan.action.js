import { getThanhtoan } from "../reducers/thanhtoan.reducer";
import callApis from "../../utils/callApis";


export const getThanhtoanAction = (token) => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `api/60939744ac969b4078488026/ptthanhtoan?t=1&q={%22status%22:true}&fields=_id,ten&access_token=${token}`,
        "GET",
      );
        await dispatch(getThanhtoan(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};


