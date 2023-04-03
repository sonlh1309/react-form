import { getIncome } from "../reducers/Income.reducer";
import callApis from "../../utils/callApis";


export const getIncomeAction = (token, nam) => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `api/60939744ac969b4078488026/dtbanletheothang?nam=${nam}&access_token=${token}`,
        "GET",
      );
      // lấy ra dữ liệu cuối cùng của mảng bằng hàm pop
      const lastData = res.data.pop();
      // đưa dữ liệu vừa lấy lên đầu bằng hàm unshift
      res.data.unshift(lastData);
      await dispatch(getIncome(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};



  

