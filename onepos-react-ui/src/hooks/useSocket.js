import { useCallback } from 'react';
import io from 'socket.io-client';

const mode = import.meta.env.VITE_RUN_ENV || "dev";


const serverAddr = mode === 'prod' ? 'http://eztalk-chat.hrd-edu.cloudzcp.com' : 
                   mode === 'dev' ? 'http://eztalk-chatserver.hrd-edu.cloudzcp.com' :
                   mode === 'local' ? 'localhost:4000' : 
                            "" ;

const sockets = {};

const useSocket = (chatroomId) => {

  const disconnect = useCallback(() => {
    if (chatroomId && sockets[chatroomId]) {
      sockets[chatroomId].disconnect();
      delete sockets[chatroomId];
    }
  }, [chatroomId]);

  if (!chatroomId) {
    return [undefined, disconnect];
  }
  if (!sockets[chatroomId]) {
    sockets[chatroomId] = io.connect(`${serverAddr}/${chatroomId}`, {
      transports: ['websocket'],
    });
    console.info('create socket', chatroomId, sockets[chatroomId]);
  }

  return [sockets[chatroomId], disconnect];
};



export default useSocket;
