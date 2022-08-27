import axios from "axios";

export default axios.create({
  baseURL: "http://eztalk-gw.hrd-edu.cloudzcp.com/account-service",
  headers: {
    "Content-type": "application/json"
  }
});


//   baseURL: "http://eztalk-api.hrd-edu.cloudzcp.com/account",
// http://eztalk-gw.hrd-edu.cloudzcp.com/account-service


// export default axios.create({
//   baseURL: "http://localhost:8080",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

