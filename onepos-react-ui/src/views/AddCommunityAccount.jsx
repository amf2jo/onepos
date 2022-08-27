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

const AddCommunityAccount= ( {authUser} ) => {
  const navigate = useNavigate();
  const [axiosError, setAxiosError] = useState("");
  const initialAccountState = {
    accountId: null, 
    publicAccountId: "", 
    publicAccountNumber:"",
    publicAccountName: "", 
    publicAccountBankId: "", 
    publicAccountBankName: "", 
    publicAccountBalanceAmount: "", 
    publicAccountUserName: "", 
    communityId: "",
    publicAccountDesc: "",
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







  // const [campaign, setCampaign] = useState(initialCampaignState);
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
      publicAccountId: account.publicAccountId, 
      publicAccountNumber: account.publicAccountNumber, 
      publicAccountName: account.publicAccountName, 
      publicAccountBankId: account.publicAccountBankId, 
      publicAccountBankName: account.publicAccountBankName, 
      publicAccountBalanceAmount: account.publicAccountBalanceAmount, 
      publicAccountUserName: account.publicAccountUserName, 
      // communityId: account.communityId,
      communityId: authUser.communityId,
      publicAccountDesc: account.publicAccountDesc,
      status: account.status      
    };

    AccountService.create(data)
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
                <CardTitle tag="h5">커뮤니티 계좌 등록</CardTitle>
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
                      <Input type="text" name="publicAccountId" required placeholder="계좌ID를 입력해주세요." value={account.publicAccountId} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>계좌번호</label>
                      <Input type="text" name="publicAccountNumber" required placeholder="계좌번호를 입력해주세요." value={account.publicAccountNumber} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>계좌명</label>
                      <Input type="text" name="publicAccountName" required placeholder="계좌명을 입력해주세요." value={account.publicAccountName} onChange={handleInputChange} />
                      </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pl-1" md="5">
                    <FormGroup>
                      <label>은행ID</label>
                      <Input type="text" name="publicAccountBankId" required placeholder="은행ID를 입력해주세요." value={account.publicAccountBankId} onChange={handleInputChange} />
                      </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>은행명</label>
                      <Input type="text" name="publicAccountBankName" required placeholder="은행명을 입력해주세요." value={account.publicAccountBankName} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>잔고</label>
                      <Input type="text" name="publicAccountBalanceAmount" required placeholder="잔고를 입력해주세요." value={account.publicAccountBalanceAmount} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>고객명</label>
                      <Input type="text" name="publicAccountUserName" required placeholder="고객명을 입력해주세요." value={account.publicAccountUserName} onChange={handleInputChange} />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>커뮤니티ID</label>
                      <Input type="text" name="communityId" required placeholder="커뮤니티ID를 입력해주세요." value={authUser.communityId} onChange={handleInputChange} />
                      {/* <Input type="text" name="communityId" required placeholder="communityId" value={account.communityId} onChange={handleInputChange} /> */}
                    </FormGroup>
                  </Col>
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
                      <label>커뮤니티 계좌 설명</label>
                      <Input type="textarea" name="publicAccountDesc" required placeholder="커뮤니티 계좌 설명을 입력해주세요." value={account.publicAccountDesc} onChange={handleInputChange} />
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
                    >커뮤니티 계좌 등록
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

export default AddCommunityAccount;

