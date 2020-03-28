import React, {useState, FunctionComponent, useEffect} from 'react';

interface ICountDownHookProps {
  timer: number
  onFinish: () => void
}

let timerId: NodeJS.Timeout;

interface ICountDownHookState {
  countDown: number
}

const CountDownHook: FunctionComponent<ICountDownHookProps> = (props) => {
  const [countDown, setCountDown] = useState(props.timer);
  const minute = Math.floor(countDown / 1000 / 60);
  const second = Math.floor(countDown / 1000 % 60);
  const time = `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;

  useEffect(() => {
    document.title = `${time} - 番茄闹钟`;
    timerId = setInterval(() => {
      setCountDown(countDown - 1000);
      if (countDown < 0) {
        props.onFinish();
        document.title = '番茄闹钟'
        clearInterval(timerId);
      }
    }, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  });

  return (
    <div className="CountDown">
      {time}
    </div>
  );

};

export default CountDownHook;