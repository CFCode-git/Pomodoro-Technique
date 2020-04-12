import React from 'react';
import dayjs from 'dayjs';
import './TomotoList.scss';

interface ITomatoListProps {
  finishedTomatoes: any
}

const TomatoItem = function (props) {
  return (
    <div className="TomatoItem">
      <span className="timeRange"> {dayjs(props.started_at).format('HH:mm')} - {dayjs(props.ended_at).format('HH:mm')} </span>
      <span className="taskDescription"> {props.description} </span>
    </div>
  );
};

class TomatoList extends React.Component <ITomatoListProps> {
  // constructor(props) {super(props);}

  get dates() {
    // const thisday = dayjs(new Date()).date()
    // const lastday = thisday - 2
    const dates = Object.keys(this.props.finishedTomatoes);
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0, 3);
  }

  public render() {
    const list = this.dates.map(d => {
      const tomatoes = this.props.finishedTomatoes[d];
      return (
        <div  key={d} className="dailyTomato">
          <div className="title">
            <span className="dateTime"> {dayjs(d).format('M月DD日')} </span>
            <span className="finishedCount"> 完成了{tomatoes.length}个番茄 </span>
          </div>
          {
            tomatoes.map(t => <TomatoItem key={t.id} {...t}/>)
          }
        </div>
      );
    });
    return (
      <div className="TomatoList" id="TomatoList">
        {list}
      </div>
    );
  }
}

export default TomatoList;