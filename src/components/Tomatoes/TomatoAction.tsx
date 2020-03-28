import React, {Component} from 'react';
import {Button} from 'antd';
import axios from '../../config/axios';
import CountDown from './CountDown';
import {CloseCircleOutlined} from '@ant-design/icons';
import {updateTomato} from '../../redux/actions/tomatoes';


interface ITomatoActionProps {
  startTomato: () => void;
  unfinishedTomato: any;
  updateTomato: (payload: any) => void;
}

interface ITomatoActionState {
  description: string;
}

class TomatoAction extends Component <ITomatoActionProps, ITomatoActionState> {
  constructor(props) {
    super(props);
    this.state = {
      description: ''
    };
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addDescription();
    }
  };

  addDescription = async () => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, {
        description: this.state.description, ended_at: new Date()
      });
      this.props.updateTomato(response.data.resource);
      this.setState({description: ''});
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
        html = <div>
          <input value={this.state.description}
                 placeholder="请输入你刚刚完成的任务"
                 onChange={e => this.setState({description: e.target.value})}
                 onKeyUp={e => this.onKeyUp(e)}
          />
          <CloseCircleOutlined/>
        </div>;
      } else if (timeNow - startAt < duration) {
        let timer = duration - timeNow + startAt;
        html = <CountDown timer={timer}/>;// 倒计时
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