// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cloud1-6gtiz48ybf23c5c5"
})
const _ = cloud.database().command
var $ = cloud.database().command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("store_detail_list").aggregate() //选择我的商店表
          .lookup({
            from:"distance", //把distance表关联上
            let:{u_id:event.u_id},
            pipeline:[],
            as: 'store_list' //匹配的结果作为store_list相当于起个别名
          })
          .end({
            success:function(res){
              return res;
            },
            fail(error) {
              return error;
            }
          })
}