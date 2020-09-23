export default (str) => {
  return unescape(str.replace(/&#x(.{4});/g, '%u\$1'))
}
