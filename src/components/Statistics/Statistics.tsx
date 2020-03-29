import React from 'react';
import {connect} from 'react-redux';
import './Statistics.scss';
import dayjs from 'dayjs';
import _ from 'lodash';
import Polygon from './Polygon';

interface IStatisticsProps {
  todos: any[]
}

class Statistics extends React.Component<IStatisticsProps> {
  constructor(props) {super(props);}

  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted);
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return dayjs(todo.updated_at).format('YYYY-MM-D');
    });
  }

  render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>累计完成 {this.finishedTodos.length} 个任务

            <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  ...ownProps
});

export default connect(mapStateToProps)(Statistics);

