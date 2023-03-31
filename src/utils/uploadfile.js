// import axios from "axios";

// export default function uploadFile(endpoint, data) {
//   return axios({
//     method: "post",
//     url: `https://api.wlin.com.vn/${endpoint}`,
//     data: data,
//     headers: { "Content-Type": "multipart/form-data" },
//   })
//     .then((response) => {
//       let text =
//         typeof response.data == "strings"
//           ? JSON.stringify(response.data)
//           : response.data;
//       return text;
//     })
//     .catch((e) => {
//       let error = (e.response ? e.response.data : e) || e;
//       console.error("Error get data:", error);
//       console.log(error);
//       return error;
//     });
// }
