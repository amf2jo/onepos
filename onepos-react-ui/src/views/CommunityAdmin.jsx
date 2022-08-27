import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CommunityService from "../hooks/communityService";
import ChatRoomService from '../hooks/chatRoomService';
import { AlertError } from "../components/ProcessError";
import { trim } from "lodash-es";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
} from "reactstrap";
import ToastMessage from "../components/ToastMessage";

// react plugin used to create charts
const CommunityAdmin = ( {authUser, refreshSelectCommunities} ) => {
  const navigate  = useNavigate();
  const [renewCount, setRenewCount] = useState(0);
  const [axiosError, setAxiosError] = useState("");
  const [cmmtMembers, setCmmtMembers] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  // community 데이터를 reload 한다.
  useEffect(() => {
    getCommunityMembers();
  }, [authUser.communityId, renewCount]);

  
  const getCommunityMembers = useCallback (() => {
    if (!authUser.communityId) return;

    CommunityService.getMembers(authUser.communityId)
      .then(response => {
        setCmmtMembers(response.data.data);
        // console.log("my community", response.data.data);
      })
      .catch(e => {
        console.log("getCommunityMembers Error", e);
        setAxiosError({...e});
      });
  }, [authUser.communityId]);

  const appointManager = useCallback((memberName, memberId) => {
    // console.log("join community", communityId);
    if (!memberId) return;

    if (!confirm(`[ ${memberName}]님을 운영진에 선임하시겠습니까?`)) return;
    CommunityService.appointManager(authUser.communityId, memberId)
    .then(response => {
      // getCommunityMembers();
      setRenewCount(renewCount => renewCount + 1);
      refreshSelectCommunities(Date.now());
    })
    .catch(e => {
      setAxiosError({...e});
    });
  }, [authUser.communityId]);
  
  const disappointManager = useCallback((memberName, memberId) => {
    if (!memberId) return;
    if (!confirm(`[ ${memberName}]님을 운영진에서 해임하시겠습니까?`)) return;
    CommunityService.disappointManager(authUser.communityId, memberId)
      .then(response => {
        // getCommunityMembers();
        setRenewCount(renewCount => renewCount - 1);
        refreshSelectCommunities(Date.now());
      })
      .catch(e => {
        setAxiosError({...e});
      });
  }, [authUser.communityId]);

  const blockMember = useCallback((memberName, memberId) => {
    if (!memberId) return;

    if (!confirm(`[ ${memberName}]님을 블로킹하시겠습니까?`)) return;
    CommunityService.blockMember(authUser.communityId, memberId)
    .then(response => {
      setRenewCount(renewCount => renewCount + 1);
      refreshSelectCommunities(Date.now());
    })
    .catch(e => {
      setAxiosError({...e});
    });
  }, [authUser.communityId]);

  const unblockMember = useCallback((memberName, memberId) => {
    if (!memberId) return;

    if (!confirm(`[ ${memberName}]님 블로킹을 해제하시겠습니까?`)) return;
    CommunityService.unblockMember(authUser.communityId, memberId)
    .then(response => {
      setRenewCount(renewCount => renewCount + 1);
      refreshSelectCommunities(Date.now());
    })
    .catch(e => {
      setAxiosError({...e});
    });
  }, [authUser.communityId]);

    
  if (!authUser.communityId) {
    return <div className="content"><h3>커뮤니티를 먼저 선택하세요. </h3></div>
  }

  if (authUser.communityMemberGrade == "GENERAL") {
    return <div className="content"><h3>접근 권한이 없습니다. </h3></div>
  }
   

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
            { (axiosError) ?  <AlertError Error={axiosError}/>: ""}
              <CardHeader>
                <Table responsive>
                  <thead className="page_search">
                    <tr>
                      <th>{" "}
                        <span className="page_menu"><button onClick={getCommunityMembers}> 회원 조회 </button> </span>
                        <span className="page_menu_separator"> | </span>
                        {/* <span className="page_menu"><button onClick={getCommunityMembers}> 운영진 조회 </button> </span>
                        <span className="page_menu_separator"> | </span> */}

                      </th>
                      <th></th>
                      <th align="right">
                      </th>
                    </tr>
                  </thead>
              </Table>

              </CardHeader>
              <CardBody>
                <Table responsive >
                  <thead className="text-primary">
                    <tr>
                      <th>Email</th>
                      <th>회원명</th>
                      <th>가입일자</th>
                      <th>회원등급</th>
                      <th>인증여부</th>
                      <th>Action</th>
                      <th>블로킹</th>
                    </tr>
                  </thead>
                  <tbody>
                  { cmmtMembers.map((member, index) => (
                      <CommunityMember key={index}
                        authUser={authUser}
                        member={member}
                        appointManager={appointManager}
                        disappointManager={disappointManager}
                        blockMember={blockMember}
                        unblockMember={unblockMember}
                      />
                      ))
                  }
                  </tbody>
                </Table>
                  {(authUser.communityMemberGrade == "OWNER") ?
                    <CreateChatRoomButtons 
                          communityId={authUser.communityId} 
                          setToastMessage={setToastMessage}
                          />
                     : ""} 
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

      </div>

    </>
  );
}

