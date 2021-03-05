import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from './containers/Register'
import Login from './containers/Login'
import Main from './containers/Main'

function App() {
  return (
    <div>
      <Switch>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        {/* 通配路由 */}
        <Route component={Main}></Route>
      </Switch>
    </div>
  )
}

export default App
