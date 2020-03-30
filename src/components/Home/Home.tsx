import React from 'react';
import {Dropdown, Menu} from 'antd';
import {PoweroffOutlined, DownOutlined} from '@ant-design/icons';
import history from '../../config/history';
import axios from '../../config/axios';
import {connect} from 'react-redux';
import {initTodos} from '../../redux/actions/todos';
import {initTomatoes} from '../../redux/actions/tomatoes';
import Tomatoes from '../Tomatoes/Tomatoes';
import Todos from '../Todos/Todos';
import Statistics from '../Statistics/Statistics';
import './Home.scss';

const logout = () => {
  localStorage.setItem('x-token', '');
  history.push('login');
};

const menu = (
  <Menu>
    <Menu.Item key="1" onClick={logout}><PoweroffOutlined />注销</Menu.Item>
  </Menu>
);

interface IIndexState {
  user: any
}

class Home extends React.Component<any, IIndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async UNSAFE_componentWillMount() {
    await this.getMe();
    await this.getTodos();
    await this.getTomatoes();
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map(t => Object.assign({}, t, {editing: false}));
      this.props.initTodos(todos);
    } catch (e) {
      throw new Error(e);
    }
  };

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      // 放入 redux 中
      this.props.initTomatoes(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };
  getMe = async () => {
    const response = await axios.get('me');
    this.setState({user: response.data});
  };


  render() {
    return (
      <div className="Home" id="Home">
        <header>
          <span className="logo">Pomodoro</span>
          <Dropdown className="user" overlay={menu}>
            <span className="username">
              {(this.state.user && this.state.user.account) + ' , 你好'} <DownOutlined style={{marginLeft: 2}}/>
            </span>
          </Dropdown>
        </header>
        <main className="timerAndTodos">
          <Tomatoes/>
          <Todos/>
        </main>
        <Statistics/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
});

const mapDisPatchToProps = {
  initTodos,
  initTomatoes
};

export default connect(mapStateToProps, mapDisPatchToProps)(Home);