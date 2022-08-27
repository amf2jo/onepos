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

import Communities        from "./Communities.jsx";
import TemporaryChatroom from "./TemporaryChatroom.jsx";
import RegularChatroom  from "./RegularChatroom.jsx";
import CampaignList     from "./CampaignList.jsx";
import AddCampaign      from "./AddCampaign.jsx";
import Campaign         from "./Campaign.jsx";
import NoticeList         from "./NoticeList.jsx";
import Notice         from "./Notice.jsx";
import CommunityAdmin   from "./CommunityAdmin.jsx";
import UserProfile      from "./UserProfile";
import UserAccount      from "./UserAccount";
import CommunityAccountList from "./CommunityAccountList.jsx";
import CommunityAccountDetail from "./CommunityAccountDetail.jsx";
import AddCommunityAccount      from "./AddCommunityAccount.jsx";

import Icons from "../samples/Icons.jsx";
import User from "../samples/User.jsx";
import Typography from "../samples/Typography.jsx";
import TableList from "../samples/Tables.jsx";
import UpgradeToPro from "../samples/Upgrade.jsx";

var routes = [
  {
    path: "/communities",
    name: "커뮤니티 검색",
    icon: "nc-icon nc-zoom-split",
    component: Communities,
    layout: "/menu",
    needAuth : false, 
    needCommunity: false,
  },
  {
    path: "/notices",
    name: "공지사항",
    icon: "nc-icon nc-paper",
    component: NoticeList,
    layout: "/menu",
    needAuth : true, 
    needCommunity: true,
  },
  {
    path: "/notices/:id",
    name: "공지사항 상세",
    icon: "nc-icon nc-paper",
    component: Notice,
    layout: "/sub-menu",
    needAuth : false,
    isActive : false,
    notVisible : "true"
  },  
  {
    path: "/campaigns",
    name: "캠페인",
    icon: "nc-icon nc-spaceship",
    component: CampaignList,
    layout: "/menu",
    needAuth : true, 
    needCommunity: true, 
  },
  {
    path: "/campaigns/campaign-insert",
    name: "캠페인 등록",
    icon: "nc-icon nc-spaceship",
    component: AddCampaign,
    layout: "/sub-menu",
    needAuth : true,
    isActive : false,
    notVisible : "true"
  },
  {
    path: "/campaigns/:id",
    name: "캠페인 상세",
    icon: "nc-icon nc-spaceship",
    component: Campaign,
    layout: "/sub-menu",
    needAuth : false,
    isActive : false,
    notVisible : "true"
  },
  {
    path: "/community-accounts",
    name: "커뮤니티 통장",
    icon: "nc-icon nc-money-coins",
    component: CommunityAccountList,
    layout: "/menu",
    needAuth : true, 
    needCommunity: true, 
  },
  {
      path: "/community-accounts/:id",
      name: "커뮤니티 계좌 상세",
      icon: "nc-icon nc-spaceship",
      component: CommunityAccountDetail,
      layout: "/sub-menu",
      needAuth : true,
      isActive : false,
      notVisible : "true"
    },
    {
      path: "/community-accounts/AddCommunityAccount",
      name: "커뮤니티 계좌 등록",
      icon: "nc-icon nc-spaceship",
      component: AddCommunityAccount,
      layout: "/sub-menu",
      needAuth : true,
      isActive : false,
      notVisible : "true"
    },
    {
    path: "/community-admin",
    name: "커뮤니티 관리",
    icon: "nc-icon nc-settings",
    component: CommunityAdmin,
    layout: "/menu",
    needAuth : true, 
    needCommunity: true, 
  },  
  {
    path: "/temporary-chatroom",
    name: "준회원 채팅방",
    icon: "nc-icon nc-sound-wave",
    component: TemporaryChatroom,
    layout: "/menu",
    needAuth : true,  
    needCommunity: true,
  },
  {
    path: "/regular-chatroom",
    name: "정회원 채팅방",
    icon: "nc-icon nc-chat-33",
    component: RegularChatroom,
    layout: "/menu",
    needAuth : true,  
    needCommunity: true,
  },

  {
    path: "/user-profile",
    name: "사용자 프로파일",
    icon: "nc-icon nc-single-02",
    component: UserProfile,
    layout: "/sub-menu",
    needAuth : true,
  },
  {
    path: "/user-account",
    name: "사용자 계좌관리",
    icon: "nc-icon nc-credit-card",
    component: UserAccount,
    layout: "/sub-menu",
    needAuth : true,
  },
  {
    path: "",
    name: "",
    icon: "",
    component: Icons,
    layout: "---",
    needAuth : false, 
    needCommunity: false,
  },

  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-bank",
  //   component: Dashboard,
  //   layout: "/samples",
  //   needAuth : false,
  // },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/samples",
    needAuth : false, 
    needCommunity: false,
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: User,
  //   layout: "/samples",
  //   needAuth : false,
  // },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/samples",
    needAuth : false,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/samples",
    needAuth : false,
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-planet",
    component: UpgradeToPro,
    layout: "/samples",
    needAuth : false,
  },
];
export default routes;
