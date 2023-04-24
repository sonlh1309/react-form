import { getGroup } from "../reducers/group.reducer";
import callApis from "../../utils/callApis";


export const getgroupAction = (token) => {

  const get = async (dispatch) => {
    try {
      const res = await callApis(
        `pi/60939744ac969b4078488026/group?t=1&q={%22status%22:true,%22group_type%22:%22TABLE%22}&fields=_id,group_name&access_token=${token}`,
        "GET",
      );

        await dispatch(getGroup(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return get;
};

