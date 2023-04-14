import { getIncome } from "../reducers/Income.reducer";
import callApis from "../../utils/callApis";


export const getIncomeAction = (token, nam, dvcs, kho) => {
  const get = async (dispatch) => {
    try {
      
      const res = await callApis(
        `api/60939744ac969b4078488026/dtbanletheothang?t=1&cType=$and&nam=${nam}${dvcs ? `&ma_dvcs=${dvcs}` : ''}${kho ? `&ma_kho=${kho}` : ''}&access_token=${token}`,
        "GET"
      );
      await dispatch(getIncome(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};



  

 // if (res && res.data) {
      //   // lấy ra dữ liệu cuối cùng của mảng bằng hàm pop
      //   const lastData = res.data.pop();
      //   // console.log(lastData)
      //   // đưa dữ liệu vừa lấy lên đầu bằng hàm unshift
      //   res.data.unshift(lastData);
      //   // console.log(lastData)
      // await dispatch(getIncome(res.data));
      // }