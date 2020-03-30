import React from 'react';
import {connect} from 'react-redux';
import './Statistics.scss';
import dayjs from 'dayjs';
import _ from 'lodash';
import Polygon from './Polygon';
import TodoHistory from './TodoHIstory/TodoHistory';
import TomatoHistory from './TomatoHistory/TomatoHistory';

enum View {
  Todos = 'Todos',
  Tomatoes = 'Tomatoes',
  Statistics = 'Statistics'
}

interface IStatisticsProps {
  todos: any[]
  tomatoes: any[]
}

interface IStatisticsState {
  view: string
}

class Statistics extends React.Component<IStatisticsProps, IStatisticsState> {
  constructor(props) {
    super(props);
    this.state = {
      view : View.Tomatoes
    };
  }

  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted);
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return dayjs(todo.updated_at).format('YYYY-MM-D');
    });
  }

  get finishedTomatoes() {
    console.log(this.props.tomatoes);
    return this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
  }

  get dailyTomatoes() {
    return _.groupBy(this.finishedTomatoes, (todo) => {
      return dayjs(todo.updated_at).format('YYYY-MM-D');
    });
  }

  render() {
    let x;
    if (this.state.view === View.Todos) {
      x = <TodoHistory/>;
    } else if (this.state.view === View.Tomatoes) {
      x = <TomatoHistory/>;
    } else if (this.state.view === View.Statistics) {
      x = <p>statistics</p>;
    }
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li className="Statistics" onClick={() => this.setState({view: View.Statistics})}>
            统计
          </li>
          <li className="TomatoHistory" onClick={() => this.setState({view: View.Tomatoes})}>
            <span>番茄历史</span><br/>
            <span>累计完成番茄</span><br/>
            <span>{this.finishedTomatoes.length}</span>
            <Polygon data={this.dailyTomatoes} totalFinishedCount={this.finishedTomatoes.length}/>
          </li>
          <li className="TodoHistory" onClick={() => this.setState({view: View.Todos})}>
            <span>任务历史</span><br/>
            <span>累计完成任务</span><br/>
            <span>{this.finishedTodos.length}</span>
            <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
        {x}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  tomatoes: state.tomatoes,
  ...ownProps
});

export default connect(mapStateToProps)(Statistics);

