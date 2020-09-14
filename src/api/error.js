export default (status, msg) => {
  switch (status) {
    case 401:
      return console.log('test')
    default:
      return console.log(msg)
  }
}
