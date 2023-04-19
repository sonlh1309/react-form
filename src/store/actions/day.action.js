import { getDay } from "../reducers/day.reducer";
import callApis from "../../utils/callApis";


export const getDayAction = (token ,fromDate, toDate, dvcs, kho) => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `api/60939744ac969b4078488026/dtbanletheongay?t=1&cType=$and&tu_ngay=${fromDate}T16%3A59%3A59.999Z&den_ngay=${toDate}T16%3A59%3A59.999Z${dvcs ? `&ma_dvcs=${dvcs}` : ''}${kho ? `&ma_kho=${kho}` : ''}&access_token=${token}`,
        "GET",
      );
        await dispatch(getDay(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};


