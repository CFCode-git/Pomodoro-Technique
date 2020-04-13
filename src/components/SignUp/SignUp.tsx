import React from 'react';
import {Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import axios from '../../config/axios';
import {Link} from 'react-router-dom';
import './SignUp.scss';


interface ISignUpState {
  account: string,
  password: string,
  passwordConformation: string
}


class SignUp extends React.Component<any, ISignUpState> {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConformation: ''
    };
  }


  // onChange = (key: keyof ISignUpState, value: string) => {
  //   this.setState(() => {
  //     const newState = {};
  //     newState[key] = value;
  //     return newState;
  //   });
  // };

  onChangeAccount = (e) => {
    this.setState({account: e.target.value});
  };

  onChangePassword = (e) => {
    this.setState({password: e.target.value});
  };

  onChangePasswordConformation = (e) => {
    this.setState({passwordConformation: e.target.value});
  };


  submit = async () => {
    const {account, password, passwordConformation} = this.state;
    try {
      await axios.post('sign_up/user', {
        account: account,
        password: password,
        password_confirmation: passwordConformation
      });
      console.log('成功');
      this.props.history.push('/');
    } catch (e) {
      window.alert('出错了');
      console.log(e.message);
      console.log('密码错误');
      throw new Error(e);
    }
  };


  public render() {
    const {account, password, passwordConformation} = this.state;
    return (
      <div className="SignUp" id="SignUp">
        <h1>注册</h1>
        <Input
          placeholder="请输入你的用户名"
          prefix={<UserOutlined className="site-form-item-icon"/>}
          value={account}
          onChange={this.onChangeAccount}
        />
        <Input.Password value={password} placeholder="请输入密码" onChange={this.onChangePassword}/>
        <Input.Password value={passwordConformation} placeholder="请确认密码"
                        onChange={this.onChangePasswordConformation}/>
        <div className="buttonWrapper">
          <Button type="primary" shape="round" className="signUpButton" onClick={this.submit}>注册</Button>
          <p>如果你有账号，可以立即
            <Link to="/login"> 登录 </Link> 哦
          </p>
        </div>
      </div>
    );
  }
}

export default SignUp;