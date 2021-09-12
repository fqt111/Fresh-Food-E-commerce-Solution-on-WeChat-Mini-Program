// 使用了 async await 语法
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'test-rvwwd',
})


const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})
const _ = db.command
//有问题
exports.main = async (event, context) => {
  const ap = cloud.getWXContext()
  try {
    return await db.collection('shopping_cart').where({
      _openid:ap.OPENID,
      product_checked: "true"
    }).remove()
  } catch(e) {
    console.error(e)
  }
}