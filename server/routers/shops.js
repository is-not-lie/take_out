const shopsModel = require('../models/shops')
const pageFile = require('../utils/pageFile')

module.exports = router => {
  router.get('/shops/list', (req, res) => {
    const { pageNum, pageSize } = req.query
    shopsModel.find({})
      .then(data => {
        if (data && data.length) {
          data = pageFile(data, pageNum, pageSize)
          res.send({ status: 200, data })
        }
      })
      .catch((err) => {
        console.error(`获取商品列表异常,错误信息:${err}`)
        res.send({ status: 0, msg: '获取商家列表失败' })
      })
  })
  router.get('/shops/info', (req, res) => {
    const { id } = req
    shopsModel.findOne({ _id: id })
      .then(data => data && res.send({ status: 200, data }))
      .catch(err => {
        console.error(`获取商家信息异常,错误信息:${err}`)
        res.send({ status: 0, msg: '获取商家信息失败' })
      })
  })
}
