import React, {Component} from 'react';
import {Button, Input,Modal} from 'antd';
import axios from '../../config/axios';
import CountDown from './CountDown';
// import CountDownHook from './CountDownHook';
import {CloseCircleOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import './TomatoAction.scss';

interface ITomatoActionProps {
  startTomato: () => void;
  unfinishedTomato: any;
  updateTomato: (payload: any) => void;
}

interface ITomatoActionState {
  description: string;
}

const confirm = Modal.confirm

class TomatoAction extends Component <ITomatoActionProps, ITomatoActionState> {
  constructor(props) {
    super(props);
    this.state = {
      description: ''
    };
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.updateTomato({
        description: this.state.description,
        ended_at: new Date()
      });
      this.setState({description: ''});
    }
  };

  onFinish = () => {
    this.forceUpdate(); // 强制更新
  };

  showConfirm=()=> {
    confirm({
      title: '您目前正在一个番茄工作时间中,要放弃这个番茄吗?',
      icon: <ExclamationCircleOutlined />,
      content: '坚持就是胜利哦~~',
      okText:'我不行了',
      cancelText:'继续坚持',
      onOk:()=> {
        this.abortTomato()
      },
      onCancel:()=> {
        console.log('帮您取消番茄了哟');
      },
    });
  }

  abortTomato =  () => {
    this.updateTomato({aborted: true});
    document.title = "Pomodoro番茄工作法";
  };

  updateTomato = async (params: any) => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, params);
      this.props.updateTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  public render() {
    let html = <div/>;
    if (this.props.unfinishedTomato === undefined) {
      html = <Button className="startTomatoButton" onClick={() => {this.props.startTomato();}}>开始番茄</Button>;
    } else {
      const startAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();
      if (timeNow - startAt > duration) {
        html = <div className="inputWrapper">
          <Input className="inputTask"
                 value={this.state.description}
                 placeholder="请输入你刚刚完成的任务"
                 onChange={e => this.setState({description: e.target.value})}
                 onKeyUp={e => this.onKeyUp(e)}
          />
          <CloseCircleOutlined className="abort"
                               onClick={this.showConfirm}/>
        </div>;
      } else if (timeNow - startAt < duration) {
        let timer = duration - timeNow + startAt;
        html = (
          <div className="countDownWrapper">
            <CountDown timer={timer} onFinish={this.onFinish} duration={duration}/>
            <CloseCircleOutlined className="abort"
                                 onClick={this.showConfirm}/>
          </div>
        );// 倒计时
      }
    }
    return (
      <div className="TomatoAction" id="TomatoAction">
        {html}
      </div>
    );
  };
};
export default TomatoAction;