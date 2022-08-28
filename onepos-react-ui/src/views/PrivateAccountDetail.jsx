/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import React from "react";
// // react plugin used to create charts

// function CommunityAccount() {
//   return (
//     <>
//       <div className="content">
//         ...detail
//       </div>
//     </>
//   );
// }

// export default CommunityAccount;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
// import CampaignService from "../hooks/campaignService";
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
} from "reactstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import moment from 'moment';



// react plugin used to create charts
function PrivateAccountDetail(props) {

  const { id } = useParams();

  let navigate = useNavigate();
  const initialAccountState = {
    accountId: null,
    privateAccountId: "",
    privateAccountNumber: "",
    privateAccountName: "",
    privateAccountBankId: "",
    privateAccountBankName: "",
    privateAccountUserName: "",
    privateAccountBalanceAmount: "",
    privateAccountIncomeAmount: "", 
    communityId: "", 
    privateAccountDesc: "",
    status: ""

    // campaignId: null,
    // campaignTitle: "",
    // campaignDesc: "",
    // startDate: "",
    // endDate: "",
    // targetAmount: "",
    // leastPayAmount: "",
    // accountStaffId: "",
    // representativeId: "",
    // status: ""
  };

  const [currentAccount, setCurrentAccount] = useState(initialAccountState);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [disabled, setDisabled] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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

    setCurrentAccount({ ...currentAccount, [name]: value });
  };

  const getAccount = id => {
    AccountService.getPrivate(id)
      .then(response => {
        setCurrentAccount(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (id)
    getAccount(id);
  }, [id]);

  const updateAccount = () => {
    // currentAccount.startDate = moment(currentAccount.startDate).format('YYYY-MM-DD');
    // currentAccount.endDate = moment(currentAccount.endDate).format('YYYY-MM-DD');

    AccountService.updatePrivate(currentAccount.accountId, currentAccount)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteAccount = () => {
    AccountService.removePrivate(currentAccount.accountId)
      .then(response => {
        console.log(response.data.data);
        // navigate("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };


  const transferAccount = () => {
    AccountService.transferAccount(currentAccount.accountId, currentAccount)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };


  // const approveCampaign = () => {
  //   CampaignService.approve(currentCampaign.campaignId)
  //     .then(response => {
  //       console.log(response.data.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const stopCampaign = () => {
  //   CampaignService.stop(currentCampaign.campaignId)
  //     .then(response => {
  //       console.log(response.data.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const cancelCampaign = () => {
  //   CampaignService.cancel(currentCampaign.campaignId)
  //     .then(response => {
  //       console.log(response.data.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const changeUpdateForm = () => {
  //   setDisabled(!disabled);
  // }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="10">
            <Card className="account-form">
              <CardHeader>
                <CardTitle tag="h5">개인 계좌 상세</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-1" md="10">
                    <FormGroup>
                      <label>고유번호</label>
                        <Input type="text" disabled={disabled} name="accountId" required placeholder="accountId" value={currentAccount.accountId} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="10">
                    <FormGroup>
                      <label>계좌ID</label>
                      <Input type="text" name="privateAccountId" required placeholder="계좌ID를 입력해주세요. " value={currentAccount.privateAccountId} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>계좌번호</label>
                      <Input type="text" name="privateAccountNumber" required placeholder="계좌번호를 입력해주세요. " value={currentAccount.privateAccountNumber} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>계좌명</label>
                      <Input type="text" name="privateAccountName" required placeholder="계좌명을 입력해주세요. " value={currentAccount.privateAccountName} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>은행ID</label>
                      <Input type="text" name="privateAccountBankId" required placeholder="은행ID를 입력해주세요. " value={currentAccount.privateAccountBankId} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>은행명</label>
                      <Input type="text" name="privateAccountBankName" required placeholder="은행명을 입력해주세요. " value={currentAccount.privateAccountBankName} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>잔고</label>
                      <Input type="text" name="privateAccountBalanceAmount" required placeholder="잔고를 입력해주세요. " value={currentAccount.privateAccountBalanceAmount} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>이체금액</label>
                      <Input type="text" name="privateAccountIncomeAmount" required placeholder="이체금액을 입력해주세요. " value={currentAccount.privateAccountIncomeAmount} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>고객명</label>
                      <Input type="text" name="privateAccountUserName" required placeholder="고객명을 입력해주세요. " value={currentAccount.privateAccountUserName} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>커뮤니티ID</label>
                      <Input type="text" name="communityId" required placeholder="커뮤니티ID를 입력해주세요. " value={currentAccount.communityId} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>상태</label>
                      <Input type="text" name="status" required placeholder="상태를 입력해주세요. " value={currentAccount.status} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>                  
                </Row>
                <Row>
                  <Col className="pr-1" md="10">
                    <FormGroup>
                      <label>개인 계좌 설명</label>
                      <Input type="textarea" name="privateAccountDesc" required placeholder="개인 계좌 설명을 입력해주세요. " value={currentAccount.privateAccountDesc} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>               
                </Row>

                {/* <Row>
                <div className="update ml-auto mr-auto">
                  <Button className="btn-round" color="primary" type="button" onClick={deleteAccount}>커뮤니티 계좌 삭제</Button>
                  <Button className="btn-round" color="primary" type="button" onClick={updateAccount}>수정완료</Button>
                </div>
                </Row> */}

                <Row>
                  <div className="update ml-auto mr-auto">
                    {(() => {
                      // if (currentAccount.status == '00' && disabled) {
                      if (currentAccount.status == '00' || true) {
                        return (
                          <p>
                            {/* <Button className="btn-round" color="primary" type="button" onClick={changeUpdateForm}>커뮤니티 계좌 수정</Button> */}
                            <Button className="btn-round" color="primary" type="button" onClick={deleteAccount}>개인 계좌 삭제</Button>
                            <Button className="btn-round" color="primary" type="button" onClick={updateAccount}>업데이트 완료</Button>
                            <Button className="btn-round" color="primary" type="button" onClick={transferAccount}>계좌 이체</Button>
                            {/* <Button className="btn-round" color="primary" type="button" onClick={approveCampaign}>커뮤니티 계좌 승인</Button> */}
                          </p>
                        )
                      }
                      // else if (!disabled) {
                      //   return (
                      //     <p>
                      //       <Button className="btn-round" color="primary" type="button" onClick={updateCampaign}>수정완료</Button>
                      //     </p>
                      //   )
                      // }
                      // else if (currentAccount.status == '10' && disabled) {
                      //   return (
                      //     <p>
                      //       {/* <Button className="btn-round" color="primary" type="button" onClick={stopCampaign}>커뮤니티 계좌 중지</Button>
                      //       <Button className="btn-round" color="primary" type="button" onClick={cancelCampaign}>커뮤니티 계좌 취소</Button> */}
                      //     </p>
                      //   )
                      // }
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

export default PrivateAccountDetail;
