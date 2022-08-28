import axios from "axios";

export default axios.create({
  baseURL: "http://eztalk-gw.hrd-edu.cloudzcp.com/notice-service",
  headers: {
    "Content-type": "application/json"
  }
});


// export default axios.create({
//   baseURL: "http://localhost:8083",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

