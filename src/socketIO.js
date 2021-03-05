// 引入客户端 io
import { io } from 'socket.io-client'

// 连接服务器, 得到代表连接的 socket 对象
const socket = io('ws://localhost:4000')

// 向服务器发送消息
socket.emit('sendMsg', { name: 'tom' })
console.log('浏览器端向服务器发送消息:', { name: 'tom' })

// 绑定'receiveMsg'的监听, 来接收服务器发送的消息
socket.on('receiveMsg', function (data) {
  console.log('浏览器端接收到消息:', data)
})
