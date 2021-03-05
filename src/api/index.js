import ajax from './ajax'

// 注册请求
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 登录请求
export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, 'POST')
// 自动登录请求
export const reqUser = () => ajax('/user')
// 更新个人信息请求
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// 获取用户列表
export const reqUserList = (type) => ajax('/userlist', { type })
// 获取消息列表
export const reqAllChats = () => ajax('/allchats')
// 修改消息状态为已读
export const reqReadChat = (from) => ajax('/read', { from }, 'POST')
