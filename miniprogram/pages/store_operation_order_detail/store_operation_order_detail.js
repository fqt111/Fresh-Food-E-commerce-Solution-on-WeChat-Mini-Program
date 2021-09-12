// pages/my_record/my_record.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    id:""
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
    wx.cloud.callFunction({
      name:'songda',
      data:{
        id:that.data.order._id
      },success:function(res){
        console.log('订单状态更新成功',res)
        wx.showToast({
          title: '送货成功',
        })
        wx.redirectTo({
          url: '../store_operation_order/store_operation_order',
        })
      },fail:function(res){
        console.log('订单状态更新失败',res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      id:options.id
    })
    wx.cloud.callFunction({
      name:"get_order_detail",
      data:{
        id:options.id
      },success:function(res){
        console.log('订单详情获取成功',res)
        that.setData({
          order:res.result.data
        })
      },fail:function(res){
        console.log('订单详情获取失败',res)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})