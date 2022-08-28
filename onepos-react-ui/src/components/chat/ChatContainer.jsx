import React from "react";
import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Scrollbars } from 'rc-scrollbars';
import { ChatRoomContext } from "./ChatRoomContext";
import MessageList from "./ChatMessages";

import makeSection from './makeSection';

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
import { trim } from "lodash-es";

const ChatContainer = ({chatRoomId, chatUser, chatMessages, chatPage, socket, timeKeeper}) => {
  // const chatPage  = useRef(null);
  const chatInput = useRef(null);
  const butSend   = useRef(null);

  const { loginSocketServer, onChatPageScroll } = useContext(ChatRoomContext);

  useEffect(() => {  

    const ChatBoxScrollToBottom = () => {
      if (chatPage.current == null) return;
      const scrollHeight = chatPage.current.getScrollHeight();
      const clientHeight  = chatPage.current.getClientHeight();
      console.log("ChatBoxScrollToBottom", scrollHeight, clientHeight);
      chatPage.current.scrollTop = scrollHeight - clientHeight;
    }
    // ChatBoxScrollToBottom();

    if (chatInput.current == null) return;
    chatInput.current.focus();

  }, [chatMessages]);

  const inputClick = useCallback((event) => {
    
    if (trim(chatInput.current.value)) {

      if (!socket.connected) {
        console.log("tried socket.connect()");
        socket.connect();
        return;
      }
      if (chatUser.status != "BLOCKED") loginSocketServer(chatUser);          
      sendMessage(chatInput.current);
    }
    chatInput.current.focus();

  }, [socket]);

  const inputKeyPress = useCallback(e => {    
    if (!(e.ctrlKey || e.metaKey || e.altKey) ) e.target.focus();    
    
    // When the client hits ENTER on their keyboard
    if (e.key === 'Enter') {
        if (e.shiftKey || e.altKey) {
            e.target.focus();
            return;
        }
        butSend.current.click();
        e.preventDefault();
        return false;
        
    }
  }, []);

  useEffect(() => {
    // 활성화된 사용자는 로그인시킨다.
    console.log("socket login by", chatUser.nickName);
    if (chatUser.status != "READY" && chatUser.status != "BLOCKED") loginSocketServer(chatUser);

  }, []);

  const sendMessage = (input) => {
    let message = input.value;

    // console.log("chatUser", chatUser);
    if (message && socket.connected) {
      const data = {memberId : chatUser.memberId,
                    nickName : chatUser.nickName, 
                    message};

      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', data);
      input.value = '';

    }
  };

  const chatSections = makeSection(chatMessages, chatUser, timeKeeper);

  return (
    <>
      <CardHeader>
        <CardTitle tag="h6"><span className="chat_nickname">[{chatUser.nickName}]</span>님~  
        {"  "}
        <span>
          { (chatUser.status == "READY") ? "회원들에게 가입 인사 메시지를 보내주세요~" : 
            "품격있는 대화를 나누어 주세요~" }</span>
        </CardTitle>        
      </CardHeader>
      <CardBody  className="chat_pages">
          {/* <ul className="chat_page" ref={chatPage} onScroll={onChatPageScroll}> */}
          <Scrollbars className="chat_page" autoHide ref={chatPage} onScrollFrame={onChatPageScroll}>
            <MessageList chatSections={chatSections} chatUser={chatUser}/>
          </Scrollbars>  
          {/* </ul> */}
      </CardBody>
      <CardFooter className="chat_input">
        <div className="divInputBox">

        <textarea rows="2" ref={chatInput} onKeyPress={inputKeyPress}
              className="chat_inputMessage" placeholder="Enter your message here..."/>
        <input type="text" style={{display:"none"}} />
        <button type="button" ref={butSend} onClick={inputClick}
              className="but_sendMessage">Send</button>
        </div>
      </CardFooter>
    </>
  )
}

export default ChatContainer;
