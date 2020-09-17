import axios from 'axios'
import error from './error'
import Storage from '@utils/storage'
const user = new Storage('user')
const instance = axios.create({
  baseURL: '/api',
  timeout: 3000
})

instance.interceptors.request.use(config => {
  const { token } = user.value
  if (token) config.headers.Authorization = `take_out${token}`
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
