import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

class Tabbar extends Component {
  render() {
    let { tabbars } = this.props
    tabbars = tabbars.filter((tab) => !tab.hide)
    const path = this.props.location.pathname
    const { unReadCount } = this.props
    return (
      <TabBar>
        {tabbars.map((tab) => (
          <TabBar.Item
            icon={{ uri: require(`./images/${tab.icon}.png`).default }}
            selectedIcon={{
              uri: require(`./images/${tab.icon}-selected.png`).default,
            }}
            badge={tab.path === '/message' && unReadCount}
            title={tab.text}
            key={tab.path}
            selected={tab.path === path}
            onPress={() => this.props.history.replace(tab.path)}></TabBar.Item>
        ))}
      </TabBar>
    )
  }
}
export default withRouter(Tabbar)
