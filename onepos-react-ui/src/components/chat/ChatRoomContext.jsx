// reactstrap components
import {
  Card,
  List,
  Col,
} from "reactstrap";

import { useState, useCallback, createContext } from 'react';
import { useEffect, useRef, useContext } from 'react';
import ChatEntries from './ChatEntries';
import ChatContainer from './ChatContainer';
import CheckNickname from './CheckNickname';
import useSocket from "../../hooks/useSocket";
import useTimeKeeper from "../../hooks/useTimeKeeper";

export const ChatRoomContext = createContext(); 

const ChatRoomProvider = (prop) => {
  const {roomType, chatRoomId, authUser} = prop;
  
  const [chatEntries,  setChatEntries] = useState(prop.chatEntries);
  const [chatMessages, setChatMessages] = useState([]);
  const [fetching, setFetching] = useState(false);

  const [pageIndex, setPageIndex] = useState(1); 
  const [prevIndex, setPrevIndex] = useState(0); 
  const [msgEvent, setMsgEvent] = useState("");
  const [prevSH, setPrevSH] = useState(0); 
  const refChatPage = useRef(null);
  const pageSize = 20;
  const refScrollInfo = useRef(null);

  const [socket, disconnectSocket] = useSocket(chatRoomId);
  const [timeKeeper, clear] = useTimeKeeper(chatRoomId);
  
  const userInfo = chatEntries.filter(entry => entry.memberId===authUser.userId);
  const [chatUser, setChatUser] = useState(
          userInfo[0] || {memberId:authUser.userId, nickName:null, status:'', connectedLastAt:null} 
        );
  
  const joinChatEntry = useCallback((newEntry, opt) => {

    if (existNickName(newEntry)) {
      if (newEntry.status != "READY" && newEntry.status != "BLOCKED") setEntryStatus(newEntry.nickName, "ACTIVE");
      return false;
    }
    setChatEntries(chatEntries => chatEntries.concat(newEntry));

    // 현재 유저를 세팅
    if (opt) setChatUser(newEntry);

    return true;

  }, [chatEntries]);

  const existNickName = useCallback((newEntry) => {

    const duplicated = chatEntries.filter(entry => entry.nickName == newEntry.nickName);
    return (duplicated.length > 0) ;

  }, [chatEntries]);

  const setEntryStatus = useCallback((nickName, status) => {
    setChatEntries(chatEntries => chatEntries.map(entry => 
                                  entry.nickName===nickName? {...entry, status: status } : entry)); 

  }, []);

  useEffect(() => {

    // Whenever the server emits 'add user', show the status welcome message
    socket.on('onlineList', (data) => {
      // 모든 리스트를 일단 INACTIVE로 만든 다음
      setChatEntries(chatEntries => chatEntries.map(entry => entry.nickName? {...entry, status : "INACTIVE"} : entry )); 
      // server에서 받은 data에 들어있는 entry만 ACTIVE 시킨다.
      data.forEach(element => { setEntryStatus(element, 'ACTIVE'); });
    });

    socket.on('add user', (data) => {
      // Display the welcome message
      const message = 'logined in sesrver ';
      showStatus(message);

    });
  
    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', (data) => {
      // console.log("new message", data, roomType)
      addChatMessage({...data, timestamp: Date.now()});
      setEntryStatus(data.nickName, 'ACTIVE');
      setMsgEvent(msgEvent => "messaging");
      timeKeeper.setTime(); 
    });
  
    // Whenever the server emits 'user joined', status it in the chat body
    socket.on('user joined', (data) => {
      
      showStatus(`${data.nickName} joined`);
      joinChatEntry(data, false);
      
    });  
  
    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', (data) => {
      
      showStatus(`${data} left`);
      setEntryStatus(data, 'INACTIVE');
    });
  
    socket.on('disconnect', () => {
      showStatus(`you(${chatUser.nickName}) lost server connection`);
      setEntryStatus(chatUser.nickName, 'INACTIVE');
    });

    socket.io.on('reconnect', () => {
      showStatus('you have been reconnected');
      loginSocketServer(chatUser);
    });

    socket.io.on('reconnect_error', () => {
      showStatus('attempt to reconnect has failed');
    });

    socket.on('wrong connection', () => {
      showStatus('need to refresh screen');
    });  

      
    socket.on('fetched message', ({chatData, fetchedIndex}) => {
      // console.log('fetched', fetchedIndex, chatData );

      if (fetchedIndex == 1) {
        setChatMessages(chatMessages => chatData );
      }
      else {
        setChatMessages(chatMessages => chatData.concat(chatMessages) );
      }

      setPrevIndex(prevIndex => fetchedIndex);
      if (chatData.length >= pageSize) {
        setPageIndex(pageIndex => fetchedIndex+1);
        setMsgEvent(msgEvent => "fetching");
      }
        
    });

    // 가장 최신 메시지를 가져온다.
    fetchMessage();

    return () => {
      console.log("socket.off ", socket.id, socket.nsp);
      socket.off();
      // socket.disconnect();
    };
  }, [chatRoomId]);


  const scrollChatPage = () => {    
    
    if (refChatPage.current == null) return;
    // console.log("scroll", pageIndex)
      
    const newScrollTop = refChatPage.current.getScrollHeight() - prevSH;
    if (msgEvent == "messaging" ||  pageIndex < 2 ) {
      refChatPage.current.scrollToBottom()
    }
    else {
      refChatPage.current.scrollTop ( newScrollTop );
    }
    // console.log ("new scrolltop", pageIndex, newScrollTop, msgEvent )
    setFetching(false);
  }

  // chatMessage 변경시 화면 Scroll
  useEffect(() => {

    scrollChatPage();

  }, [chatMessages]);

  const showStatus = (status, options) => {
    console.log ("### socket client :", status, new Date());
  }

  const loginSocketServer = useCallback((loginUser) => {
    // 처음 로딩시 현재 사용중인 socket에 username을 등록하기 위해 사용한다.
    const status = (loginUser.status == "READY" || loginUser.status == "BLOCKED") ? 
                    loginUser.status : "ACTIVE";
    socket?.emit("login", {...loginUser, status : status});
  }
  );

  const addChatMessage = useCallback((data, options) => {
    setChatMessages(chatMessages => chatMessages.concat({...data}));
  }, [chatMessages]); 


  const fetchMessage = () => {
    if (pageIndex == prevIndex) return;
    // console.log("fetch : ", pageIndex, prevIndex);
    socket?.emit("fetch", {pageSize, pageIndex});
  }

  // for scroll-up event
  const onChatPageScroll = useCallback((values) => {
    // console.log(refScrollInfo.current)
    if (refScrollInfo.current)
      refScrollInfo.current.textContent = "scrollTop=" + values.scrollTop + 
                                        ", scrollHeight=" + values.scrollHeight + 
                                        ", previosHeight=" + prevSH;
    if (values.scrollTop > 0) return;
    
    setPrevSH(values.scrollHeight);
    fetchMessage();

  },
  [chatMessages]
  );

  return (
    <ChatRoomContext.Provider value={{joinChatEntry, existNickName, loginSocketServer, onChatPageScroll}}>
      <Col md="3"> 
        <ChatEntries
          chatEntries={chatEntries}
          authUser={authUser}
          chatUser={chatUser}
        >
        </ChatEntries>

      </Col> 
      
      <Col>
        <Card className={`chatRoom ${roomType}`}> 
          {(!chatUser.nickName) ?
            <CheckNickname 
                authUser={authUser}
                chatRoomId={chatRoomId} 
                chatUser={chatUser}
             /> :
            <ChatContainer 
                authUser={authUser}
                chatRoomId={chatRoomId} 
                chatUser={chatUser}
                chatMessages={chatMessages}
                chatPage={refChatPage}
                socket={socket}
                timeKeeper={timeKeeper}
            />}
        </Card>
      </Col> 
      <div ref={refScrollInfo} className="hidden">ScrollTop ...</div>
    </ChatRoomContext.Provider>
  );  
}

export default ChatRoomProvider;
