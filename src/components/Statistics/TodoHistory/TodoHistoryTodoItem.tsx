import React from 'react';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import {updateTodo} from '../../../redux/actions/todos';
import axios from '../../../config/axios';
import './TodoHistoryTodoItem.scss';

interface ITodoHistoryTodoItemProps {
  todo: any
  itemType: string
  updateTodo:(payload:any)=>void
}

class TodoHistoryTodoItem extends React.Component<ITodoHistoryTodoItemProps> {
  // constructor(props) {
  //   super(props);
  // }

  updateTodo= async (params:any)=>{
    try{
      const response = await axios.put(`todos/${this.props.todo.id}`,params)
      this.props.updateTodo(response.data.resource)
    }catch (e) {
      throw new Error(e)
    }
  }

  render() {
    let action;
    let formatText;
    // let time;
    if (this.props.itemType === 'finished') {
      formatText = 'HH:mm';
      // time = this.props.todos.updated_at;
      action = (
        <div>
          <span onClick={()=>this.updateTodo({finished:false})}> 恢复 </span>
          <span onClick={()=>this.updateTodo({deleted:true})}> 删除 </span>
        </div>
      );
    } else if (this.props.itemType === 'deleted') {
      formatText = 'YYYY-MM-DD';
      // time = this.props.todos.created_at;
      action = (
        <div>
          <span onClick={()=>this.updateTodo({deleted:false})}> 恢复 </span>
        </div>
      )
    }
    return (
      <div className="TodoHistoryTodoItem" id="TodoHistoryTodoItem">
        <div className="text">
          <span className="time">{dayjs(this.props.todo.updated_at).format(`${formatText}`)}</span>
          <span className="description">{this.props.todo.description}</span>
        </div>
        <div className="action">
          {action}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
});

const mapDispatchToProps = {
  updateTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryTodoItem);