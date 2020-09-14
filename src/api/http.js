import axios from 'axios'
import error from './error'
const instance = axios.create({
  baseURL: '/api',
  timeout: 3000
})

instance.interceptors.request.use(config => {
  return config
})

instance.interceptors.response.use(
  response => {
    const { data, status, msg } = response.data
    return status === 200 ? data || true : error(status, msg)
  },
  err => { console.log(err) }
)

export default instance
