import React, { Component } from 'react'
import { NavBar, List, InputItem, Button, WingBlank, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { updateUser } from '../redux/actions'

import Avatar from '../components/Avatar/Avatar.jsx'

class DashenInfo extends Component {
  state = {
    avatar: '',
    post: '', // 岗位
    info: '', //简介
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
          <InputItem onChange={(val) => this.handleChange('post', val)}>求职岗位：</InputItem>
          <InputItem onChange={(val) => this.handleChange('info', val)}>个人介绍：</InputItem>
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
