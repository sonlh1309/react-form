import { getReport } from "../reducers/report.reducer";

import callApi from "../../utils/callApi";

export const getReportAction = (token) => {

  const get = async (dispatch) => {
    try {
      // const token = "7bea93a8fcd67cc86e64ab95b6fb9c57"
      const res = await callApi(
        `api/62e0b3885271e2560e8bb7d3/wlin_contract?access_token=${token}&limit=1000`,
        "GET",
      );
        await dispatch(getReport(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};



export const searchReportAction = async (token ,text, startDate, endDate) => {
  try {
    const res = await callApi(
      // gte lớn hơn hoặc bằng, lte nhỏ hơn hoặc bằng
      `api/62e0b3885271e2560e8bb7d3/wlin_contract?access_token=${token}&q={"$and":[{"date_created":{"$gte":"${startDate}"}} ,{"date_created":{"$lte":"${endDate}"}} ,{"$text":{"$search":"${text}"}}]}&limit=1000`,
      "GET",
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};


