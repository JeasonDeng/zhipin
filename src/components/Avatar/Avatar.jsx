import React, { Component } from 'react'
import { Grid } from 'antd-mobile'

import './avatar.less'

export default class Avatar extends Component {
  constructor(props) {
    super(props)
    this.avatarArr = []
    for (let i = 1; i <= 20; i++) {
      this.avatarArr.push({ icon: require(`../../assets/images/头像${i}.png`).default, text: `头像${i}` })
    }
    this.state = {
      icon: '',
    }
  }
  handleClick = (el) => {
    this.props.setAvatar(el.text) // 传递给父组件
    this.setState({ icon: el.icon })
  }
  render() {
    const { avatarArr } = this
    const { icon } = this.state
    return (
      <div style={{ marginBottom: 20 }}>
        {icon ? (
          <div className="sub-title">
            已选择头像：
            <img src={icon} />{' '}
          </div>
        ) : (
          <div className="sub-title">请选择头像： </div>
        )}

        <Grid data={avatarArr} columnNum={5} onClick={(el) => this.handleClick(el)} />
      </div>
    )
  }
}
