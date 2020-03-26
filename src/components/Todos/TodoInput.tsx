import * as React from 'react';
import {Input} from 'antd';
import {connect} from 'react-redux';
import {addTodo} from '../../redux/actions';
import axios from '../../config/axios';
import {EnterOutlined} from '@ant-design/icons';

interface ITodoInputState {
  description: string
}


interface ITodoInputProps {
  addTodo: (payload: any) => any
}

class TodoInput extends React.Component<ITodoInputProps, ITodoInputState> {
  constructor(props) {
    super(props);
    this.state = {
      description: ''
    };
    console.log(this.props);
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.postTodo();
    }
  };

  postTodo = async () => {
    try {
      const response = await axios.post('todos', {description: this.state.description});
      this.props.addTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
    this.setState(({description: ''}));
  };


  public render() {
    const {description} = this.state;
    const suffix = description === '' ? <span/> : <EnterOutlined onClick={this.postTodo}/>;
    return (
      <div className="TodoInput" id="TodoInput">
        <Input
          placeholder="添加新任务"
          value={description}
          suffix={suffix}
          onChange={e => this.setState({'description': e.target.value})}
          onKeyUp={this.onKeyUp}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
});

const mapDispatchToProps = {
  addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);








