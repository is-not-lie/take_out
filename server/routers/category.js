const categoryModel = require('../models/category')

module.exports = router => {
  router.get('/category', (req, res) => {
    categoryModel.find({})
      .then(data => data && res.send({ status: 200, data }))
      .catch(err => {
        console.error(`获取分类列表失败,错误信息:${err}`)
        res.send({ status: 0, msg: '获取分类失败' })
      })
  })
  router.get('/category/info', (req, res) => {
    const { id } = req
    categoryModel.findOne({ _id: id })
      .then(data => data && res.send({ status: 200, data }))
      .catch(err => {
        console.error(`获取分类信息异常,错误信息:${err}`)
        res.send({ status: 0, msg: '获取分类失败' })
      })
  })
}
