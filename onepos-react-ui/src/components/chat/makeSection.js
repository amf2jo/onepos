// import dayjs from 'dayjs';
import moment from 'moment';

export default function makeSection(chatList, chatUser, timeKeeper) {
  const sections = {};

  let newArrived = false;

  const appendSection = (sections, chat, monthDate) => {
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  }
  
  const insertBreak = (t1, t2, sections) => {
    if (t1 >= t2) return;
    
    newArrived = true;
  }

  chatList.forEach((chat) => {
    // console.log("compare ", new Date(timeKeeper.getTime()), new Date(chat.timestamp));
    const monthDate = moment(chat.timestamp).format('YYYY-MM-DD');

    const baseTime = timeKeeper.getTime() ? 
                        timeKeeper.getTime() :
                        (chatUser.connectedLastAt ? 
                            chatUser.connectedLastAt : (new Date().toISOString)) 
    if (!newArrived && (new Date(baseTime) < new Date(chat.timestamp))) {
      // console.log("from now ... ", chat);
      newArrived = true;
      const data = {newArrived : true};
      appendSection(sections, data, monthDate);
    }
    // if (!newArrived) 
    //   insertBreak(timeKeeper.getTime()), new Date(chat.timestamp, sections);

    appendSection(sections, chat, monthDate);
    
    // if (Array.isArray(sections[monthDate])) {
    //   sections[monthDate].push(chat);
    // } else {
    //   sections[monthDate] = [chat];
    // }
  });




  return sections;
}
