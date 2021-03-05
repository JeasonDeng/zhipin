import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import { withRouter } from 'react-router-dom'

class UserList extends Component {
  render() {
    const { userList } = this.props
    return (
      <WingBlank size="lg">
        <QueueAnim type="scale">
          {userList.map((user) => (
            <div key={user._id}>
              <WhiteSpace size="lg" />
              <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                <Card.Header
                  thumb={user.avatar && require(`../../assets/images/${user.avatar}.png`).default}
                  extra={<span>{user.username}</span>}
                />
                <Card.Body>
                  <div>职位：{user.post}</div>
                  <div>月薪：{user.salary}</div>
                  {user.company && <div>公司：{user.company}</div>}
                  <div>描述：{user.info}</div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </QueueAnim>
      </WingBlank>
    )
  }
}
export default withRouter(UserList)
