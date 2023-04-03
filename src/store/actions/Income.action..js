import { getIncome } from "../reducers/Income.reducer";
import callApis from "../../utils/callApis";


export const getIncomeAction = (token, nam) => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `api/60939744ac969b4078488026/dtbanletheothang?nam=${nam}&access_token=${token}`,
        "GET",
      );
      await dispatch(getIncome(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};

// export const searchIncomeAction = async (nam) => {
//   try {
//     const res = await callApis(
//       // gte lớn hơn hoặc bằng, lte nhỏ hơn hoặc bằng
//       `api/60939744ac969b4078488026/dtbanletheothang?nam=${nam}&access_token=dfc7bc8e19751c1d7ae3c668cda7f5c6`,
//       "GET",
//     );
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// };


  

