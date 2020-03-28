import React, {Component} from 'react';
import {Button} from 'antd';

interface ITomatoActionProps {
  startTomato: () => void;
  unfinishedTomato: any;
}

class TomatoAction extends Component <ITomatoActionProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className="TomatoAction" id="TomatoAction">
        <Button className="startTomatoButton" onClick={() => {this.props.startTomato();}}>开始番茄</Button>
      </div>
    );
  };
};
export default TomatoAction;