// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cloud1-6gtiz48ybf23c5c5"
})
const _ = cloud.database().command
var $ = cloud.database().command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  return cloud.database().collection("store_detail_list").aggregate() //选择我的商店表
          .lookup({
            from:"distance", //把distance表关联上
            let:{},
            pipeline: $.pipeline()
            .match({
              _openid:id,
            })
            .project({
              distance:1
            })
            .done(),
            as: 'store_list' //匹配的结果作为store_list相当于起个别名
          })
          .replaceRoot({  
 
            //replaceRoot指定一个已有字段作为输出的根节点，也可以指定一个计算出的新字段作为根节点。
           //newRoot  代表新的根节点
 
            newRoot: $.mergeObjects([$.arrayElemAt(['$store_list', 0]), '$$ROOT'])
            
            //mergeObjects 累计器操作符
            //$.mergeObjects([params1,params2...]) 可以合并多个元素
            //$.arrayElemAt(['$uapproval', 0]), '$$ROOT']
            //就是取uapproval数组的第一个元素，与原始的根融合在一起
            
          })
          .project({
            store_list:0,
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