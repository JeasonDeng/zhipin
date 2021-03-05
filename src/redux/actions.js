import { io } from 'socket.io-client'

import { reqRegister, reqLogin, reqUser, reqUpdateUser, reqUserList, reqAllChats, reqReadChat } from '../api'
import {
  LOGIN_SUCC,
  LOGIN_ERR,
  UPDATE_SUCC,
  RESET_USER,
  ADD_CHAT,
  GET_USERLIST_SUCC,
  GET_ALLCHATS_SUCC,
  READ_CHAT_SUCC,
} from './action-types'

// 新增一条聊天信息
const addChat = (chat, userid) => ({ type: ADD_CHAT, data: { chat, userid } })
// 获取所有聊天信息
const getAllChatsSucc = ({ users, chats, userid }) => ({ type: GET_ALLCHATS_SUCC, data: { users, chats, userid } })
// 更新消息已读状态
const readChatSucc = (from, count) => ({ type: READ_CHAT_SUCC, data: { from, count } })

// 创建 socekt 对象并绑定监听接收服务端消息
const initSocket = (dispatch, userid) => {
  // 连接服务器, 得到代表连接的 socket 对象
  // 每次先清掉之前的 scoket, 再创建新的
  if (io.socket) {
    io.socket.close()
    io.socket = null
  }
  if (!io.socket) {
    io.socket = io('ws://localhost:4000')
    // 接收服务器发送的消息
    io.socket.on('receiveMsg', function (chat) {
      console.log('浏览器端接收到消息:', chat, userid)
      // 分发同步 action 去更新 redux 中 chats 的值
      if (chat.from === userid || chat.to === userid) {
        dispatch(addChat(chat, userid))
      }
    })
  }
}

// 发送消息（向服务端发送消息也是一个异步操作，返回 一个函数）
export const sendMsg = ({ from, to, content }) => {
  return (dispatch) => {
    io.socket.emit('sendMsg', { from, to, content })
  }
}

// 获取所有消息
// 普通的异步函数，没有 dispatch
const getAllChats = async (dispatch, userid) => {
  const response = await reqAllChats()
  const result = response.data
  if (result.code === 0) {
    initSocket(dispatch, userid)
    const { users, chats } = result.data
    dispatch(getAllChatsSucc({ users, chats, userid }))
  }
}

// 获取 lastChats
const getLastChats = (chatMsgs, userid) => {
  const lastChatObjs = {}
  chatMsgs.forEach((chat) => {
    if (!chat.read && chat.to === userid) {
      chat.unReadcount = 1
    } else {
      chat.unReadcount = 0
    }
    const chatId = chat._id
    if (!lastChatObjs[chatId]) {
      lastChatObjs[chatId] = chat
    } else {
      const count = lastChatObjs[chatId].unReadcount
      if (chat.create_time > lastChatObjs[chatId].create_time) {
        lastChatObjs[chatId] = chat
      }
      lastChatObjs[chatId].unReadcount = count + chat.unReadcount
    }
  })
  const lastChats = Object.values(lastChatObjs)
  return lastChats
}

// 更新消息已读状态
export const updateRead = (from) => {
  return async (dispatch) => {
    const response = await reqReadChat(from)
    const result = response.data
    if (result.code === 0) {
      const count = result.data
      dispatch(readChatSucc(from, count))
    }
  }
}

// 登录成功
const loginSucc = (user) => ({ type: LOGIN_SUCC, data: user })
// 注册/登录失败
const loginErr = (msg) => ({ type: LOGIN_ERR, data: msg })

// 更新信息成功
const updateSucc = (user) => ({ type: UPDATE_SUCC, data: user })
// 重置用户信息
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })

// 获取用户列表
const getUserListSucc = (userList) => ({ type: GET_USERLIST_SUCC, data: userList })

// 异步注册
export const register = (user, callback) => {
  return async (dispatch) => {
    const response = await reqRegister(user)
    const result = response.data
    if (result.code === 1) {
      // 注册失败
      dispatch(loginErr(result.msg))
    } else {
      // 注册成功
      getAllChats(dispatch, result.data._id)
      dispatch(loginSucc(result.data))
      console.log(result.data)
    }
    callback && callback(result)
  }
}

// 异步登录
export const login = ({ username, password }, callback) => {
  return async (dispatch) => {
    const response = await reqLogin({ username, password })
    const result = response.data
    if (result.code === 1) {
      // 登录失败
      dispatch(loginErr(result.msg))
    } else {
      getAllChats(dispatch, result.data._id)
      dispatch(loginSucc(result.data))
    }
    callback && callback(result)
  }
}

// 根据 cookie 自动登录
export const getUser = (callback) => {
  return async (dispatch) => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 1) {
      dispatch(loginErr(result.msg))
    } else {
      console.log(result.data._id)
      getAllChats(dispatch, result.data._id)
      dispatch(loginSucc(result.data))
    }
    callback && callback(result)
  }
}

// 更新用户信息
export const updateUser = (user, callback) => {
  return async (dispatch) => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if (result.code === 1) {
      dispatch(resetUser(result.msg))
    } else {
      dispatch(updateSucc(result.data))
    }
    callback && callback(result)
  }
}

// 获取用户列表
export const getUserList = (type) => {
  return async (dispatch) => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
      console.log(result.data)
      dispatch(getUserListSucc(result.data))
    }
  }
}
