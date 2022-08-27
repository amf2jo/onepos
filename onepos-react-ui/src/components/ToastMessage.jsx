

import React, { useState, useEffect, useCallback } from "react";
import  { 
  ToastContainer,
  Toast,
  ToastHeader,
  ToastBody
} from "react-bootstrap";

const ToastMessage = ({message, setMessage}) => {
  const [openToast, setOpenToast] = useState(true);

  const closeToast = () => {
    setOpenToast(false);
    setMessage("");
  }
  return (
    <ToastContainer position="bottom-end" className="eztalk_toast">
      <Toast show={openToast} 
             onClose={closeToast}
             delay={3000} autohide="true" animation={true}>
        <Toast.Header closeButton={false} >
          <strong>You have message :</strong>
        </Toast.Header>
        <Toast.Body>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default ToastMessage;
