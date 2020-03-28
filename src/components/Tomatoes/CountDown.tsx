import React from 'react';

interface ICountDownProps {
  timer: number
}

interface ICountDownState {
  countDown:number
}

class CountDown extends React.Component<ICountDownProps,ICountDownState> {
  constructor(props) {
    super(props);
    this.state={
      countDown:this.props.timer
    }
  }

  componentDidMount(): void {
    setInterval(()=>{
      let time = this.state.countDown
      this.setState((state)=>({countDown:state.countDown-1000}))
      if(time < 0){
        // 告诉父组件 完成倒计时
      }
    },1000)
  }

  render() {
    const minute = Math.floor(this.state.countDown / 1000 / 60);
    const second = Math.floor(this.state.countDown / 1000 % 60);
    const time = `${minute<10?`0${minute}`:minute}:${second<10?`0${second}`:second}`;

    return (
      <div className="CountDown" id="CountDown">
        {time}
      </div>
    );
  };
};
export default CountDown;