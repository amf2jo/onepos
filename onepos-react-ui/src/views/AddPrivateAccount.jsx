import React, { useState, useEffect, useCallback } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { useNavigate } from 'react-router-dom';
import AccountService from "../hooks/accountService";
import CommunityService from "../hooks/communityService";
import moment from 'moment';

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

const AddPrivateAccount= ( {authUser} ) => {
  const navigate = useNavigate();
  const [axiosError, setAxiosError] = useState("");
  const initialAccountState = {
    accountId: null, 
    privateAccountId: "", 
    privateAccountNumber:"",
    privateAccountName: "", 
    privateAccountBankId: "", 
    privateAccountBankName: "", 
    privateAccountUserName: "", 
    privateAccountBalanceAmount: "", 
    privateAccountIncomeAmount: "", 
    communityId: "", 
    privateAccountDesc: "", 
    status: ""    
  };

  useEffect(() => {    
    getCommunityMembers();
  }, [authUser.communityId]);
  
  const getCommunityMembers = useCallback (() => {
    if (!authUser.communityId) return;

    CommunityService.getMembers(authUser.communityId)
      .then(response => {
        console.log("CONSOLE_LOG authUser.communityId ::: ", authUser.communityId);
        // setCmmtMembers(response.data.data);
        // console.log("my community", response.data.data);
      })
      .catch(e => {
        console.log("getCommunityMembers Error", e);
        setAxiosError({...e});
      });
  }, [authUser.communityId]);


  const [account, setAccount] = useState(initialAccountState);
  const [submitted, setSubmitted] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handleInputChange = (event) => {
    console.log("event : " + event.target);
    const { name, value } = event.target;
    console.log("name : " + name);
    console.log("value : " + value);

    if(name == 'startDate') {
      setStartDate(value);
    }
    else if (name == 'endDate') {
      setEndDate(value);
    }

    setAccount({ ...account, [name]: value });
  };

  const saveAccount = () => {
    var data = {
      accountId: account.accountId, 
      privateAccountId: account.privateAccountId, 
      privateAccountNumber: account.privateAccountNumber, 
      privateAccountName: account.privateAccountName, 
      privateAccountBankId: account.privateAccountBankId, 
      privateAccountBankName: account.privateAccountBankName, 
      privateAccountUserName: account.privateAccountUserName, 
      privateAccountBalanceAmount: account.privateAccountBalanceAmount, 
      privateAccountIncomeAmount: account.privateAccountIncomeAmount, 
      // communityId: account.communityId, 
      communityId: authUser.communityId,
      privateAccountDesc: account.privateAccountDesc, 
      status: account.status      
    };

    AccountService.createPrivate(data)
      .then(response => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newAccount = () => {
    setAccount(initialAccountState);
    setSubmitted(false);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="10">
            <Card className="account-form">
              <CardHeader>
                <CardTitle tag="h5">개인 계좌 등록</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-1" md="10">
                    <FormGroup>
                      {/* <label>고유번호</label>                  
                        <Input type="text" name="accountId" required placeholder="accountId" value={account.accountId} onChange={handleInputChange} /> */}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="10">
                    <FormGroup>
                      <label>계좌ID</label>                      
                      <Input type="text" name="privateAccountId" required placeholder="계좌ID를 입력해주세요." value={account.privateAccountId} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>계좌번호</label>
                      <Input type="text" name="privateAccountNumber" required placeholder="계좌번호를 입력해주세요." value={account.privateAccountNumber} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>계좌명</label>
                      <Input type="text" name="privateAccountName" required placeholder="계좌명을 입력해주세요." value={account.privateAccountName} onChange={handleInputChange} />
                      </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>은행ID</label>
                      <Input type="text" name="privateAccountBankId" required placeholder="은행ID를 입력해주세요." value={account.privateAccountBankId} onChange={handleInputChange} />
                      </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>은행명</label>
                      <Input type="text" name="privateAccountBankName" required placeholder="은행명을 입력해주세요." value={account.privateAccountBankName} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>잔고</label>
                      <Input type="text" name="privateAccountBalanceAmount" required placeholder="잔고를 입력해주세요." value={account.privateAccountBalanceAmount} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>이체금액</label>
                      <Input type="text" name="privateAccountIncomeAmount" required placeholder="이체금액을 입력해주세요." value={account.privateAccountIncomeAmount} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>고객명</label>
                      <Input type="text" name="privateAccountUserName" required placeholder="고객명을 입력해주세요." value={account.privateAccountUserName} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>커뮤니티ID</label>
                      <Input type="text" name="communityId" required placeholder="커뮤니티ID를 입력해주세요." value={authUser.communityId} onChange={handleInputChange} />
                      {/* <Input type="text" name="communityId" required placeholder="communityId" value={account.communityId} onChange={handleInputChange} /> */}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>상태</label>
                      <Input type="text" name="status" required placeholder="상태를 입력해주세요." value={account.status} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>                  
                </Row>
                <Row>
                  <Col className="pr-1" md="10">
                    <FormGroup>
                      <label>개인 계좌 설명</label>
                      <Input type="textarea" name="privateAccountDesc" required placeholder="개인 계좌 설명을 입력해주세요." value={account.privateAccountDesc} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>               
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button
                      className="btn-round"
                      color="primary"
                      type="button"
                      onClick={saveAccount}
                    >개인 계좌 등록
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

export default AddPrivateAccount;

