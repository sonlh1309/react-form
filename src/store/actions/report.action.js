import { getReport } from "../reducers/report.reducer";

import callApi from "../../utils/callApi";
import callApis from "../../utils/callApis";
export const getReportAction = () => {

  const get = async (dispatch) => {
    try {
      const token = "flex.public.token"
      const res = await callApi(
        `api/62e0b3885271e2560e8bb7d3/wlin_contract?access_token=${token}`,
        "GET",
      );
        await dispatch(getReport(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};

// export const getKhoAction = () => {

//   const get = async (dispatch) => {
//     try {
//       const token = "5233108aee2aa6028dc0e1627330e87c"
//       const res = await callApis(
//         `api/60939744ac969b4078488026/dmkho?fields=ma_kho,ten_kho&access_token=${token}`,
//         "GET",
//       );
//       console.log(res.data)
//         await dispatch(getKho(res.data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return get;
// };

export const searchReportAction = async (text, startDate, endDate) => {
  try {
    const res = await callApi(
      // gte lớn hơn hoặc bằng, lte nhỏ hơn hoặc bằng
      `api/62e0b3885271e2560e8bb7d3/wlin_contract?access_token=flex.public.token&q={"$and":[{"date_created":{"$gte":"${startDate}"}} ,{"date_created":{"$lte":"${endDate}"}} ,{"$text":{"$search":"${text}"}}]}&limit=1000`,
      "GET",
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};


