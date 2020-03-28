import React from 'react';
import './CountDown.scss';

interface ICountDownProps {
  timer: number
  duration: number
  onFinish: () => void
}

interface ICountDownState {
  countDown: number
}

let timerId: NodeJS.Timeout;

class CountDown extends React.Component<ICountDownProps, ICountDownState> {
  constructor(props) {
    super(props);
    this.state = {
      countDown: this.props.timer
    };
  }

  get countDown() {
    const minute = Math.floor(this.state.countDown / 1000 / 60);
    const second = Math.floor(this.state.countDown / 1000 % 60);
    return (`${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`);
  }

  componentDidMount(): void {
    timerId = setInterval(() => {
      document.title = `${this.countDown} - Pomodoro番茄工作法`;
      let time = this.state.countDown;
      // time = 1
      this.setState((state) => ({countDown: state.countDown - 1000}));
      // time = -999
      if (time < 1000) { // 避免 time = -999 出现闪屏
        this.props.onFinish();
        document.title = "Pomodoro番茄工作法";
        clearInterval(timerId);
      }
    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(timerId);
  }

  render() {
    const percent = 1 - this.state.countDown / this.props.duration;
    return (
      <div className="CountDown" id="CountDown">
        <span className="restTime">{this.countDown}</span>
        <div className="progress" style={{width: `${percent * 100}%`}}/>
      </div>
    );
  };
};
export default CountDown;
