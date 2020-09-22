import Storage from './index'

const userStorage = new Storage('user')

const cartStorage = new Storage('cart', [])

export { userStorage, cartStorage }
