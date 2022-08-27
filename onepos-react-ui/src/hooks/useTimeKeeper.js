import { useCallback } from 'react';

const timestamps = {};
const useTimeKeeper = (chatroomId) => {

  const clear = useCallback(() => {
    if (chatroomId ) {
      delete timestamps[chatroomId];
    }
  }, [chatroomId]);

  if (!chatroomId) {
    return [undefined, clear];
  }
  if (!timestamps[chatroomId]) {
    timestamps[chatroomId] = new TimeKeeper(chatroomId);
  }

  return [timestamps[chatroomId], clear];
}


class TimeKeeper {
  constructor(props) {
     this.id = props;
     this.currTime = null;
  }

  setTime = (newTime) => {

    // const gap = new Date() - new Date(this.currTime );
    // 적어도 1분 동안은 세팅된 시간을 유지
    // if (!setOption && gap < 60 * 1000) return ;

    this.currTime = newTime ? newTime : new Date().toISOString();
    // console.log( "timeKeeper", this.id, ":", this.currTime );
    return this.currTime;
  } 

  getTime = () => {
    return this.currTime;
  }
}

export default useTimeKeeper;
