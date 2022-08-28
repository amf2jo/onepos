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
import { useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import routes from "../views/routes.jsx";
import { useEffect } from 'react';


function Header(props) {
  const { authUser } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [userMenuDropdownOpen, setUserMenuDropdownOpen] = React.useState(false);
  const [powerMenuDropdownOpen, setPowerMenuDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const navigate  = useNavigate();
  const [classes, setClasses] = React.useState("dropdown");

  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });

  React.useEffect(() => {

  }, [authUser.communityName]);

  const getBrand = React.useCallback(() => {
    let brandName = "Welcome to EZ-Talk";
    let cmmt = authUser?.communityName;
    routes.map((item, key) => {

      if (window.location.href.indexOf(item.layout + item.path) !== -1) {
        brandName = ((item.needCommunity && cmmt) ? " [" + cmmt + "] " : "") + item.name ;
      }
      return null;
    });
    return brandName;
  }, [authUser.communityName]);

  const handleClick = () => {
    if (classes === "dropdown") {
      setClasses("dropdown show");
    } else {
      setClasses("dropdown");
    }
  };

  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const userMenuDropdownToggle = (e) => {
    setUserMenuDropdownOpen(!userMenuDropdownOpen);
  };
  const powerMenuDropdownToggle = (e) => {
    setPowerMenuDropdownOpen(!powerMenuDropdownOpen);
  };


  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };

  const loginClick = () => {
    navigate("/menu/Login");
  }

  const menuNavigate = (submenu) => {
    navigate("/sub-menu" + submenu);
  }


  // React.useEffect(() => {
  //   if (
  //     window.innerWidth < 993 &&
  //     document.documentElement.className.indexOf("nav-open") !== -1
  //   ) {
  //     document.documentElement.classList.toggle("nav-open");
  //     sidebarToggle.current.classList.toggle("toggled");
  //   }
  // }, [location]);

  
  const UserMenu = () => {

    if (!authUser) {
      return (
        <div>
            <Button size="sm" onClick={loginClick}>Login</Button>
        </div>
      );
    }

    return (
      <Nav navbar>

      <Dropdown
        nav
        isOpen={userMenuDropdownOpen}
        toggle={(e) => userMenuDropdownToggle(e)}
      >
        <DropdownToggle caret nav>
          <i className="nc-icon nc-circle-10" />
          <p>
            <span className="d-lg-none d-md-block">User Info</span>
          </p>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header className="eztalk-dropdown-header username" >{authUser.username}</DropdownItem>
          <DropdownItem tag="a" onClick={() => {
                menuNavigate("/user-profile");
              }} >Profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag="a" onClick={() => {
                menuNavigate("/user-account");
              }} >My Account</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        nav
        isOpen={powerMenuDropdownOpen}
        toggle={(e) => powerMenuDropdownToggle(e)}
      >
        <DropdownToggle nav>
          <i className="nc-icon nc-button-power" />{" "}
          <p>
            <span className="d-lg-none d-md-block">Logout</span>
          </p>
        </DropdownToggle>
        <DropdownMenu>
          {/* <DropdownItem header className="eztalk-dropdown-header">Confirm Exit</DropdownItem> */}
          <DropdownItem className="eztalk-dropdown-item"
            onClick={() => {
                props.logoutClick();
              }}
          >EXIT</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* <Dropdown >
        <DropdownToggle nav>
          <div className={classes}>
            <div onClick={handleClick}>
              <i className="nc-icon nc-button-power" />{" "}
              <p>
                <span className="d-lg-none d-md-block">Logout</span>
              </p>
            </div>
            <ul className="dropdown-menu show eztalk-dropdown">
              <li className="eztalk-dropdown-item">EXIT</li>
            </ul>
          </div>
        </DropdownToggle > 
      </Dropdown>*/}

    </Nav>

    )
  }

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      {/* <Container fluid> */}
        <div className="navbar-wrapper"
             data-active-color={props.activeColor}
        >
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand className="eztalk-main-title">{getBrand()}
          </NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <UserMenu />
        </Collapse>
    </Navbar>
  );
}

export default Header;
