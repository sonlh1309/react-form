import { getChitiet } from "../reducers/chitiet.reducer";
import callApis from "../../utils/callApis";


export const getChitietAction = () => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `labels/ctbanle`,
        "GET",
      );
        await dispatch(getChitiet(res.data));
    } catch (err) {
      console.log(err); 
    }
  };
  return get;
};

export const getSearchchitietAction = (token , formdate, todate, dvcs,vt ,kho, pttt, ct) => {

  const get = async (dispatch) => {
    try {
        const res = await callApis(
          `api/60939744ac969b4078488026/ctbanle?t=1&cType=$and&tu_ngay=${formdate}T16%3A59%3A59.999Z&den_ngay=${todate}T16%3A59%3A59.999Z${dvcs ? `&ma_dvcs=${dvcs}` : ''}${vt ? `&ma_vt=${vt}` : ''}${kho ? `&ma_kho=${kho}` : ''}${pttt ? `&pt_thanh_toan=${pttt}` : ''}${ct ? `&ma_ct=${ct}` : ''}&access_token=${token}`,
        
          "GET",
        );
          await dispatch(getChitiet(res.data));
 
      
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};
