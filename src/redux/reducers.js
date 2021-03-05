import { combineReducers } from 'redux'

import {
  LOGIN_SUCC,
  LOGIN_ERR,
  UPDATE_SUCC,
  RESET_USER,
  GET_USERLIST_SUCC,
  ADD_CHAT,
  GET_ALLCHATS_SUCC,
  READ_CHAT_SUCC,
} from './action-types'

const initialUser = {
  username: '',
  type: '',
}

function user(state = initialUser, action) {
  switch (action.type) {
    case LOGIN_SUCC:
      return action.data
    case LOGIN_ERR:
      return { msg: action.data }
    case UPDATE_SUCC:
      return action.data
    case RESET_USER:
      return { msg: action.data }
    default:
      return state
  }
}

function userList(state = [], action) {
  switch (action.type) {
    case GET_USERLIST_SUCC:
      return action.data
    default:
      return state
  }
}

const initChatMsg = {
  users: {}, // 所有用户信息的对象  属性名: userid, 属性值是: {username, header}
  chats: [], // 当前用户所有相关msg的数组
  unReadCount: 0, // 总的未读数量
}

function chatMsgs(state = initChatMsg, action) {
  switch (action.type) {
    case GET_ALLCHATS_SUCC:
      const { users, chats, userid } = action.data
      return {
        users,
        chats,
        unReadCount: chats.reduce((pre, chat) => pre + (!chat.read && chat.to === userid ? 1 : 0), 0),
      }
    case ADD_CHAT:
      const { chat } = action.data
      return {
        users: state.users,
        chats: [...state.chats, chat],
        unReadCount: state.unReadCount + (!chat.read && chat.to === action.data.userid ? 1 : 0),
      }
    case READ_CHAT_SUCC:
      const { count, from } = action.data
      return {
        users: state.users,
        chats: state.chats.map((chat) => {
          if (chat.from === from && !chat.read) {
            return { ...chat, read: true }
          }
          return chat
        }),
        unReadCount: state.unReadCount - count,
      }
    default:
      return state
  }
}

function lastChats(state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
  chatMsgs,
  lastChats,
})
