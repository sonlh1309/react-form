import { getDonvi } from "../reducers/donvi.reducer";
import callApis from "../../utils/callApis";


export const getDonviAction = (token) => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `api/60939744ac969b4078488026/dvcs?t=1&q={%22status%22:true}&fields=_id,ten_dvcs&access_token=${token}`,
        "GET",
      );
        await dispatch(getDonvi(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};


