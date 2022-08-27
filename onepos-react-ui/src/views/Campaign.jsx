
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CampaignService from "../hooks/campaignService";
import AccountService from "../hooks/accountService";
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
  Progress,
  CardSubtitle
} from "reactstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import moment from 'moment';
import { Container, Header, Message, Segment } from "semantic-ui-react";

// react plugin used to create charts
function Campaign(props) {

  const {authUser} = props;

  const { id } = useParams();

  let navigate = useNavigate();
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
    status: ""
  };

  const [currentCampaign, setCurrentCampaign] = useState(initialCampaignState);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [disabled, setDisabled] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [sumAmount, setSumAmount] = useState();
  const [sumPercent, setSumPercent] = useState();

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

    setCurrentCampaign({ ...currentCampaign, [name]: value });
  };

  const getCampaign = id => {
    CampaignService.get(id)
      .then(response => {
        setCurrentCampaign(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (id)
      getCampaign(id);
  }, [id]);

  const updateCampaign = () => {
    currentCampaign.startDate = moment(currentCampaign.startDate).format('YYYY-MM-DD');
    currentCampaign.endDate = moment(currentCampaign.endDate).format('YYYY-MM-DD');

    CampaignService.update(currentCampaign.campaignId, currentCampaign)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
        navigate("/menu/campaigns");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const deleteCampaign = () => {
    CampaignService.remove(currentCampaign.campaignId)
      .then(response => {
        console.log(response.data.data);
        navigate("/menu/campaigns");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const approveCampaign = () => {
    CampaignService.approve(currentCampaign.campaignId)
      .then(response => {
        console.log(response.data.data);
        navigate("/menu/campaigns");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const stopCampaign = () => {
    CampaignService.stop(currentCampaign.campaignId)
      .then(response => {
        console.log(response.data.data);
        navigate("/menu/campaigns");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const cancelCampaign = () => {
    CampaignService.cancel(currentCampaign.campaignId)
      .then(response => {
        console.log(response.data.data);
        navigate("/menu/campaigns");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getSumAmountByCommunityId = () => {
    AccountService.getSumAccountByCommunityId(authUser.communityId)
    .then(response => {
      setSumAmount(response.data.data.publicAccountBalanceAmount);
      console.log(response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  const changeUpdateForm = () => {
    setDisabled(!disabled);
  }

  function getAmountPercent() {
    {getSumAmountByCommunityId()};
    console.log(sumAmount);
    return (
      //      ((100 * (7000000 / currentCampaign.targetAmount)).toString().split('.')[0]))
      ((100 * (sumAmount / currentCampaign.targetAmount)).toString().split('.')[0]))
  }

  if (currentCampaign.status == '10') {
    return (
      <>
        <div className="content" style={{padding: 30}}>
          <Container >
            <Row>
              <Card>
                <CardBody>
                  <CardTitle className="pl-100" tag="h5" style={{padding: 20}}>
                    {currentCampaign.campaignTitle} 캠페인

                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6" style={{padding: 20}}>
                    {currentCampaign.campaignDesc}
                  </CardSubtitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6" style={{padding: 20}}>
                    캠페인 기간 : {currentCampaign.startDate} ~ {currentCampaign.endDate}
                  </CardSubtitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6" style={{padding: 20}}>
                    입금총액 : {sumAmount}원
                  </CardSubtitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6" style={{padding: 20}}>
                    목표금액({currentCampaign.targetAmount}) 대비 {getAmountPercent()}% 진행 중
                  </CardSubtitle>
                  <Progress animated value={getAmountPercent()} />
                </CardBody>

                {/* <Container style={{ margin: 20 }}>
                <Header as='h2' textAlign='center'>
                  <Header.Content>{currentCampaign.campaignTitle} 캠페인</Header.Content>
                </Header>
                <Header as='h4' color='grey'>캠페인 기간 : {currentCampaign.startDate} ~ {currentCampaign.endDate}</Header>
                <Header as='h4' color='grey'>입금총액 : {getAmountPercent()}원</Header>
                <Header as='h4' color='grey'>총 입금 건수 : </Header>
                <Header as='h4' color='grey' >목표금액({currentCampaign.targetAmount}) 대비 {getAmountPercent()}% 진행 중</Header>
                <Progress animated value={getAmountPercent()} />
              </Container> */}

              </Card>
            </Row>
          </Container>
        </div>
      </>
    )
  }
  else {
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
                        <Input type="text" disabled={disabled} name="campaignTitle" required placeholder="aaaaa" value={currentCampaign.campaignTitle}
                          onChange={handleInputChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <FormGroup>
                        <label>캠페인 내용</label>
                        <Input type="textarea" disabled={disabled} name="campaignDesc" required placeholder="aaaaa" value={currentCampaign.campaignDesc} onChange={handleInputChange} />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="5">
                      <FormGroup>
                        <label>캠페인 시작일자</label>
                        <DatePicker
                          disabled={disabled}
                          name="startDate"
                          type="date"
                          dateFormat="yyyy-MM-dd"
                          locale={ko}
                          selected={startDate}
                          onChange={date => handleInputChange({ target: { value: date, name: 'startDate' } })} />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="5">
                      <FormGroup>
                        <label>캠페인 종료일자</label>
                        <DatePicker
                          disabled={disabled}
                          name="endDate"
                          type="date"
                          dateFormat="yyyy-MM-dd"
                          locale={ko}
                          selected={endDate}
                          onChange={date => handleInputChange({ target: { value: date, name: 'endDate' } })} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="5">
                      <FormGroup>
                        <label>목표금액</label>
                        <Input type="number" disabled={disabled} name="targetAmount" placeholder="aaaaa" value={currentCampaign.targetAmount} onChange={handleInputChange} />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>최소 납부금액</label>
                        <Input type="number" disabled={disabled} name="leastPayAmount" placeholder="aaaaa" value={currentCampaign.leastPayAmount} onChange={handleInputChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>총무 ID</label>
                        <Input type="text" disabled={disabled} name="managerEmail" placeholder="aaaaa" value={currentCampaign.managerEmail} onChange={handleInputChange} />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>대표 ID</label>
                        <Input type="text" disabled={disabled} name="ownerEmail" placeholder="aaaaa" value={currentCampaign.ownerEmail} onChange={handleInputChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      {(() => {
                        if (currentCampaign.status == '00' && disabled) {
                          return (
                            <p>
                              <Button className="btn-round" color="primary" type="button" onClick={changeUpdateForm}>캠페인 수정</Button>
                              <Button className="btn-round" color="primary" type="button" onClick={deleteCampaign}>캠페인 삭제</Button>
                              <Button className="btn-round" color="primary" type="button" onClick={approveCampaign}>캠페인 승인</Button>
                            </p>
                          )
                        }
                        else if (!disabled) {
                          return (
                            <p> <Button className="btn-round" color="primary" type="button" onClick={updateCampaign}>수정완료</Button>
                            </p>
                          )
                        }
                        else if (currentCampaign.status == '10' && disabled) {
                          return (
                            <p>
                              <Button className="btn-round" color="primary" type="button" onClick={stopCampaign}>캠페인 중지</Button>
                              <Button className="btn-round" color="primary" type="button" onClick={cancelCampaign}>캠페인 취소</Button>
                            </p>
                          )
                        }
                      })()}
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
}

export default Campaign;
