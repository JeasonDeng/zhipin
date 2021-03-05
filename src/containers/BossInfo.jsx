import React, { Component } from 'react'
import { NavBar, List, InputItem, Button, WingBlank, Toast, TextareaItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { updateUser } from '../redux/actions'

import Avatar from '../components/Avatar/Avatar.jsx'

class DashenInfo extends Component {
  state = {
    avatar: '',
    post: '', // 岗位
    company: '', // 公司
    salary: '', // 薪水
    info: '', // 要求
  }
  setAvatar = (avatar) => {
    this.setState({ avatar })
  }
  handleChange = (attr, val) => {
    this.setState({
      [attr]: val,
    })
  }
  updateUser = () => {
    this.props.updateUser(this.state, (result) => {
      if (result.code === 1) {
        Toast.fail(result.msg)
      } else {
        const { type } = this.props.user
        this.props.history.replace(`/${type}`)
      }
    })
  }
  render() {
    return (
      <div>
        <NavBar>完善个人信息</NavBar>
        <Avatar setAvatar={this.setAvatar} />
        <List>
          <InputItem onChange={(val) => this.handleChange('post', val)}>招聘岗位：</InputItem>
          <InputItem onChange={(val) => this.handleChange('company', val)}>公司名称：</InputItem>
          <InputItem onChange={(val) => this.handleChange('salary', val)}>职位薪资：</InputItem>
          <TextareaItem title="职位要求：" rows={3} onChange={(val) => this.handleChange('info', val)} />
        </List>
        <WingBlank>
          <Button type="primary" style={{ marginTop: 50 }} onClick={this.updateUser}>
            保&nbsp;&nbsp;&nbsp;存
          </Button>
        </WingBlank>
      </div>
    )
  }
}
export default connect((state) => ({ user: state.user }), { updateUser })(DashenInfo)
