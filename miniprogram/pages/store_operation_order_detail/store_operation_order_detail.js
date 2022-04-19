// pages/my_record/my_record.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    id:"",
    statusType: ["处理中", "待收货", "待评价"],
    currentType:"",
    nexttype:"",
    shop_id:'null',
    state:""
  },
  // 拨打电话
  phone:function(){
    let that= this
    wx.makePhoneCall({
      phoneNumber: that.data.order.phone_number
    })
  },

  songda:function(){
    let that= this
    db.collection('order').doc(that.data.order._id).update({
      data:{
        product_state:that.data.nexttype
      },
      success: function(res){
      console.log('订单状态更新成功',res,that.data.order._id)
      wx.showToast({
        title: '送货成功',
      })
    }
  })
  wx.redirectTo({
             url: '../store_operation_order/store_operation_orde?shop_id='+that.data.shop_id+'&currentType='+that.data.currentType,
           })
  console.log(this.data.shop_id)
  
},fail:function(res){
  console.log('订单状态更新失败',res)
},
  //   wx.cloud.callFunction({
  //     name:'order_accomplished',
  //     data:{
  //       id:that.data.order._id
  //     },success:function(res){
  //       console.log('订单状态更新成功',res)
  //       wx.showToast({
  //         title: '送货成功',
  //       })
  //       wx.redirectTo({
  //         url: '../store_operation_order/store_operation_order',
  //       })
  //     },fail:function(res){
  //       console.log('订单状态更新失败',res)
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    that.setData({
      state:options.state,
      currentType:options.currentType,
      nexttype:that.data.statusType[options.currentType]
    })
    db.collection('order').doc(options.id).get({
      success:function(res){
        console.log('订单获取成功',res)
        that.setData({
          order:res.data,
          shop_id:res.data.shop_id
        })
      },fail:function(res){
        console.log('订单获取失败',res)
      }
    })
  },

})