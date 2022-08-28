import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { useNavigate } from 'react-router-dom';
import CampaignService from '../hooks/campaignService';
import moment from 'moment';
import { PageError, AlertError } from "../components/ProcessError";

// reactstrap components
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
} from "reactstrap";

function AddCampaign(props) {
  const navigate = useNavigate();
  const initialCampaignState = {
    campaignId: null,
    campaignTitle: "",
    campaignDesc: "",
    startDate: "",
    endDate: "",
    targetAmount: "",
    leastPayAmount: "",
    managerEmail: "",
    ownerEmail: "",
    communityId: ""
  };

  const [campaign, setCampaign] = useState(initialCampaignState);
  const [submitted, setSubmitted] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { authUser } = props;
  const [ownerEmail, setEmail] = useState();
  const [userGrade, setGrade] = useState();
  const [userCommunityId, setCommunityId] = useState();

  useEffect(() => {
    console.log(authUser);
    setEmail(authUser.email);
    setGrade(authUser.communityMemberGrade);
    setCommunityId(authUser.communityId);
  }, []);

  const handleInputChange = (event) => {
    console.log("event : " + event.target);
    const { name, value } = event.target;
    console.log("name : " + name);
    console.log("value : " + value);

    if (name == 'startDate') {
      setStartDate(value);
    }
    else if (name == 'endDate') {
      setEndDate(value);
    }

    setCampaign({ ...campaign, [name]: value });
  };

  const saveCampaign = () => {
    console.log("saveCampaign()");
    const errors = {};
    var data = {
      campaignTitle: campaign.campaignTitle,
      campaignDesc: campaign.campaignDesc,
      startDate: moment(campaign.startDate).format('YYYY-MM-DD'),
      endDate: moment(campaign.endDate).format('YYYY-MM-DD'),
      targetAmount: campaign.targetAmount,
      leastPayAmount: campaign.leastPayAmount,
      managerEmail: campaign.managerEmail,
      ownerEmail: ownerEmail,
      communityId: userCommunityId
    };
    // if(userGrade == "OWNER") {
    //   return
    // }
    if(campaign.campaignTitle == "" || campaign.campaignDesc == "" || campaign.startDate == "" || campaign.endDate == "" || campaign.targetAmount == "" || campaign.leastPayAmount == "") {
      // a
    } else {
      CampaignService.create(data)
      .then(response => {
        setSubmitted(true);
        console.log(response.data);
        navigate("/menu/campaigns");
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  const newCampaign = () => {
    setCampaign(initialCampaignState);
    setSubmitted(false);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="10">
            <Card className="campaign-form">
              <CardHeader>
                <CardTitle tag="h5">캠페인 등록</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-1" md="10">
                    <FormGroup>
                      <label>캠페인명</label>
                      <Input type="text" name="campaignTitle" autoComplete="off" required placeholder="캠페인 이름을 입력해 주세요." value={campaign.campaignTitle}
                        onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="10">
                    <FormGroup>
                      <label>캠페인 내용</label>
                      <Input type="textarea" name="campaignDesc" autoComplete="off" required placeholder="캠페인에 대한 상세한 설명을 입력해 주세요." value={campaign.campaignDesc} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>캠페인 시작일자</label>
                      <DatePicker
                        name="startDate"
                        type="date"
                        dateFormat="yyyy-MM-dd"
                        locale={ko}
                        selected={startDate}
                        autoComplete="off"
                        onChange={date => handleInputChange({ target: { value: date, name: 'startDate' } })} />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>캠페인 종료일자</label>
                      <DatePicker
                        name="endDate"
                        type="date"
                        dateFormat="yyyy-MM-dd"
                        locale={ko}
                        selected={endDate}
                        autoComplete="off"
                        onChange={date => handleInputChange({ target: { value: date, name: 'endDate' } })} />

                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>목표금액</label>
                      <Input type="number" name="targetAmount" autoComplete="off" placeholder="캠페인 목표 총 금액" value={campaign.targetAmount} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>최소 납부금액</label>
                      <Input type="number" name="leastPayAmount" autoComplete="off" placeholder="인당 최소 납부금액" value={campaign.leastPayAmount} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>총무 ID</label>
                      <Input type="text" name="managerEmail" placeholder="aaaaa" value={campaign.managerEmail} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>대표 ID</label>
                      <Input type="text" name="ownerEmail" placeholder="aaaaa" value={campaign.ownerEmail} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row> */}
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button
                      className="btn-round"
                      color="primary"
                      type="button"
                      onClick={saveCampaign}
                    >캠페인 등록
                    </Button>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddCampaign;

