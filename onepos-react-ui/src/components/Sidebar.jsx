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
import React, {useState, useEffect, useCallback} from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import CommunityService from "../hooks/communityService";
import SelectCommunity from "./SelectCommunity";

import logo from "../logo.svg";

var ps;

const Sidebar = (props) => {

  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const checkCommunity = useCallback((e) => {
    // console.log("userCommunity", props.authUser.communityId);
    if (!props.isAuth) return true;

    if (!props.authUser.communityId) {
      alert("[INFO] 기본 커뮤니티를 먼저 선택해야 합니다. ");
      e.preventDefault();
      return false;
    }
  }, [props.authUser.communityId]);

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <NavLink to="/" className="simple-text logo-mini" >
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </NavLink>
        <NavLink to="/" className="simple-text logo-normal" >
          H.E.A Team
        </NavLink>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          <SelectCommunity 
            authUser={props.authUser}
            userCommunities={props.userCommunities} // userCommunities는 로그인할 때 생성됨
            myCommunities={props.myCommunities}
          />
          {props.routes.map((prop, key) => {
            if (prop.layout.indexOf("---")>-1) 
              return ( 
              <li key={key}>
                <p className="eztalk-side-hr">{prop.layout}</p>
              </li>)
            else if (prop.layout.indexOf("/sub-menu") > -1)
              return (
                <li key={key}>
                  <div></div>
                </li>)              
            else  
              return (
              
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className={({ isActive }) => "nav-link" + (isActive ? " activat" : "")}
                  onClick={(prop.needCommunity? checkCommunity : "")}
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
