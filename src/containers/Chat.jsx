import React, { Component } from 'react'
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'

import { sendMsg, updateRead } from '../redux/actions'

const Item = List.Item
class Chat extends Component {
  state = {
    content: '',
    showEmoji: false,
  }
  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight)

    this.emojis = [
      '😀',
      '😄',
      '😆',
      '😅',
      '🤣',
      '😂',
      '🙂',
      '🙃',
      '😊',
      '😉',
      '😘',
      '😀',
      '😄',
      '😆',
      '😅',
      '🤣',
      '😂',
      '🙂',
      '🙃',
      '😊',
      '😉',
      '😘',
      '😀',
      '😄',
      '😆',
      '😅',
      '🤣',
      '😂',
      '🙂',
      '🙃',
      '😊',
      '😉',
      '😘',
      '😀',
      '😄',
      '😆',
      '😅',
      '🤣',
      '😂',
      '🙂',
      '🙃',
      '😊',
      '😉',
      '😘',
      '😀',
      '😄',
      '😆',
      '😅',
      '🤣',
      '😂',
      '🙂',
      '🙃',
      '😊',
      '😉',
      '😘',
    ]
    this.emojis = this.emojis.map((emoji) => ({ text: emoji }))
  }
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentWillUnmount() {
    const targetId = this.props.match.params.userid
    this.props.updateRead(targetId)
  }
  toggleEmoji = () => {
    const showEmoji = !this.state.showEmoji
    this.setState({
      showEmoji,
    })
    // 解决显示问题
    if (showEmoji) {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
    }
  }
  handleClick = () => {
    const from = this.props.user._id
    const to = this.targetId
    const content = this.state.content.trim()
    if (content) {
      this.props.sendMsg({ from, to, content })
      this.setState({ content: '', showEmoji: false })
    }
  }
  render() {
    const { chats, users } = this.props.chatMsgs
    const userid = this.props.user._id
    const targetId = this.props.match.params.userid
    const myAvatar = this.props.user.avatar
    if (!users[targetId]) {
      return null
    }
    const chatId = [userid, targetId].sort().join('_')
    const showChats = chats.filter((chat) => chat.chat_id === chatId)
    console.log('2')
    return (
      <div>
        <NavBar icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()}>
          {users[targetId].username}
        </NavBar>
        <List>
          {showChats.map((chat) => {
            if (chat.from === targetId) {
              return (
                <Item
                  key={chat._id}
                  thumb={users[targetId].avatar && require(`../assets/images/${users[targetId].avatar}.png`).default}>
                  {chat.content}
                </Item>
              )
            } else {
              return (
                <Item
                  key={chat._id}
                  extra={<img src={myAvatar && require(`../assets/images/${myAvatar}.png`).default} alt="avatar" />}
                  className="alignRight">
                  {chat.content}
                </Item>
              )
            }
          })}
        </List>
        <div className="fixedBottom">
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            extra={
              <span>
                <span style={{ marginRight: 5 }} onClick={this.toggleEmoji}>
                  😀
                </span>
                <span className="sendBtn" onClick={this.handleClick}>
                  发送
                </span>
              </span>
            }
            onChange={(val) => this.setState({ content: val })}
          />
          {this.state.showEmoji && (
            <Grid
              data={this.emojis}
              columnNum={8}
              isCarousel={true}
              carouselMaxRow={4}
              onClick={(el) => this.setState({ content: this.state.content + el.text })}
            />
          )}
        </div>
      </div>
    )
  }
}
export default connect((state) => ({ user: state.user, chatMsgs: state.chatMsgs }), { sendMsg, updateRead })(Chat)
