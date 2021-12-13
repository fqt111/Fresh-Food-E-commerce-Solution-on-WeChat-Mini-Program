// pages/my_record/my_record.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
  },
  comment_shop:function(options){
    let pass=options.currentTarget.dataset._id
    console.log("传递了",pass)
    wx.navigateTo({
      url: '../comment_shop/comment_shop?id='+pass,
    })
  },

  comment_product:function(options){
    let product=options.currentTarget.dataset.pass.product_id
    // console.log("本身是",options)
    console.log("传递了",product)//能够正确传输当前商品信息，product_id来自数据库套餐set—meal
    wx.navigateTo({
      url: '../comment_product/comment_product?id='+product,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('order').doc(options.id).get({
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