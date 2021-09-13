// pages/store_operation_gl/store_operation_gl.js
const db = wx.cloud.database()
const MAX_LIMIT = 20
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    allRecords:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

db.collection('food_list').count().then(async res =>{
  let that = this
  let total = res.total;
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  // 承载所有读操作的 promise 的数组
  for (let i = 0; i < batchTimes; i++) {
    await db.collection('food_list').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get().then(async res => {
      let new_data = res.data
      let old_data = that.data.allRecords
      that.setData({
        allRecords : old_data.concat(new_data)
      })
    })
  }
  console.log(that.data.allRecords)
  that.setData({
    product : that.data.allRecords
  })
})

    // let that = this
    // db.collection('food_list').get({
    //   success:function(res){
    //     console.log('获取商品成功',res)
    //     that.setData({
    //       product:res.data
    //     })
    //   }
    // })
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