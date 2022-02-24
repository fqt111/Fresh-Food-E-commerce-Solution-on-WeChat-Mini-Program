// pages/my_record/my_record.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      order:[],
      openid:"",
      state:"等待中",
      items: [
        { name: '1', value: '等待中' },
        { name: '2', value: '处理中' },
        { name: '3', value: '送货中' },
        { name: '4', value: '已送达' }
      ]
  },
  //改变值，显示摄像头功能或者是评价功能
  xuanze: function (e) {
    console.log('radio发生change事件，携带value值为：', e.currentTarget.dataset.value)
    this.setData({
      state:e.currentTarget.dataset.value
    })
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //获取当前的openid
    var app=getApp()
    that.setData({
      openid:app.globalData.openid
    })

    db.collection('order').where({
      product_state:that.data.state,
      _openid:app.globalData.openid
      
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

 
})