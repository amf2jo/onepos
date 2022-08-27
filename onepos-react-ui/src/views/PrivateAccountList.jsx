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
//         ...
//       </div>
//     </>
//   );
// }

// export default CommunityAccount;



import React, { useState, useEffect, useCallback } from "react";
import CommunityService from "../hooks/communityService";
import ToastMessage from "../components/ToastMessage";
import AccountService from "../hooks/accountService";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// react plugin used to create charts
const PrivateAccountList= ( {authUser} ) => {

  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [axiosError, setAxiosError] = useState("");

  // const { authUser } = props;

  useEffect(() => {
    retrieveCampaigns();
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




  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const retrieveCampaigns = () => {
    AccountService.getAllPrivate(authUser.communityId)
      .then(response => {
        setAccounts(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveCampaigns();
    setCurrentAccount(null);
    setCurrentIndex(-1);
  };
  const setActiveCampaign = (campaign, index) => {
    setCurrentAccount(campaign);
    setCurrentIndex(index);
  };
  const removeAllCampaigns = () => {
    AccountService.removeAll()
      .then(response => {
        console.log(response.data.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    AccountService.findByTitle(searchTitle)
      .then(response => {
        setAccounts(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setStatus = (status) => {
    if (status == '00')
      return (
        <p>미게시</p>
      )
    else if (status == '10')
      return (
        <p>게시됨</p>
      )
    else if (status == '11')
      return (
        <p>계좌 완료</p>
      )
    else if (status == '12')
      return (
        <p>계좌 중지</p>
      )
    else if (status == '13')
      return (
        <p>계좌 취소</p>
      )
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">개인 계좌 목록</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive >
                  <thead className="text-primary">
                    <tr>
                      <th>고유번호</th>                      
                      <th>계좌ID</th>
                      <th>계좌번호</th>
                      <th>은행명</th>                      
                      <th>잔고</th>                      
                      <th>상태</th>
                      <th className="text-right">상세보기</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((account, index) => (
                      <tr key={account.accountId}>
                        <td>{account.accountId}</td>
                        <td>{account.privateAccountId}</td>
                        <td>{account.privateAccountNumber}</td>
                        <td>{account.privateAccountBankName}</td>
                        <td>{account.privateAccountBalanceAmount}</td>
                        <td>{setStatus(account.status)}</td>
                        <td className="text-right"><Link to={"/sub-menu/private-accounts/" + account.accountId} className="badge badge-warning">
                          상세보기
                        </Link></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Link to='/sub-menu/private-accounts/AddPrivateAccount'><button className="btn-round btn btn-primary">계좌등록</button></Link>
      </div>
    </>
  );
}

export default PrivateAccountList;
