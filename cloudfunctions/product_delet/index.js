// 使用了 async await 语法
const cloud = require('wx-server-sdk')
cloud.init({
  env:"cloud1-6gtiz48ybf23c5c5"
})


const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})
const _ = db.command
//有问题
export async function main(event, context) {
  const ap = getWXContext()
  try {
    return await db.collection('shopping_cart').where({
      _openid:ap.OPENID,
      product_checked: "true"
    }).remove()
  } catch(e) {
    console.error(e)
  }
}