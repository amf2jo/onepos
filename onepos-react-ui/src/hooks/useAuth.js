import axios from 'axios'
import { isEmpty } from 'lodash-es'
import { useSnapshot } from 'valtio'
import { proxyWithComputed } from 'valtio/utils'
import jwt_decode from "jwt-decode";

/**
 * Token 만료 처리 
 * - login시 발급받은 token은 1일간 유효하다.
 * - token exp.time과 별개로, UI에서 30분동안 활동하지 않으면 token 만료 처리를 한다. 
 */
const allowedIdleTime = import.meta.env.VITE_IDLE_TIME || 30; // 30분

// ref : https://github.com/pmndrs/valtio
const state = proxyWithComputed(
  {
    authUser: getAuthUser(),
  },
  {
    isAuth: (snap) => !isEmpty(snap.authUser),
  },
);

function getAuthUser() {
  const jwt = window.localStorage.getItem('Bearer Token');    
  if (!jwt) return "";

  const userInfo = jwt_decode(jwt);
  // if (expiredToken(userInfo?.exp * 1000)) return "";

  const community = JSON.parse(window.localStorage.getItem("userCommunity"));
  // console.log("userCommnuity=", community?.communityId);

  // Bearer Token이 없다면 jwtToken을 찾는다. 요건 서버에서 token 구현 안된 경우 쓰기 위한 소스
  // if (!jwt) {
  //   jwt = window.localStorage.getItem('jwtToken');
  //   if (!jwt) return {}
  //   return JSON.parse(atob(jwt))
  // }
  
  const user = jwt_decode(jwt)
  return {...user, 
          communityId : community?.communityId,
          communityName : community?.communityName,
          communityMemberGrade : community?.communityMemberGrade
        }
};


function expiredToken(exp) {
  // console.log("token is valid until", new Date(exp).toISOString());
  if (new Date() > new Date(exp)) {
    alert("서버에서 발급받은 Token 사용 시간이 만료되었습니다. 재로그인이 필요합니다. ");
    removeAuthUser();
    return true;
  }

  const timestamp = window.localStorage.getItem("timestamp");

  if (!timestamp) return false;

  if (Date.now() > timestamp + allowedIdleTime*60*1000 ) {
    alert(`[${allowedIdleTime}]분 동안 활동이 없어 종료합니다. ` +". 재로그인하십시오. ");
    removeAuthUser();
    return true;
  }

  window.localStorage.setItem("timestamp", Date.now()); 
  return false;
}

function removeAuthUser() {

  state.authUser = "";
  window.localStorage.removeItem('Bearer Token');
  window.localStorage.removeItem('userCommunity');
  window.localStorage.removeItem('timestamp');
}


const actions = {
  login: (token, user) => {
    
    var decoded = jwt_decode(token);
    state.authUser = decoded;
    window.localStorage.setItem('Bearer Token', token);
    window.localStorage.setItem("timestamp", Date.now()); 
    return true;
  },

  fakeLogin: (token, user) => {
    
    // token이 없는 경우에는 user 정보로 token 
    if (!token) {
      state.authUser = user;
      token = btoa(JSON.stringify(state.authUser));
      window.localStorage.setItem('jwtToken', token);
      window.localStorage.setItem("timestamp", Date.now()); 
      return true;
    }    
  },

  logout: () => {
    console.log ("User Logged-Out");
    state.authUser = "";
    removeAuthUser();
  },

  // expired: () => {
  //   const authUser = state.authUser;

  //   if (!authUser || isEmpty(authUser)) {
  //     actions.logout();
  //     return true;
  //   }
  //   if (expiredToken(authUser?.exp * 1000)) {
  //     actions.logout();
  //     return true;
  //   }
    
  //   return false;
  // },

  // getAuthUser: () => {
  //   return state.authUser;
  // },
  
  // expired + getAuthUser
  checkAuth: () => {
    const authUser = state.authUser;

    if (expiredToken(authUser?.exp * 1000)) {
      actions.logout();
    }
    // if (!authUser || isEmpty(authUser)) {
    //   return "";
    // }
    
    // console.log("checkAuth", authUser)
    return authUser;
  },

  setCommunity: (data) => {
    //console.log("setUserCommunity", data);
    state.authUser = {...state.authUser,
                      communityId: data?.communityId,
                      communityName: data?.communityName, 
                      communityMemberGrade : data?.communityMemberGrade
                     }
    window.localStorage.setItem('userCommunity', JSON.stringify(data));                 
  },

};

function useAuth() {
  const snap = useSnapshot(state)

  return {
    ...snap,
    ...actions,
  }
};

export default useAuth;
