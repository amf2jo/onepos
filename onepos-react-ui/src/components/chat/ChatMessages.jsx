import React from 'react';
import  { useCallback } from 'react';
import MessageItem from "./ChatMessage";
import { Section, StickyHeader } from './styles';

const MessageList = ({ chatSections, chatUser }) => {
  
  let prevNick="";
  let prevTime=Date.now();

  const BreakSection = (prop) => {
    return (
      <li key={prop.id} className="break_message_box">
          <span className="break_message">New</span>
          <span className="break_message_lane"></span>
        </li> 
    )
  }

  return (
    // {/* <> */}
    <ul className="chat_messages">


        {Object.entries(chatSections).map(([date, messages]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {messages.map((message, key) => {
                  // console.log(message,( message.newArrived));
                  if (message.newArrived) 
                    return <BreakSection key={key} />
                  else {
                    const data = {...message, prevNick, prevTime};
                    prevNick = message.nickName;
                    prevTime = message.timestamp;
                    // const msg = <MessageItem key={key} data={data} chatUser={chatUser}/>
                    return  <MessageItem key={key} data={data} chatUser={chatUser}/>
                  }
                })
              }
            </Section>
          );
        })}
    </ul>
    // {/* </> */}
  );
}

export default MessageList;
