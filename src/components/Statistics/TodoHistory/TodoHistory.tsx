import React from 'react';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import _ from 'lodash';
import {Tabs} from 'antd';
import TodoHistoryTodoItem from './TodoHistoryTodoItem';
import './TodoHistory.scss';

const {TabPane} = Tabs;

interface ITodoHistoryProps {
  todos: any[]
}



class TodoHistory extends React.Component<ITodoHistoryProps> {
  constructor(props) {
    super(props);
  }

  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted);
  }
  get deletedTodos() {
    return this.props.todos.filter(t => t.deleted);
  }
  get dailyFinishedTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return dayjs(todo.updated_at).format('YYYY-MM-D');
    });
  }
  get finishedDates() {
    return Object.keys(this.dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a));
  }

  render() {
    const weekdayFn = (weekday) => {
      return (weekday === '0' ? '周日' : weekday === '1' ? '周一' : weekday === '2' ? '周二' :
        weekday === '3' ? '周三' : weekday === '4' ? '周四' : weekday === '5' ? '周五' : '周六');
    };
    const finishedTodoList = this.finishedDates.map(date => {
      return (
        <div key={date} className="dailyTodos">
          <div className="summary">
            <p className="date">
              <span>{dayjs(date).format('MM月D日')}</span>
              <span>{weekdayFn(dayjs(date).format('d'))}</span>
            </p>
            <p className="finishedCount">
              完成了{this.dailyFinishedTodos[date].length}个任务
            </p>
          </div>
          <div className="todoList">
            {
              this.dailyFinishedTodos[date].map(todo => <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="finished"/>)
            }
          </div>
        </div>
      );
    });
    const deletedTodoList = this.deletedTodos.map(todo => {
      return (
          <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="deleted"/>
      );
    });

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成任务" key="1">
          <div className="TodoHistory" id="TodoHistory">
            {finishedTodoList}
          </div>
        </TabPane>
        <TabPane tab="已删除任务" key="2">
          <div className="TodoHistory" id="TodoHistory">
            {deletedTodoList}
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  ...ownProps
});

export default connect(mapStateToProps)(TodoHistory);