import React from 'react';
import {connect} from 'react-redux';
import './Statistics.scss';
import dayjs from 'dayjs';
import _ from 'lodash';
import Polygon from './Polygon';
import TodoHistory from './TodoHistory/TodoHistory';
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
  polygonWidth: null | number
  selected: string
}

class Statistics extends React.Component<IStatisticsProps, IStatisticsState> {
  constructor(props) {
    super(props);
    this.state = {
      view: View.Tomatoes,
      polygonWidth: null,
      selected: 'TomatoesHistory'
    };
  }

  private polygonRef = React.createRef<HTMLDivElement>();

  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted);
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return dayjs(todo.updated_at).format('YYYY-MM-D');
    });
  }

  get finishedTomatoes() {
    return this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
  }

  get dailyTomatoes() {
    return _.groupBy(this.finishedTomatoes, (todo) => {
      return dayjs(todo.updated_at).format('YYYY-MM-D');
    });
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this)); //监听窗口大小改变
  }

  componentWillUnmount() { //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize = () => {
    this.setState({
      polygonWidth: this.polygonRef.current && this.polygonRef.current.clientWidth
    });
  };

  render() {
    let view;
    if (this.state.view === View.Todos) {
      view = <TodoHistory/>;
    } else if (this.state.view === View.Tomatoes) {
      view = <TomatoHistory/>;
    } else if (this.state.view === View.Statistics) {
      view = <p>statistics</p>;
    }

    return (
      <div className="Statistics" id="Statistics">
        <ul className="group">
          <li className={this.state.selected === 'TomatoesHistory' ? 'active' : ''}
              onClick={() => this.setState({view: View.Tomatoes, selected: 'TomatoesHistory'})}>
            <div className="description">
              <span className="title">番茄历史</span>
              <span className="subtitle">累计完成番茄</span>
              <span className="finishNumber">{this.finishedTomatoes.length}</span>
            </div>
            <div className="polygon" ref={this.polygonRef}>
              <Polygon data={this.dailyTomatoes}
                       totalFinishedCount={this.finishedTomatoes.length}
                       polygonWidth={this.state.polygonWidth}/>
            </div>
          </li>
          <li className={this.state.selected === 'TodosHistory' ? 'active' : ''}
            onClick={() => this.setState({view: View.Todos,selected:'TodosHistory'})}>
            <div className="description">
              <span className="title">任务历史</span>
              <span className="subtitle">累计完成任务</span>
              <span className="finishNumber">{this.finishedTodos.length}</span>
            </div>
            <div className="polygon">
              <Polygon data={this.dailyTodos}
                       totalFinishedCount={this.finishedTodos.length}
                       polygonWidth={this.state.polygonWidth}/>
            </div>
          </li>
        </ul>
        {view}
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

