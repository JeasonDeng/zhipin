import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import { List, InputItem, WhiteSpace, WingBlank, Radio, Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Logo from '../components/Logo/Logo'
import { register } from '../redux/actions'

const Item = List.Item

class Register extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
  }
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'dashen',
  }
  handleChange = (key, val) => {
    this.setState({
      [key]: val,
    })
  }
  register = () => {
    this.props.register(this.state, (result) => {
      if (result.code === 1) {
        Toast.fail(result.msg)
      } else {
        // Toast.success('成功')
        this.props.history.push(`/${result.data.type}info`)
      }
    })
  }
  goLogin = () => {
    this.props.history.replace('/login')
  }
  render() {
    const { type } = this.state
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <WhiteSpace />
            <InputItem placeholder="请输入用户名" onChange={(val) => this.handleChange('username', val)}>
              用&nbsp;户&nbsp;名：
            </InputItem>
            <WhiteSpace />
            <InputItem type="password" placeholder="请输入密码" onChange={(val) => this.handleChange('password', val)}>
              密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：
            </InputItem>
            <WhiteSpace />
            <InputItem type="password" placeholder="请确认密码" onChange={(val) => this.handleChange('password2', val)}>
              确认密码：
            </InputItem>
            <WhiteSpace />
            <Item>
              用户类型：&nbsp;&nbsp;
              <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>
                大神
              </Radio>
              &nbsp;&nbsp;
              <Radio checked={type === 'boss'} onChange={() => this.handleChange('type', 'boss')}>
                老板
              </Radio>
            </Item>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>
              注册
            </Button>
            <WhiteSpace />
            <Button onClick={this.goLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect((state) => ({}), { register })(Register)
