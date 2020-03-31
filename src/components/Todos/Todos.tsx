import React from 'react';
import {connect} from 'react-redux';
import {updateTodo} from '../../redux/actions/todos';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import './Todos.scss';
import {Collapse} from 'antd';
import dayjs from 'dayjs';

const {Panel} = Collapse;

class Todos extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  get unDeletedTodos() {
    return this.props.todos.filter(t => !t.deleted);
  }

  get unCompletedTodos() {
    return this.unDeletedTodos.filter(t => !t.completed);
  }

  get completedTodos() {
    return this.unDeletedTodos.filter(t => t.completed);
  }

  componentDidMount()  {

  }
  public render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput/>
        <div className="todoList">
          {
            this.unCompletedTodos.map(
              t => <TodoItem key={t.id} {...t}
              />)
          }
          <Collapse bordered={false}>
            <Panel header="今日完成任务" key="1">
              {
                this.completedTodos.filter(t=> dayjs(t.completed_at).isSame(dayjs(new Date()),'day')).map(
                  t => {
                    return <TodoItem key={t.id} {...t}/>;
                  })
              }
            </Panel>
          </Collapse>,
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  ...ownProps
});

const mapDispatchToProps = {
  updateTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);










