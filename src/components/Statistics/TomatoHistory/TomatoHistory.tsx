import React from 'react';
import {connect} from 'react-redux';
import {Tabs} from 'antd';
import TomatoHistoryItem from './TomatoHistoryItem';
import dayjs from 'dayjs';
import _ from 'lodash';
import './TomatoHistory.scss';

const {TabPane} = Tabs;

interface ITomatoHistoryProps {
  tomatoes: any[]
}

class TomatoHistory extends React.Component<ITomatoHistoryProps> {
  // constructor(props) {
  //   super(props);
  // }

  get finishedTomatoes() {

    return this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
  }

  get abortedTomatoes() {
    return this.props.tomatoes.filter(t => t.aborted);
  }

  get dailyFinishedTomatoes() {
    const x = _.groupBy(this.finishedTomatoes, (tomato) => {
      return dayjs(tomato.started_at).format('YYYY-MM-D');
    });
    return x;
  }

  get finishedDates() {
    return Object.keys(this.dailyFinishedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a));
  }


  render() {
    const weekdayFn = (weekday) => {
      return (weekday === '0' ? '周日' : weekday === '1' ? '周一' : weekday === '2' ? '周二' :
        weekday === '3' ? '周三' : weekday === '4' ? '周四' : weekday === '5' ? '周五' : '周六');
    };
    const finishedTomatoList = this.finishedDates.map(date => {
      return (
        <div key={date} className="dailyTomatoes">
          <div className="summary">
            <p className="date">
              <span className="date_time">{dayjs(date).format('MM月D日')}</span>
              <span className="week_day">{weekdayFn(dayjs(date).format('d'))}</span>
            </p>
            <p className="finishedCount">
              完成了 {this.dailyFinishedTomatoes[date].length} 个番茄
              总计 {(this.dailyFinishedTomatoes[date].length * 25 / 60).toFixed(2)} 小时
            </p>
          </div>
          <div className="tomatoList">
            { this.dailyFinishedTomatoes[date].map(tomato => <TomatoHistoryItem key={tomato.id} tomato={tomato} itemType="finished"/>) }
          </div>
        </div>
      );
    });
    const abortedTomatoesList = this.abortedTomatoes.map(tomato => {
      return (
        <TomatoHistoryItem key={tomato.id} tomato={tomato} itemType="aborted"/>
      );
    });
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成的番茄" key="1">
          <div className="TomatoHistory" id="TomatoHistory">
            {finishedTomatoList}
          </div>
        </TabPane>
        <TabPane tab="打断记录" key="2">
          <div className="TomatoHistory" id="TomatoHistory">
            {abortedTomatoesList}
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});


export default connect(mapStateToProps)(TomatoHistory);