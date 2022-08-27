
import { useState, useEffect, useCallback } from 'react';
import CommunityService from "../hooks/communityService";
import useAuth from '../hooks/useAuth';

const SelectCommunity = ({myCommunities}) => {
  const {authUser, isAuth, setCommunity} = useAuth();
  const [communities, setCommunities] = useState([]);
  

  useEffect(() => {
    CommunityService.setHttpHeaders();
    initMyCommunities();
   
  }, [authUser, myCommunities]);


  useEffect(() => {

    // 사용자 커뮤니티 목록에 현재 선택한 커뮤니티 없는 경우, 사용자 정보 커뮤니티 삭제
    const selections = communities.filter(cmmt => (authUser.communityId == cmmt.communityId));
    if (myCommunities.indexOf("update") >= 0 && 
        authUser.communityId && selections.length == 0) setCommunity({});
   
  }, [authUser, communities]);

  // 초기화
  const initMyCommunities = useCallback(() => {

    console.log("init SelectCommunities");
    if (!authUser) {
      setCommunities([]);
      return;
    }

    const memberId = authUser?.userId;
    if (!memberId) return;

    CommunityService.getMyList(memberId)
      .then(response => {
        setCommunities(response.data.data);
        // console.log("SelectCommunity renewd");
      })
      .catch(e => {
        console.log(e);
      });  

  }, [authUser, myCommunities]);

  const selectCommunity = useCallback((e) => {
    const selectId = e.target.value;
    if (selectId == "" || selectId == "0") {
      e.preventDefault();
      return;
    }
    const community = communities.filter(c => c.communityId==selectId);
  
    // if (!confirm(`기본 커뮤니티를 [${community[0].communityName}](으)로 변경하시겠습니까?` )) return;
    setCommunity(community[0]);

  }, [communities]);

  return (
    <div className="sidebar_community_box">
    {isAuth ?
      <select className="sidebar_community" id="my-communities" 
              onChange={selectCommunity} 
              value={authUser.communityId}>
        <option value="">--- 커뮤니티 선택 ---</option>
        {communities.map((cmmt, key) => {
          return (
            <option value={cmmt.communityId} key={key}>
              {cmmt.communityName}
            </option>
            )
          })
        }
      </select>
    : <div>{"..."}</div>}
    </div>
  );
  
}

export default SelectCommunity;
