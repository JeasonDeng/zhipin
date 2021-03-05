import React, { Component } from 'react'
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'

const Item = List.Item
const Brief = Item.Brief

// 由 chats 生成一个新数组来渲染数据
// 新数组样式 [{targetId, lastContent, unReadCount}]
// 1. 先得到由同 id 的最后一条 chat 组成的数组
//      声明中间变量对象存储最后一条 chat 组成的对象 { chatId: chat}
//           每次遍历判断是否已经存在同 id 的元素
//                还不存在， 直接添加
//                已经存在， 比较 create_time, 大则替换
// 2. 由该对象的属性值生成 lastChats 数组
// 3. 给中间变量的属性值添加属性 unReadCount
function getLastChats(chats, userid) {
  const lastChatObjs = {}
  chats.forEach((chat) => {
    if (!chat.read && chat.to === userid) {
      chat.unReadCount = 1
    } else {
      chat.unReadCount = 0
    }
    const chatId = chat.chat_id
    if (!lastChatObjs[chatId]) {
      lastChatObjs[chatId] = chat
    } else {
      const count = lastChatObjs[chatId].unReadCount
      if (chat.create_time > lastChatObjs[chatId].create_time) {
        lastChatObjs[chatId] = chat
      }
      lastChatObjs[chatId].unReadCount = count + chat.unReadCount
    }
  })
  // 生成 lastChats 数组
  const lastChats = Object.values(lastChatObjs)
  // 按 create_time 降序排列
  lastChats.sort((a, b) => b.create_time - a.create_time)
  console.log(lastChats)
  return lastChats
}

class Message extends Component {
  render() {
    const userid = this.props.user._id
    const { chats, users } = this.props.chatMsgs
    const lastChats = getLastChats(chats, userid)
    return (
      <List>
        {lastChats.map((lastChat) => {
          const targetId = lastChat.from === userid ? lastChat.to : lastChat.from
          const targetUser = users[targetId]
          return (
            <Item
              key={lastChat._id}
              arrow="horizontal"
              thumb={targetUser.avatar && require(`../assets/images/${targetUser.avatar}.png`).default}
              multipleLine
              extra={<Badge text={lastChat.unReadCount} overflowCount={50} />}
              onClick={() => {
                this.props.history.push(`/chat/${targetId}`)
              }}>
              {targetUser.username}
              <Brief>{lastChat.content}</Brief>
            </Item>
          )
        })}
      </List>
    )
  }
}
export default connect((state) => ({ user: state.user, chatMsgs: state.chatMsgs }))(Message)
