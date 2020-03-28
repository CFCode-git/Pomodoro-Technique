import * as React from 'react';
import {Dropdown, Menu} from 'antd';
import Todos from '../Todos/Todos';
import {UserOutlined, DownOutlined} from '@ant-design/icons';
import history from '../../config/history';
import axios from '../../config/axios';
import './Home.scss';
import '../Tomatoes/Tomatoes';
import Tomatoes from '../Tomatoes/Tomatoes';


const logout = () => {
  localStorage.setItem('x-token', '');
  history.push('login');
};


const menu = (
  <Menu>
    <Menu.Item key="1"><UserOutlined/>个人设置</Menu.Item>
    <Menu.Item key="2" onClick={logout}><UserOutlined/>注销</Menu.Item>
  </Menu>
);


interface IRouter {
  history: any;
}

interface IIndexState {
  user: any
}

class Home extends React.Component<IRouter, IIndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }


  async componentWillMount() {
    await this.getMe();
  }

  getMe = async () => {
    const response = await axios.get('me');
    this.setState({user: response.data});
  };


  render() {
    return (
      <div className="Home" id="Home">
        <header>
          <span className="logo">LOGO</span>
          <Dropdown className="user" overlay={menu}>
            <span>
              {this.state.user && this.state.user.account} <DownOutlined style={{marginLeft: 2}}/>
            </span>
          </Dropdown>
        </header>
        <main>
          <Tomatoes/>
          <Todos/>
        </main>
      </div>
    );
  }
}

export default Home;