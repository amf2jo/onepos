
// import axios from 'axios'
import { useState, useEffect } from 'react';
import useAxios from './useAxios';

let options = {};
// const { http } = useAxios("chat-service");

const getChatRoom = (communityId, roomType, deps) => {
  const { http } = useAxios("chat-service");

  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    
    const process = async() => {
      setLoading(true);
      try {
        const resolved = await http.get(`/${roomType}ChatRooms/${communityId}`, {}, options);
        // console.log("resolved : " + resolved.data.data);
        setResolved(resolved.data.data);
      } catch (e) {
        console.log("error : " + e);
        setError(e);
      }
      setLoading(false);
    };

    process();
    
  }, deps);

  return [loading, resolved, error] ;
}


const getChatEntries = (chatRoomId, deps) => {
  const { http } = useAxios("chat-service");

  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const process = async() => {
      setLoading(true);
      try {
        const resolved = await http.get(`/chatRooms/${chatRoomId}/entries`, {}, options);
        // const resolved = await myAxios.get(`/chatRooms/${chatRoomId}/entries`, {}, options);
        setResolved(resolved.data.data);
      } catch (e) {
        console.log("error : " + e);
        setError(e);
      }
      setLoading(false);
    };
    
    process();
    
  }, deps);

  return [loading, resolved, error] ;
}

// 모든 채팅방 조회
const getChatRooms = (communityId) => {
  const { http } = useAxios("chat-service");
  // console.log("getChatRooms", communityId)
  return http.get(`/chatRooms/${communityId}`);  
};

const createChatRoom = (roomType, data) => {
  const { http } = useAxios("chat-service");
  // console.log("createChatRoom");
  return http.post(`/${roomType}ChatRooms`, data);
};

const ChatRoomService = {
  getChatRoom,
  getChatEntries,
  getChatRooms, 
  createChatRoom,  
}
  
export default ChatRoomService;
