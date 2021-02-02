import { combineReducers } from 'redux'

function counter(state = 0, action) {
  return state
}
function comments(state = [], action) {
  return state
}

export default combineReducers({
  counter, // 指定 reducer 对应的属性
  comments,
})
