const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-rvwwd'
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('product').doc(event.product_id).update({
    data: {
      num: _.inc(1)
    }
  })
}