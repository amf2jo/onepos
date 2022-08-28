import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import NoticeService from "../hooks/noticeService";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import moment from 'moment';

// react plugin used to create charts
function Notice(props) {

  const { id } = useParams();

  let navigate = useNavigate();
  const initialNoticeState = {
    noticeId: null,
    noticeTitle: "",
    noticeDesc: "",
    createdId: "",
    modifiedId: "",
    createdDate: "",
    modifiedDate: ""
  };

  const [currentNotice, setCurrentNotice] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCurrentNotice({ ...currentNotice, [name]: value });
  };

  const getNotice = id => {
    NoticeService.get(id)
      .then(response => {
        setCurrentNotice(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (id)
      getNotice(id);
  }, [id]);


  const changeUpdateForm = () => {
    setDisabled(!disabled);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="10">
            <Card className="campaign-form">
              <CardHeader>
                <CardTitle tag="h5">공지사항</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-1" md="10">
                    <FormGroup>
                    <p className="blockquote blockquote-primary" >
                        {currentNotice.noticeTitle}
                        <br></br>
                        {currentNotice.noticeDesc}
                      </p>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Notice;
