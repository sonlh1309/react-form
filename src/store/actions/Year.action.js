import { getYear } from "../reducers/Year.reducer";
import callApis from "../../utils/callApis";


export const getYearAction = (token, fromYear, toYear) => {
  const get = async (dispatch) => {
    try {
      
      const res = await callApis(
        `api/60939744ac969b4078488026/dtbanletheonam?t=1&cType=$and&tu_nam=2022&den_nam=2023&access_token=${token}`,
        "GET"
      );
      await dispatch(getYear(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};

