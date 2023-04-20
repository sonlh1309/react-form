import { getQuy } from "../reducers/Quy.reducer";
import callApis from "../../utils/callApis";



export const getQuyAction = (token, nam, dvcs, kho) => {
  const get = async (dispatch) => {
    try {
      if (nam) {
        const res = await callApis(
          `api/60939744ac969b4078488026/dtbanletheoquy?t=1&cType=$and&nam=${nam}${dvcs ? `&ma_dvcs=${dvcs}` : ''}${kho ? `&ma_kho=${kho}` : ''}&access_token=${token}`,
          "GET"
        );
        await dispatch(getQuy(res.data));
      }

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



  

 // if (res && res.data) {
      //   // lấy ra dữ liệu cuối cùng của mảng bằng hàm pop
      //   const lastData = res.data.pop();
      //   // console.log(lastData)
      //   // đưa dữ liệu vừa lấy lên đầu bằng hàm unshift
      //   res.data.unshift(lastData);
      //   // console.log(lastData)
      // await dispatch(getIncome(res.data));
      // }