// import axios from "axios";

// export default function Import(
//   id_app,
//   ma_code,
//   data = { name: "xlsx" },
//   token,
//   props,
// ) {
//   return axios({
//     method: "post",
//     url: `https://api.wlin.com.vn/api/${id_app}/${ma_code}/import/excel?update=false&access_token=${token}`,
//     data: data,
//     headers: { "Content-Type": "multipart/form-data" },
//   })
//     .then((response) => {
//       console.log(response.data);
//       let text =
//         typeof response.data == "strings"
//           ? JSON.stringify(response.data)
//           : response.data;

//       props.setModalShow(false);
//       return text;
//     })
//     .catch((e) => {
//       let error = (e.response ? e.response.data : e) || e;
//       console.error("Có lỗi import:", error);
//       console.log(error);
//       return error;
//     });
// }
