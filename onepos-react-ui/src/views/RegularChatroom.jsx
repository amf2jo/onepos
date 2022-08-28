import React from "react";
import { useEffect } from 'react';
import useAuth from "../hooks/useAuth";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,

} from "reactstrap";

import { PageError, AlertError } from "../components/ProcessError";
import ChatRoomService from "../hooks/chatRoomService";
import ChatRoomProvider from "../components/chat/ChatRoomContext";

const roomType="regular";

const RegularRoom = ({authUser}) => {
  // const authUser = useAuth().checkAuth();
  if (!authUser.communityId) {
    return <div className="content"><h3>커뮤니티를 먼저 선택하세요. </h3></div>
  }
 
  const [chatRoomLoading, chatRoom, chatRoomError] = 
            ChatRoomService.getChatRoom(authUser.communityId, roomType, [authUser.communityId]);

  if (chatRoomLoading) {
    return <div className="content">... Waiting for setting Up Chatting Room </div>
  }

  if (chatRoomError) {
    //  && chatRoomError.response.status != 400 
    console.log ("chatRoomError", chatRoomError);
    let Error = {...chatRoomError, title :  "Failed in getting chatRoom ..."}
    return (
      <PageError Error={Error} />
    )
  }

  if (!chatRoom) {
    return <div className="content"><h3>... 채팅방이 아직 개설되지 않았습니다 ... </h3></div>
  }

  const chatRoomId = chatRoom.id;

  return (
  <>
    <div className="content">

      <Card>
        <CardHeader className="chat_header">
          <CardTitle tag="h4">{authUser.communityName || "OOO 커뮤니티 "}
            <span className="eztalk_sidetitle">{chatRoomId}</span>
          </CardTitle>
        </CardHeader>

        <CardBody className="">
          <Row md="10" className="chatroombox">
            <ChatRoomBox 
              authUser={authUser}
              chatRoomId={chatRoomId}
            />
          </Row>
        </CardBody>
      </Card>

    </div>
  </>
  );

}

const ChatRoomBox = ({chatRoomId, authUser}) => {
  const [dataLoading, chatEntries, dataError] = ChatRoomService.getChatEntries(chatRoomId, []);

  if (dataLoading) return <div>... Loading Chatting Entries</div>

  if (dataError && dataError.response.status != 400) {
    console.log ("chatEntriesError", dataError); 
    let Error = {...dataError, title :  "Failed in getting chatRoom Entries ..."}
 
    return <PageError Error={Error} />
  }

  if (!chatEntries) return <></>; 

  return (
    <ChatRoomProvider 
      roomType={roomType}
      authUser={authUser}
      chatRoomId={chatRoomId} 
      chatEntries={chatEntries}>
    </ChatRoomProvider>
  );
}

export default RegularRoom;
