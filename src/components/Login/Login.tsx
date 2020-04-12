import React from 'react';
import {Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import axios from '../../config/axios';
import {Link} from 'react-router-dom';
import './Login.scss';


interface ILoginState {
  account: string,
  password: string,
}


class SignUp extends React.Component<any, ILoginState> {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
    };
  }


  onChange = (key: keyof ILoginState, value: string) => {
    this.setState(() => {
      const newState = {};
      newState[key] = value;
      return newState;
    });
  };


  submit = async () => {
    const {account, password} = this.state;
    try {
      await axios.post('sign_in/user', {
        account,
        password
      });
      console.log('成功');
      this.props.history.push('/');
    } catch (e) {
      window.alert('出错了')
      console.log(e.message);
      console.log('没有此用户')
      throw new Error(e);
    }
  };


  public render() {
    const {account, password} = this.state;
    return (
      <div className="Login" id="Login">
        <h1>欢迎使用番茄闹钟</h1>
        <Input
          placeholder="请输入你的用户名"
          prefix={<UserOutlined className="site-form-item-icon"/>}
          value={account}
          onChange={e => this.onChange('account', e.target.value)}
        />
        <Input.Password value={password} placeholder="请输入密码" onChange={e => this.onChange('password', e.target.value)}/>
        <div className="buttonWrapper">
          <Button type="primary" shape="round" className="loginButton" onClick={this.submit}>登录</Button>
          <p>还没有账号吗？
            <Link to="/signup"> 注册 </Link> 一下吧~
          </p>
        </div>
      </div>
    );
  }
}

export default SignUp;