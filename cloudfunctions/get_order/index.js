// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"test-rvwwd"
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('order').where({
    product_state:event.state
  }).get()
}