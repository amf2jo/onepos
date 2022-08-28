// import axios from 'axios';
import axios from "axios";
import jwt_decode from "jwt-decode";

const mode = import.meta.env.VITE_RUN_ENV || "dev";
const baseUrl = mode === 'dev' ? 'http://localhost:8081' :
                mode === 'local' ? 'http://localhost:8000' :
                          serviceName ;

// console.log ("baseUrl : ", baseUrl);

const useAxios = (service) => {
    // token 설정
  setHeaders(axios.defaults.headers);

  if (baseUrl.indexOf("local:") >= 0 && baseUrl.indexOf("8000") < 0 )
    axios.defaults.baseURL = baseUrl;
  else
    axios.defaults.baseURL = baseUrl + ((service) ? "/" + service : "");

  // cors 처리를 위한 설정
  axios.defaults.withCredentials = false;

  axios.defaults.headers['X-Custom-Header'] = 'onepos';
  axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers['Access-Control-Allow-Headers'] = "Origin, Content-Type, X-Auth-Token, Authorization, Accept, charset, boundary, Content-Length";

    // console.log("axios got ready in ", service);
  const http = axios.create();
  return {
        http,
        setHeaders
      }

}

const setHeaders = (headers) => {
    // token 설정
    const jwt = window.localStorage.getItem('Bearer Token');
    headers.Authorization = `Bearer ${jwt}`;

    // userId 설정
    headers['userId'] = getUserId(jwt);
}

const getUserId = (jwt) => {
  if (!jwt) return "";
  const decoded = jwt_decode(jwt);
  return decoded.userId;
}

export default useAxios;
