import { useRef, useState, useEffect, useContext, useCallback } from 'react';
import { trim } from "lodash-es";
import { AlertError } from "../ProcessError";
import { ChatRoomContext } from "./ChatRoomContext";
import useAxios from '../../hooks/useAxios';

const CheckNickname = ({authUser, chatRoomId, chatUser}) => {
  const refInput = useRef(null);
  const [registerError, setRegisterError] = useState("");
  const {joinChatEntry, existNickName} = useContext (ChatRoomContext);

  const inputKeyPress = useCallback(e => {    
    if (!(e.ctrlKey || e.metaKey || e.altKey)) {
      e.target.focus();
    }
    // When the client hits ENTER on their keyboard
    if (e.key === 'Enter') {
      // 값이 비었는지 체크
      const inputName = trim(e.target.value);
      if (!inputName) return;

      // 에러 초기화
      setRegisterError("");

      const entry = {
        memberId : authUser.userId,
        nickName : inputName,
        status : "READY"
      }
      // Entry에 이미 있는 닉네임인지 체크
      if (existNickName(entry)) {
          alert("대화명이 중복되어 사용할 수 없습니다.");
          return;
      }
      registerChatEntry(entry);  // DB에 chatEntry 등록

    }
  }, [chatUser]);  

  const registerChatEntry = useCallback((data) => {
    const { http } = useAxios("chat-service");

    http.post(`/chatRooms/${chatRoomId}/entries`, data, {})
        .then  ((response) => {
          // console.log("registerChatEntry Success :", response);
          joinChatEntry(data, true)
        })
        .catch ((error) => {
          console.log("registerChatEntry Error :", error);
          setRegisterError({...error, title :  "Failed in Register ChatEntry..."});
    });

  }, [chatRoomId]);

  useEffect(() => {  
    if (refInput.current == null) return;
    refInput.current.focus();

  }, []);

  // nickName 없다면 아직 채팅방에 입장한 적이 없으므로 ... 입장여부를 묻는다.
  if (!chatUser.nickName || registerError) {
    return (
      <>
        <div className="chat register">
          <div className="form">
            <h3>채팅방에 입장하시겠습니까?</h3>
            <h6>사용할 대화명을 입력해 주세요</h6>
            <input ref={refInput} onKeyPress={inputKeyPress} 
                   className="input" type="text" />
          </div>
        </div>  
        {(registerError) ?  <AlertError Error={registerError}/>: ""}

      </>
    );
  }
}

export default CheckNickname;
