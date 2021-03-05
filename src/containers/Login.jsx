import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import { List, InputItem, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../redux/actions'

import Logo from '../components/Logo/Logo'

class Login extends Component {
  state = {
    username: '',
    password: '',
  }
  UNSAFE_componentWillReceiveProps() {}
  handleChange = (key, val) => {
    this.setState({
      [key]: val,
    })
  }
  login = () => {
    this.props.login(this.state, result => {
      if (result.code === 1) {
        Toast.fail(result.msg)
      } else {
        // Toast.success('成功')
        const { type, avatar } = result.data
        if (avatar) {
          this.props.history.push(`/${type}`)
        } else {
          this.props.history.push(`/${type}info`)
        }
      }
    })
  }
  goRegister = () => {
    this.props.history.replace('/register')
  }
  render() {
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <WhiteSpace />
            <InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username', val)}>
              用&nbsp;户&nbsp;名：
            </InputItem>
            <WhiteSpace />
            <InputItem type="password" placeholder="请输入密码" onChange={val => this.handleChange('password', val)}>
              密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：
            </InputItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.login}>
              登录
            </Button>
            <WhiteSpace />
            <Button onClick={this.goRegister}>没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect(state => ({ user: state.user }), { login })(Login)
