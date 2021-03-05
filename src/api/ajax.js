import axios from 'axios'

export default function ajax(url, params = {}, type = 'GET') {
  if (type === 'GET') {
    let urlArr = []
    for (const key in params) {
      urlArr.push(key + '=' + params[key])
    }
    const urlQuery = urlArr.join('&')
    if (urlQuery) {
      url += '?' + urlQuery
    }
    return axios.get(url)
  }
  return axios.post(url, params)
}
