import * as React from 'react';
import {Checkbox} from 'antd';
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
        />
        <div className="iconWrapper">
          <EnterOutlined onClick={()=>this.update({description: this.state.editText})}/>
          <DeleteOutlined onClick={e => this.update({deleted: true})}/>
        </div>
      </div>
    );

    const Text = <span onClick={() => this.update({completed: !this.props.completed})}>
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


    return (
      <div className="TodoItem" id="TodoItem">
        <Checkbox checked={this.props.completed}
                  onChange={e => this.update({completed: e.target.checked})}
        />
        {
          this.props.editing ?
            Editing : Text
        }
      </div>
    );
  }
}

export default TodoItem;