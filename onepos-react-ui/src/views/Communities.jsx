import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CommunityService from "../hooks/communityService";
import { AlertError } from "../components/ProcessError";
import { trim } from "lodash-es";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

// react plugin used to create charts
const Communities = ({authUser, refreshSelectCommunities } ) => {
  const navigate  = useNavigate();
  const refKeyword = useRef(null);
  const [renewCount, setRenewCount] = useState(0);
  const [axiosError, setAxiosError] = useState("");
  const [communities, setCommunities] = useState([]);
  const [isNewForm, setIsNewForm] = useState(null);
  const [communityFormOpen, setCommunityFormOpen] = useState(false);
  
  const emptyCmmt = {
    communityId: "",
    communityName: "",
    communityAptName: "",
    communityDesc: "",
  };

  const [community, setCommunity] = useState(emptyCmmt);

  useEffect(() => {
    CommunityService.setHttpHeaders(); 
  }, [authUser])

  // community 데이터를 reload 한다.
  useEffect(() => {
    if (authUser) getMyCommunities();
  }, [renewCount]);

  const checkAuthLogin = (needLogin) => {
    if (!authUser.userId) {
      alert("로그인이 필요합니다.");
      if (needLogin) navigate("/menu/Login");
      return false;
    }
    return true;
  }

  const getAllCommunities = useCallback(() => {
    CommunityService.getAll()
      .then(response => {
        setCommunities(communities => response.data.data);
        // console.log(response.data.data);
      })
      .catch(e => {
        console.log("getAllCommunities Error", e);
        setAxiosError({...e});
      });
  }, []);

  const getMyCommunities = () => {
    if (!checkAuthLogin()) return;
    CommunityService.getMyList(authUser.userId)
      .then(response => {
        setCommunities(response.data.data);
        // console.log("my community", response.data.data);
      })
      .catch(e => {
        console.log("getMyCommunities Error", e);
        setAxiosError({...e});
      });
  };

  const findByKeyword = (keyword) => {

    if (!checkAuthLogin()) return;
    if (!keyword.trim()) return;
    CommunityService.findByKeyword(keyword)
      .then(response => {
        setCommunities(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const joinCommunityMember = useCallback((communityId) => {
    // console.log("join community", communityId);
    if (!checkAuthLogin()) return;
    if (!communityId) return;

    if (!confirm("커뮤니티에 가입하시겠습니까?")) return;
    CommunityService.joinMember(communityId, authUser)
    .then(response => {
      // getMyCommunities();
      setRenewCount(renewCount => renewCount + 1);
      refreshSelectCommunities(resetSelectCommunity => Date.now());
    })
    .catch(e => {
      setAxiosError({...e});
    });
  }, []);
  
  const resignCommunityMember = useCallback((communityId) => {
    if (!checkAuthLogin()) return;
    if (!communityId) return;
    if (!confirm("커뮤니티에 탈퇴하시겠습니까?")) return;
    CommunityService.resignMember(communityId, authUser.userId)
      .then(response => {
        // getMyCommunities();
        setRenewCount(renewCount => renewCount - 1);
        refreshSelectCommunities(resetSelectCommunity => Date.now());
      })
      .catch(e => {
        setAxiosError({...e});
      });
  }, []);

  const openNewCommunity = useCallback(() => {
    if (!checkAuthLogin()) return;
    setCommunity(community);
    setIsNewForm(isNewForm => true);
    setCommunityFormOpen(communityFormOpen => true);
  }, [community, authUser]);

  const openUpdateCommunity = useCallback((data) => {
    if (!checkAuthLogin()) return;
    setCommunity(data);
    setIsNewForm(isNewForm => false);
    setCommunityFormOpen(communityFormOpen => true);
    setAxiosError(null);
  }, [community, authUser]);

  const onCreateCommunity = useCallback((e) => {
    
    // console.log("make new community: ",  community);
    if (trim(community.communityName) == "" ||
        trim(community.communityAptName) == "" ) {
        alert("커뮤니티명과 아파트 단지명은 필수입니다.");
        event.preventDefault();
        return false;
    }

    CommunityService.create(community)
      .then(response => {
        // communityList를 다시 refresh 하게 만든다.
        setRenewCount(renewCount => renewCount + 1);
        refreshSelectCommunities(resetSelectCommunity => Date.now());
        closeModal();
      })
      .catch(e => {
        console.log("createCommunity Error", e);
        setAxiosError({...e});
      });
      event.preventDefault();
    
    return false;
  }, [community, renewCount]);

  const onUpdateCommunity = useCallback((e) => {
    
    // console.log("update community: ",  community);
    if (trim(community.communityName) == "" ||
        trim(community.communityAptName) == "" ) {
        alert("커뮤니티명과 아파트 단지명은 필수입니다.");
        event.preventDefault();
        return false;
    }

    CommunityService.update(community.communityId, community)
      .then(response => {
        // communityList를 다시 refresh 하게 만든다.
        setRenewCount(renewCount => renewCount + 1);
        refreshSelectCommunities(resetSelectCommunity => Date.now());
        closeModal();
      })
      .catch(e => {
        console.log("createCommunity Error", e);
        setAxiosError({...e});
      });
      event.preventDefault();
    
    return false;
  }, [community]);

  const closeModal = useCallback(() => {
    setCommunity(emptyCmmt);
    setCommunityFormOpen(communityFormOpen => false);
  })

  const inputKeyPress = useCallback(e => {    

    if (e.key === 'Enter') searchClick(e);
    
  }, []);  


  const searchClick = useCallback((event) => {
    const keyword = refKeyword.current.value.trim();
    if (!keyword) return;
    
    findByKeyword(keyword);
    refKeyword.current.focus();

  }, []);

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
                        <span className="page_menu"><button onClick={getMyCommunities}> 내 커뮤니티 </button> </span>
                        <span className="page_menu_separator"> | </span>
                        <span className="page_menu"><button onClick={getAllCommunities}>전체 </button> </span>
                        <span className="page_menu_separator"> | </span> 
                        <span className="page_menu_button">
                          <input ref={refKeyword}
                                 type="search" id="keyword" 
                                 className="search-input" placeholder="검색어를 입력하세요" 
                                 onKeyPress={inputKeyPress} />
                        </span>
                        <span>
                          <button className="page_sub_button btn-warning" onClick={searchClick}>search</button>
                       </span>
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
                      {/* <th>ID</th> */}
                      <th>커뮤니티 명</th>
                      <th>아파트 단지 정보</th>
                      <th>커뮤니티 설명</th>
                      <th>생성일</th>
                      <th>회원등급</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  { communities.map((community, index) => (
                      <CommunityInfo key={index}
                        authUser={authUser}
                        community={community}
                        joinCommunityMember={joinCommunityMember}
                        resignCommunityMember={resignCommunityMember}
                        openCommunity={openUpdateCommunity} 
                      />
                      ))
                  }
                  </tbody>
                </Table>
                  <Button className="btn-round btn btn-primary"
                      onClick={openNewCommunity}>
                    <i className="nc-icon nc-simple-add" /> 새 커뮤니티 
                  </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <CommunityForm 
        authUser={authUser}
        isOpen={communityFormOpen} 
        isNewForm={isNewForm}
        community={community}
        setCommunity={setCommunity}
        closeModal={closeModal} 
        onCreateCommunity={onCreateCommunity}
        onUpdateCommuity={onUpdateCommunity}
      />
    </>
  );
}

const CommunityInfo = ({authUser, community, joinCommunityMember, resignCommunityMember, openCommunity}) => {

  const clickCommunity = useCallback(() => {
    openCommunity(community);
  }, [community]);


  const ActivateButton = ({community, communityId, communityMemberGrade}) => {
    
    const getin = useCallback(() => {joinCommunityMember(communityId)}, []);
    const getout = useCallback(() => {resignCommunityMember(communityId)}, []);
    
    if (!authUser)
      return "--"; 
    else if (community.communityOwnerId == authUser?.userId) 
      return "--";
    else if (trim(community.communityMemberGrade) == "")
      return <button className="page_list_button btn-success" onClick={getin}>가입</button> ;
    else 
      return <button className="page_list_button btn-danger" onClick={getout}>탈퇴</button> ;
  };

  return (
    <tr>
      {/* <td>{community.communityId}</td>  */}
      <td>
        <a href="#" onClick={clickCommunity} >{community.communityName}</a>
      </td>
      <td>{community.communityAptName}</td>
      <td>{community.communityDesc.substring(0,20) + (community.communityDesc.length > 20 ? "...":"") }</td>
      <td>{community.createdDate? new Date(community.createdDate).toISOString().substring(0,10) : ""}</td>
      <td>{community.communityMemberGrade}</td>
      <td><ActivateButton
            community={community} 
            communityId={community.communityId}
            communityMemberGrade={community.communityMemberGrade}
          />
      </td>

    </tr>
    )

}

const CommunityForm = ({authUser, isOpen, isNewForm, community, setCommunity, 
                        closeModal, onCreateCommunity, onUpdateCommuity}) => {
  // console.log("canEdit", authUser.userId, community.communityOwnerId)
  const canEdit = isNewForm || (authUser.userId == community.communityOwnerId ); 
  return (
  <>
  <Modal className="eztalk_modal" isOpen={isOpen} size="lg" unmountOnClose={false}>
    <div></div>
      {/* <form action="#" onSubmit={isNew? onCreateCommunity : onUpdateCommuity}> */}
      <ModalHeader >
        {(isNewForm)? "새 커뮤니티 정보를 입력하세요." : ("[ " + community.communityName + " ] 커뮤니티")} : 
      </ModalHeader>
      <ModalBody>

        <br />
        {isNewForm ? "" :
          <fieldset className="form-group">
            <input
              type="text"
              readOnly
              name="communityId"
              className="form-control form-control-lg"
              value={community.communityId}
            />
          </fieldset>
        }  
          <fieldset className="form-group">
            <input
              type="text"
              name="communityName"
              readOnly={!canEdit} 
              className="form-control form-control-lg"
              placeholder="커뮤니티명 (유니크하게 지어 주세요)"
              value={community.communityName || ""}
              onChange={(e) => { setCommunity( {...community, communityName : e.target.value } )} }
            />
          </fieldset>  
          <fieldset className="form-group">
            <input
              type="text"
              name="communityAptName"
              readOnly={!canEdit} 
              className="form-control form-control-lg"
              placeholder="아파트 단지명"
              value={community.communityAptName || ""}
              onChange={(e) => { setCommunity( {...community, communityAptName : e.target.value } )} }
              />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              type="text"
              name="communityDesc"
              readOnly={!canEdit} 
              className="form-control form-control-lg"
              placeholder="커뮤니티 설명"
              value={community.communityDesc || ""}
              onChange={(e) => { setCommunity( {...community, communityDesc : e.target.value } )} }
              />
          </fieldset>
          <fieldset className="form-group">
            <div className="form-control eztalk-readOnly">created At : {" "}
                 {community.createdDate? new Date(community.createdDate).toISOString().substring(0,10) : "--"}</div>
          {/* </fieldset>
          <fieldset className="form-group">   */}
            <div className="form-control eztalk-readOnly">modified At : {" "}
                 {community.modifiedDate? new Date(community.modifiedDate).toISOString().substring(0,10) : "--"}</div>
          </fieldset>

        <br />
      
      </ModalBody>
      <ModalFooter>
        { (canEdit) ?
        <Button onClick={isNewForm? onCreateCommunity : onUpdateCommuity}
        color="primary"> 
          Save </Button> : ""
        }
        <Button onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
      {/* </form> */}
  </Modal>
  
  </>
  
  )
}
export default Communities;
