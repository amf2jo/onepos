import React from 'react';
import { useCallback } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Button,
  Collapse,
} from "reactstrap";

const ChatEntries = ({chatEntries, authUser, chatUser}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  
  const toggleLists = useCallback((target) => {
    console.log("toggle", target);
    setIsOpen(isOpen => !isOpen);
  },[]);

  return (
    <>
    <button className='toggleChatEntries' onClick={toggleLists}>
      <i className={"nc-icon " + ((isOpen) ? "nc-minimal-up" : "nc-minimal-down")} />
    </button>
   

      <Collapse className="chat_entries" isOpen={isOpen}>
        {chatUser.nickName && chatEntries.map((entry, key) => {
          const isme = (entry.memberId == authUser.userId) ?  " isme" : "";

          return (
            <li key={key} className="chat_entry">  
              <span className="badge_box">
                <span className={"badge filter " + (entry.status)} />
              </span>

              <span className={"nickName " + (entry.status) + (isme) }>
                  <span className={((isme)? "chat username" : "")}>{entry.nickName}</span> 
              </span>
            </li>
            )
          })
        }
      </Collapse>
      </>
       
  );
}

export default ChatEntries;
