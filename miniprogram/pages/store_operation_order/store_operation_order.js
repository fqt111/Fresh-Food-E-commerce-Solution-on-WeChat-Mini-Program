// pages/my_record/my_record.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      order:[],
      state:"送货中",
      shop_id:'null',
  },
  // 选择事件
  xuanze:function(e){
    let that = this
    console.log(e)
    that.setData({
      state:e.currentTarget.dataset.state,
      shop_id:e.currentTarget.dataset.shop_id
    })
    that.onLoad(this.data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options.shop_id)
    that.setData({
      shop_id:options.shop_id
    })
    console.log(this.data.shop_id)
    db.collection('order').where({
      product_state:that.data.state,
      shop_id:this.data.shop_id
    }).get({
      success:function(res){
        console.log('订单获取成功',res)
        that.setData({
          order:res.data
        })
      },fail:function(res){
        console.log('订单获取失败',res)
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
    that.onLoad(this.data)
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

  },


})
