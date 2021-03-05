import React, { Component } from 'react'
import { Result, WhiteSpace, Button, List, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import { resetUser } from '../redux/actions.js'

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert

class Me extends Component {
  logout = () => {
    alert('退出', '确定退出登录吗?', [
      {
        text: '取消',
        onPress: () => console.log('cancel'),
      },
      {
        text: '退出',
        onPress: () => {
          // 清除 cookie
          Cookies.remove('userid')
          // 重置 redux
          this.props.resetUser()
        },
      },
    ])
  }
  render() {
    const { avatar, username, company, post, salary, info } = this.props.user
    return (
      <div>
        <Result
          img={avatar && <img src={require(`../assets/images/${avatar}.png`).default} alt="avatar" />}
          title={username}
          message={company}
        />
        <WhiteSpace />
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位：{post}</Brief>
            <Brief>简介：{info}</Brief>
            {salary && <Brief>薪资：{salary}</Brief>}
          </Item>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <Button type="primary" onClick={this.logout}>
          退出登录
        </Button>
      </div>
    )
  }
}
export default connect((state) => ({ user: state.user }), { resetUser })(Me)
