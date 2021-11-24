Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    resultType: "",
    resultContent: "",
    url:""
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var resultType = 'success';
    if (resultType == "success") {
      this.setData({
        resultType: "success",
        resultContent: "支付成功",
        url: '../shopping_cart/shopping_cart'
      });
    } else {
      this.setData({
        resultType: "warn",
        resultContent: "支付失败",
      });
    }
  },
  backTo:function(e){
    wx.switchTab({
      url: '../index/index',
    })
  }
})