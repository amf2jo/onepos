import React from 'react';
import { isEmpty } from 'lodash-es';
// reactstrap components
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

/*

AxiosError {
  code: "ERR_BAD_REQUEST"
  config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
  message: "Request failed with status code 400"
  name: "AxiosError"
  request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
  response:
    config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
    data: // api에서 에러 객체를 ResponseEntity로 보내줄 경우 data에 존재
    headers: {content-type: 'application/json'}
    request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
    status: 400
    statusText: "Bad Request"
}
*/
function WrapError (error) {

  let WrappedError = {
    style: "eztalk_alert_red",
    title : error.title,  
    name : (error.name || 'Unkonwn Error') + ' : ' + error.code,
    code : error.code,
    message : error.message,
    url : error.config.url || "", 
    method : error.config.method || "",
    status : error.response?.status + 
            " ( " + (error.response?.statusText || "NO RESPONSE") + " )",
  }
  
  if (error.response?.status == 422) { // 422 means that Server is Unprocessable
    WrappedError = {
      ...WrappedError,
      style : "eztalk_alert_info",
      status : error.response.status + 
        " (" + error.response.statusText + ")",
    };

  } 

  return WrappedError;

}

const PageError = (prop) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState({});
  const isLogin = prop.login || '0'; 

  if (isEmpty(prop.Error)) return null;

  React.useEffect(() => {

    setError(WrapError(prop.Error));
    setIsOpen(true);

  }, [prop.Error]);

  const errorDetail =  (error.data) ?  (error.data.code||'' / error.data.message||'') : '';
     
  return (
    <div className="content">
    <Card className={error.style} >
      <CardHeader>
          <CardTitle tag="h4"> {error.title} ...</CardTitle>  
      </CardHeader>
      <CardBody>
        <ul className="error-messages">
          <li>
            <h6>{error.name}</h6>
          </li>
          <hr />
          <p><b>Error Status</b> : {error.status}</p>
          <p><b>Error Message</b> : {error.message}</p>
          <p><b>Requested URL </b> : {error.url}</p>
          <p><b>Method Type</b> : {error.method}</p>
          {(errorDetail) ? ( <p><b>Error Response</b> : {errorDetail} </p>) : "" }
          </ul>
      </CardBody>
    </Card>
  </div>
  )
}

const AlertError = (prop) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [error, setError] = React.useState({});
  const isLogin = prop.login || '0'; 
  
  if (!prop.Error) return ;

  React.useEffect(() => {

    setError(WrapError(prop.Error));
    setIsOpen(true);

  }, [prop.Error]);

  function closeAlert () {
    setIsOpen (false);
    theError = "";
  }

  const errorDetail =  (error.data) ?  (error.data.code||'' / error.data.message||'') : '';

  return (
    (isOpen) ?
    <Alert className={error.style} toggle={()=> setIsOpen(false)}>
        <div className="eztalk_error_title">
          {error.title}
        </div>
        <h6> {error.name}</h6>
        <hr />
        <ul>
          {Object.entries(error).map((item, key) => {
            <li>item[0] : item[1]</li>
            })
          }
          <li> Status : {error.status} </li>
          <li> Message : {error.message} </li>
          {(error.url) ? <li> Requested Path : {error.url}</li> : ""}
          {(error.method) ? <li> Method Type : {error.method}</li> : ""}
          <hr />
          {(errorDetail) ? <li> [ {errorDetail} ]</li> : "" }
          {(error.data || '') ? <li>{error.data.message||''}</li> : ""}
        </ul>
    </Alert>
    :
    ""
  )
}

export { PageError, AlertError };
