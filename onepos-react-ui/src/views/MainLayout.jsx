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
import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import {useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/paper-dashboard.css";
import "../assets/css/eztalk-custom.css";
import "../assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import PerfectScrollbar from "perfect-scrollbar";


import HeaderNavbar from "../components/HeaderNavbar";
import Sidebar from "../components/Sidebar";
import useAuth from '../hooks/useAuth';

import Home from "./Home";
import Login from "./Login";
import routes from "./routes";

import { useCallback } from 'react';

var ps;

const MainLayout = () => {
  // const [token, setToken] = React.useState("");
  const [menu, setMenu] = React.useState("");
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("danger");
  
  const mainPanel = React.useRef();
  const location = useLocation();

  // useAuth를 통해 로그인되었는지를 체크한다. 
  const thisUser = useAuth();  
  // thisUser has isAuth, checkAuth, useAuth, login, logout, setCommunity functions
  const authUser = thisUser.checkAuth() || thisUser.authUser; //(thisUser.expired())?  "" : thisUser.authUser;  
  
  const [ myCommunities, setMyCommunities] = React.useState("init");

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };

    return () => {
      thisUser.logout();
    }

  }, []);

  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    saveMainRoute();
    
    const handleActiveClick = (color) => {
      setActiveColor(color);
    };
    const handleBgClick = (color) => {
      setBackgroundColor(color);
    };

    // console.log("Current User (" + thisUser.authUser.username + ") :: " + isAuth); 

  }, [location, thisUser.isAuth]);

  const refreshSelectCommunities = () => {
    console.log("reset select community");
    setMyCommunities ("update" + Date.now());  // 초기화시킴
  }

  function saveMainRoute () {
    //  console.log("Current location : " + location.pathname);
    if(location.pathname.indexOf("login") > -1 || location.pathname.indexOf("register") > -1 ) return;

    setMenu(location.pathname);
    // console.log("Last Main Menu : " + menu);
  };

  return (
    <div className="wrapper">
      <Sidebar
        location={location}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
        authUser={thisUser.isAuth ? authUser : ""} 
        myCommunities={myCommunities}
      />
      <div className="main-panel" ref={mainPanel}>
        <HeaderNavbar 
            location={location}
            ctiveColor={activeColor}
            authUser={thisUser.isAuth ? authUser : ""} 
            logoutClick={thisUser.logout} />
        <Routes>
          <Route path="/" index element={<Home />} key="home" /> 
          <Route path="/menu/register" 
                 element={<Login location={location} origin={menu} />}  
          /> 
          <Route path="/menu/login" 
                 element={<Login location={location} origin={menu} />}
          /> 
          {routes.map((prop, key) => {
            // console.log("token : " + token + prop.path+":" + prop.needAuth)
            return (
              
              <Route
                path={prop.layout + prop.path}
                element={ 
                  (!prop.needAuth || thisUser.isAuth) ?
                    <prop.component  authUser={authUser} 
                                    // setResetSelectCommunity는 community 메뉴에만 필요함
                                    refreshSelectCommunities={refreshSelectCommunities}
                    /> :
                    <Login location={location} origin={menu}/>
                  }
                key={key}
              />
            ) ;
          })}
        </Routes>
      </div> 
       {/* <Footer fluid />  */}
    </div>
  );
}

export default MainLayout;

