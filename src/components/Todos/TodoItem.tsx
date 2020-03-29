import React from 'react';
import {Checkbox} from 'antd';
import {connect} from 'react-redux';
import {editTodo, updateTodo} from '../../redux/actions/todos';
import classNames from 'classnames';
import './TodoItem.scss';
import {
  EnterOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import axios from '../../config/axios';


interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  editTodo:(id:number)=>any;
  updateTodo:(payload:any)=>any;
  onEditRange: () => void
}

interface ITodoItemState {
  editText: string
}

// let timeId;

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props) {
    super(props);
    this.state = {
      editText: this.props.description
    };
  }
  private inputRef = React.createRef<HTMLInputElement>();

  componentDidUpdate() {
    this.inputRef.current && this.inputRef.current.focus();
    // this.onEditRange();
  }

  // onEditRange = () => {
  //   let element = this.inputRef.current;
  //   if (element) {
  //     element.focus();
  //     // let start = element.selectionStart;
  //     // let end = element.selectionEnd;
  //     // start && end && element.setSelectionRange(start, end);
  //     // element.setSelectionRange(0, -1);
  //     // console.log(this.inputRef.current);
  //   }
  // };

  updateTodo = async ( params: any) => {
    if(params.completed){
      params.completed_at = new Date()
    }
    try {
      const response = await axios.put(`todos/${this.props.id}`, params);
      this.props.updateTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  editTodo = () => {
    // if(timeId){clearTimeout(timeId)};
    this.props.editTodo(this.props.id);
  };

  onKeyUp = (e) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.updateTodo({description: this.state.editText});
    }
  };

  public render() {
    const Editing = (
      <div className="editing">
        <input type="text" value={this.state.editText}
               onChange={e => this.setState({editText: e.target.value})}
               onKeyUp={this.onKeyUp}
               ref={this.inputRef}
        />
        <div className="iconWrapper">
          <EnterOutlined onClick={() => this.updateTodo({description: this.state.editText})}/>
          <DeleteOutlined onClick={e => this.updateTodo({deleted: true})}/>
        </div>
      </div>
    );

    const Text = <span className="text" onClick={() => this.updateTodo({completed: !this.props.completed})}>
      {this.props.description}
      <EditOutlined onClick={e => {
        e.stopPropagation();
        this.editTodo();
      }}/>
    </span>;
    // const Text2 = <span onDoubleClick={this.toEditing}>
    //                     onClick={()=>{
    //                         if(timeId){clearTimeout(timeId)}
    //                           timeId = setTimeout(() => {
    //                             this.update({completed: !this.props.completed});
    //                           }, 200);
    //                     }}
    //               {this.props.description}
    //               </span> ;

    // yarn add classnames
    const todoItemClass = classNames({
      TodoItem: true,
      editing: this.props.editing,
      completed: this.props.completed
    });

    return (
      <div className={todoItemClass} id="TodoItem">
        <Checkbox checked={this.props.completed}
                  onChange={e => this.updateTodo({completed: e.target.checked})}
        />

        {this.props.editing ? Editing : Text}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
});

const mapDispatchToProps = {
  editTodo,
  updateTodo,
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);