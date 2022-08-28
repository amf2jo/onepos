import React from 'react';
import reactStringReplace from 'react-string-replace';

const COLORS = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#88d03a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7',
  '#3b882b', '#007a97', '#ef0054', '#70709f'
];

const getNicknameColor = (nickName) => {
  // Compute hash code
  let hash = 7;
  for (let i = 0; i < nickName.length; i++) {
    hash = nickName.charCodeAt(i) + (hash << 5) - hash;
  }
  // Calculate color
  const index = Math.abs(hash % COLORS.length);
  return { color :  COLORS[index]};
}

const MessageItem = (prop) => {
  const {prevNick, prevTime, nickName, message} = prop.data;
  // const {break } = prop.data;
  const chatUser = prop.chatUser;
  const key = prop.id;
  
  const timestamp = (prop.data.timestamp) ? prop.data.timestamp : new Date().toISOString();
  const dispTime = (new Date(timestamp)).toLocaleTimeString(); 
  const gap = new Date(timestamp) - new Date(prevTime);
  // console.log("timestamp:", timestamp)
  // console.log("time gap", prevNick, prevTime, gap);
  const isme = (nickName == chatUser.nickName) ? "isme" : "";
  
  const showName = (prevNick == nickName && gap < 60*1000) ? "" : 
                   <div className={"messageUser " + (isme)} 
                        style={getNicknameColor(nickName)}>
                          <span>{nickName}</span> 
                        <span className="timestamp">{dispTime}</span>
                    </div> ;


  // injectATag(message);
  return (
    <li className="chat_message" key={key}>
          {showName}
      <div className="messageBody">
        <div className={"messageText " + (isme)} >{message}</div>
      </div> 
    </li>
  );
};

const injectATag = (data) => {
  // http/https를 포함하는 url 패턴 찾기
  const pattern = /(^http|[0-9@:%_\+.~#?& ]http)(s)?:[\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  
  // const pattern = /(http(s)?):[\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gim
  // const pattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)

  // pattern.test(data);

  const str = reactStringReplace(data, pattern, (match, i) => {
          <div>{match}</div>
                // <a href={match}>{match}</a>    
  });

  console.log("link", str);
  
}

export default MessageItem;
