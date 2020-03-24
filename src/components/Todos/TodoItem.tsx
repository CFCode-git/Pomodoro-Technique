import * as React from 'react';
import {Checkbox} from 'antd';
import classNames from 'classnames';
import './TodoItem.scss';
import {
  EnterOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';


interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  update: (id: number, params: any) => void
  toEditing: (id: number) => void
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


  update = (params: any) => {
    this.props.update(this.props.id, params);
  };

  toEditing = () => {
    // if(timeId){clearTimeout(timeId)};
    this.props.toEditing(this.props.id);

  };

  onKeyUp = (e) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.update({description: this.state.editText});
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
          <EnterOutlined onClick={() => this.update({description: this.state.editText})}/>
          <DeleteOutlined onClick={e => this.update({deleted: true})}/>
        </div>
      </div>
    );

    const Text = <span className="text" onClick={() => this.update({completed: !this.props.completed})}>
      {this.props.description}
      <EditOutlined onClick={e => {
        e.stopPropagation();
        this.toEditing();
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
                  onChange={e => this.update({completed: e.target.checked})}
        />

        {this.props.editing ? Editing : Text}
      </div>
    );
  }
}

export default TodoItem;