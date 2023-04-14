import { getDay } from "../reducers/day.reducer";
import callApis from "../../utils/callApis";


export const getDayAction = (token ,fromDate, toDate) => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `api/60939744ac969b4078488026/dtbanletheongay?t=1&tu_ngay=${fromDate}&den_ngay=${toDate}&cType=$and&access_token=${token}`,
        "GET",
      );
        await dispatch(getDay(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};


