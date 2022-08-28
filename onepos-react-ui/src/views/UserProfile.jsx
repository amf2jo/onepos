
import React from "react";
import { useRef, useState, useEffect, useCallback } from 'react';
import userService from "../hooks/userService";
import useAuth from "../hooks/useAuth";
import Postcode from "../components/PostCode";
import BankAccount from "../components/AuthBankAccount";
import { AlertError } from "../components/ProcessError";
import { trim, isEqual } from "lodash-es";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import ToastMessage from "../components/ToastMessage";

function pickBgImage (username) {
  // Compute hash code
  let hash = 7;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + (hash << 5) - hash;
  }
  // Calculate color
  const index = Math.abs(hash % 9) + 1;
  return "/img/bg" + index + ".png";
}

const UserProfile = ({authUser}) => {
  const inputUsername = useRef();
  const inputExtra = useRef();
  const [refresh, setRefresh] = useState(0);
  const [axiosError, setAxiosError] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [userDetails, setUserDetails] = useState( 
    { userId : '', username: '', email: '', homeAddress:'', accountId:'', intro: '' } ); 

  const [openPost, setOpenPost] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
 
  
  useEffect(() => {
    getUserProfile(authUser.userId);
  }, [authUser.userId, refresh]);

  const getUserProfile = useCallback(() => {
    if (! authUser.userId || '') return;
    // console.log("getUserProfile");
    userService.getDetail(authUser.userId)
      .then(response => {
        setUserInfo(response.data.data);
        setUserDetails(userDetails => response.data.data);
        // setAddress(address => response.data.data.homeAddress);
        // console.log(response.data.data);
      })
      .catch(e => {
        console.log("getUserProfile Error", e);
        setAxiosError({...e});
      });
    
  }, [authUser]);

  const addressClick = useCallback(() => {
    setOpenPost(true);
    event.preventDefault();
    return false;
  }, [authUser]);

  const updateUserInfo = useCallback((event) => {
    console.log("userDetails.username" , userDetails.username, userDetails.homeAddress);
    if (!trim(userDetails.username)) {
      alert("사용자명은 필수입니다.");
      inputUsername.current?.focus();
      return;
    }
    else if (userDetails.homeAddress.zipcode && 
            !trim(userDetails.homeAddress.extra)) {
      alert("상세 주소를 입력해주세요.");
      inputExtra.current?.focus();
      return;
    }
    
    if (!confirm("회원 정보를 업데이트하시겠습니까?")) return;

    userService.updateDetail(authUser.userId, userDetails)
    .then(response => {
      // alert("회원 정보가 업데이트 되었습니다.");
      setRefresh(refresh => refresh+1);
      setToastMessage("회원 정보가 업데이트 되었습니다.");
      // console.log(response.data.data);
    })
    .catch(e => {
      console.log("getUserProfile Error", e);
      setAxiosError({...e});
    });
  }, [userDetails, userDetails.homeAddress]);

  const changeAddress = useCallback((zipcode, street, extra) => {
    const newAddr = {
      zipcode,
      street,
      extra
    }
    // setAddress(newAddr);
    setUserDetails({...userDetails, homeAddress: newAddr});
    
  }, [authUser, userDetails]);

  const checkZipcode =useCallback((e) => {
    const address = userDetails.homeAddress;

    if (!address.zipcode) {
      alert("우편번호를 먼저 입력해 주세요.");
      return 
    }
    const newAddr = {...address, extra : e.target.value };
    setUserDetails({...userDetails, homeAddress: newAddr});

  }, [userDetails]);

  const setAddressFocus = useCallback(() => {
    console.log("here", inputExtra.current)
    inputExtra.current?.focus();
  }, [])

  return (
    <>
      <div className="content">
        <Row>
          {axiosError? <AlertError Error={axiosError}/> : null}
        </Row>
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt=""
                  src={pickBgImage(authUser.username)}
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src="/img/smile1.png"
                    />
                    <h5 className="title">{userDetails.username}</h5>
                  </a>
                  <div color="gray"> {authUser.email} </div>
                  <br />
                </div>
                <p className="description text-center">
                  {userDetails.userId}</p>
                
                <br />
                <hr />
                <Row>
                  <Col >
                    {userDetails.accountId? 
                      <div><h6>회원등급 : 정회원 </h6>계좌 인증이 완료되었습니다.</div> : 
                      <><h6>회원등급 : 준회원 </h6>정회원이 되려면 계좌 인증이 필요합니다.
                        <br />
                          <Button
                            className="btn-round"
                            color="primary"
                            onClick={function authAccount() {setOpenBank(true)}}
                            >
                            계좌 인증
                          </Button>
                      </>
                    }
                  </Col>
                </Row>
              </CardBody>
            </Card>
            
          </Col>
          <Col md="8">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">개인 정보 수정 :</CardTitle>
              </CardHeader>
              <hr />
              <CardBody>

                {/* <form onSubmit={updateUserInfo}> */}
                  <Row>
                    <Col className="pr-1" md="6">
                      <fieldset className="form-group">
                        <label className="mandatoryLabel">사용자명 *</label>
                        <input ref={inputUsername}
                          name="username"
                          className="form-control form-control-lg eztalk_editableInput"
                          value={userDetails.username}
                          placeholder="username"
                          type="text"
                          onChange={(e) => { setUserDetails( {...userDetails, username : e.target.value } )} }
                        />
                      </fieldset>
                    </Col>
                    <Col className="pl-1" md="6">
                      <fieldset className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          이메일 주소
                        </label>
                        <input 
                          name="email"
                          className="form-control form-control-lg eztalk_readOnlyInput"
                          value={userDetails.email}
                          readOnly
                          placeholder="Email" type="email"
                        />
                      </fieldset>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md="4">
                      <fieldset className="form-group">
                        <div>
                          <label>우편번호</label> {" "}
                        </div>
                        <div className="eztalk_row">
                          <input 
                              name="zipcode"
                              className="form-control form-control-lg eztalk_readOnlyInput"
                              value={userDetails.homeAddress?.zipcode}
                              // readOnly
                              placeholder="Click..." 
                              onClick={addressClick} />
                          <button className="page_inline_button btn-fail" onClick={addressClick}>...</button>
                        </div>
                      </fieldset>
                    </Col>
                    <Col>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="7">
                      <fieldset className="form-group">
                        <input
                          name="street"
                          className="form-control form-control-lg eztalk_readOnlyInput"
                          value={userDetails.homeAddress?.street}
                          // readOnly
                          placeholder="자동 입력"
                          type="text"
                          />
                      </fieldset>
                    </Col>
                    <Col >
                      <fieldset className="form-group">
                        <input ref={inputExtra}
                          name="extra"
                          className="form-control form-control-lg eztalk_editableInput"
                          value={userDetails.homeAddress?.extra}
                          placeholder="상세 주소를 입력하세요"
                          type="text"
                          onChange={checkZipcode}
                          // onChange={(e) => { setAddress( {...address, extra : e.target.value } )} }
                        />
                      </fieldset>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <fieldset className="form-group">
                        <label>About Me</label>
                        <textarea
                          name="intro"
                          className="form-control form-control-lg eztalk_editableInput"
                          value={userDetails.intro}
                          placeholder="자기 소개를 써 주세요~"
                          rows="2"
                          onChange={(e) => { setUserDetails( {...userDetails, intro : e.target.value } )} }
                        />
                      </fieldset>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        disabled={isEqual(userInfo, userDetails)}
                        className="btn-round"
                        color="primary"
                        onClick={updateUserInfo}
                        >
                        Update Profile
                      </Button>
                    </div>
                  </Row>
                {/* </form> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {toastMessage? 
            <ToastMessage 
                      message={toastMessage}
                      setMessage={setToastMessage}
            />
            : null }
        {openPost? 
          <Postcode 
            changeAddress={changeAddress}
            setAddressFocus={setAddressFocus} 
            setOpenPost={setOpenPost} 
          /> : null}
        {openBank? 
          <BankAccount 
            authUser={authUser}
            setOpenBank={setOpenBank} 
          /> : null}          
      </div>
    </>
  );
}

export default UserProfile;