const CommunityMember = ({authUser, member, 
                          appointManager, disappointManager, 
                          blockMember, unblockMember}) => {

  const BlockingButton = ({member}) => {
    const {memberName, memberId, memberGrade, blocked} = member;
    const block = useCallback(() => {blockMember(memberName, memberId)}, []);
    const unblock = useCallback(() => {unblockMember(memberName, memberId)}, []);
    
    if (!authUser)
     return "--"; 
    else if (memberGrade == "OWNER")
     return "--"; 
    else if (!(authUser.communityMemberGrade == "OWNER" || authUser.communityMemberGrade == "MANAGER"))
      return "--"; 
    else if (blocked) 
      return <button className="page_list_button btn-outline-success" 
                     onClick={unblock}>해제</button> ;
    else  
      return <button className="page_list_button btn-outline-primary" 
                     onClick={block}>블로킹</button> ;
  };

  const ActivateButton = ({member}) => {
    const {memberName, memberId, memberGrade} = member;
    const appoint = useCallback(() => {appointManager(memberName, memberId)}, []);
    const disappoint = useCallback(() => {disappointManager(memberName, memberId)}, []);
    
    if (!authUser)
      return "--"; 
    else if (authUser.communityMemberGrade == "GENERAL")
      return "--";
    else if (member.blocked)
      return "--";
    else if (trim(memberGrade) == "OWNER")
      return "--";  
    else if (trim(memberGrade) == "MANAGER")
      return <button className="page_list_button btn-fail" onClick={disappoint}>운영진 해제</button> ;
    else if (trim(memberGrade) == "GENERAL") 
      return <button className="page_list_button btn-info" onClick={appoint}>운영진 선임</button> ;
  };

  return (
    <tr className={member.blocked? "blocked-member": ""}>

      <td>{member.email}</td>
      <td>{member.memberName}</td>
      <td>{member.joinedAt? new Date(member.joinedAt).toISOString().substring(0,10) : ""}</td>
      <td>{member.memberGrade}</td>
      <td>{member.certified}</td>
      <td>
        <ActivateButton member={member}/>
      </td>
      <td>
        <BlockingButton member={member}/>
      </td>
    </tr>
    )
}

const CreateChatRoomButtons = ({communityId, setToastMessage}) => {
  const [chatRooms,  setChatRooms]  = useState(null);

  const [buttons, setButtons] = useState( [
                      {type:'temporary', on:1}, 
                      {type:'regular', on:1} ]);                 
  
  useEffect(() => {
    getChatRooms();
  }, [communityId]);
  
  const getChatRooms = useCallback (() => {
    if (!communityId) return;

    ChatRoomService.getChatRooms(communityId)
      .then(response => {
        setChatRooms(response.data.data);
      })
      .catch(e => {
        console.log("getChatRooms Error", e);
        setAxiosError({...e});
      });
  }, [communityId]);

  const createChatRoom = useCallback(({target}) => {

    if (!confirm(" 채팅방을 개설하시겠습니까?")) return;

    const roomType = target.name;
    // console.log(target);
    ChatRoomService.createChatRoom(roomType, {communityId})
    .then(response => {
      setButtons(buttons => buttons.filter((button) => button.type !== roomType));
      setToastMessage("채팅방 개설이 완료되었습니다.");
    }) 
    .catch(e => {})
  }, [communityId]);


  if (chatRooms) {
    return (
    buttons.map ((button, key) => {
      const found = chatRooms.filter( room => room.chatRoomType.toLowerCase() == button.type);
      return (
        (found.length > 0) ? 
          ""
          :
          <Button className="btn-round btn btn-primary " key={key} 
                  onClick={createChatRoom} name={button.type}>
            <i className="nc-icon nc-support-17" /> 
            { (button.type == "regular")? " 정회원" : " 준회원"  } 채팅방 개설
          </Button>
      )
    })
    )
  }

}

export default CommunityAdmin;
