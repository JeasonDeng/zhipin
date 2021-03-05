import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import '../assets/css/main.less'

import { getUser } from '../redux/actions'
import BossInfo from './BossInfo'
import DashenInfo from './DashenInfo'
import Dashen from './Dashen'
import Boss from './Boss'
import Message from './Message'
import Me from './Me'
import Chat from './Chat'
import Tabbar from '../components/Tabbar/Tabbar'

class Main extends Component {
  tabbars = [
    {
      path: '/boss',
      component: Boss,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen',
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/me',
      component: Me,
      title: '个人中心',
      icon: 'personal',
      text: '我的',
    },
  ]
  componentDidMount() {
    const id = Cookies.get('userid')
    if (id) {
      // 自动登录
      this.props.getUser((result) => {
        if (result.code === 1) {
          this.props.history.push('/login')
        }
      })
    }
  }
  render() {
    const id = Cookies.get('userid')
    // 1. cookie 没有值
    if (!id) {
      return <Redirect to="/login" />
    }
    // 2. cookie 有值，redux 中没有值
    if (!this.props.user._id) {
      return <div>loading</div>
    }
    // 3. redux 中已经有值了
    if (this.props.location.pathname === '/') {
      const { type, avatar } = this.props.user
      if (avatar) {
        return <Redirect to={`/${type}`} />
      }
      return <Redirect to={`/${type}info`} />
    }

    const { type } = this.props.user
    if (type === 'dashen') {
      this.tabbars[0].hide = true
    } else {
      this.tabbars[1].hide = true
    }

    const path = this.props.location.pathname
    // 当前路由在 tabbar 中
    const curPath = this.tabbars.find((tab) => tab.path === path)
    return (
      <div className="main">
        {curPath && <NavBar>{curPath.title}</NavBar>}
        <Switch>
          {this.tabbars.map((tab) => (
            <Route path={tab.path} component={tab.component} key={tab.path} />
          ))}
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/dasheninfo" component={DashenInfo} />
          <Route path="/chat/:userid" component={Chat} />
        </Switch>
        {curPath && <Tabbar tabbars={this.tabbars} unReadCount={this.props.unReadCount} />}
      </div>
    )
  }
}
export default connect((state) => ({ user: state.user, unReadCount: state.chatMsgs.unReadCount }), { getUser })(Main)
