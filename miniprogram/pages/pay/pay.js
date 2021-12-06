// pages/pay/pay.js
const util = require('../../utils/util.js')
const  db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mendian:'默认',
    product:[],
    money:0,
    name:"",
    phone_number:"",
    address:"",
    beizhu:"",
    time:'12:01',
    showView:2,
    items: [
      { name: '1', value: '自取' },
      { name: '2', value: '外卖', checked: 'true' },
    ]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      showView:e.detail.value
    })
  },
  //选择门店，还没写跳转地址
  selectAddress:function(e){
    wx.navigateTo({
      url: '',
    })

  },
  //时间选择
  bindTimeChange:function(e){
    this.setData({
      time:e.detail.value
    })
  },
  // 备注
  beizhu:function(e){
    let that = this
    console.log(e)
    that.setData({
      beizhu:e.detail.value
    })
  },
  // 结算
  findXy() { //获取用户的经纬度
    var _this = this
    wx.getLocation({
        type: 'wgs84',
        success(res) {
            _this.getDistance(res.latitude, res.longitude, 39.924091,116.403414)
        }
    })
},

 Rad: function(d) { //根据经纬度判断距离
    return d * Math.PI / 180.0;
},
getDistance: function(lat1, lng1, lat2, lng2) {
    // lat1用户的纬度
    // lng1用户的经度
    // lat2商家的纬度
    // lng2商家的经度
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2) + '公里' //保留两位小数
    console.log('经纬度计算的距离:' + s)
    return s
},
  pay:function(e){
    let that = this

    var DATE = util.formatDate(new Date());
    if(that.data.name!==""&&that.data.address!==""&&that.data.phone_number!==""&&that.data.showView==2||that.data.showView==1){
      db.collection('order').add({
            data:{
              name:that.data.name,
              phone_number:that.data.phone_number,
              address:that.data.address,
              beizhu:that.data.beizhu,
              money:that.data.money,
              product:that.data.product,
              time:DATE,
              product_state:"送货中"
            },success:function(res){
              console.log('下单成功',res)
              wx.cloud.callFunction({
                name:"product_delet",
                data:{
                },
                success:function(res){
                  console.log('购物车删除成功',res)
                  for(var i= 0;i<that.data.product.length;i++){
                    wx.cloud.callFunction({
                      name:"inc_product_num",
                      data:{
                        product_id:that.data.product[i].product_id
                      },success:function(res){
                        console.log('商品销量自加成功',res)
                      }
                    })
                  }
                  wx.navigateTo({
                    url: '../paySuccess/paySuccess',
                  })
                },fail:function(res){
                  console.log('购物车删除失败',res)
                }
              })
            },fail:function(res){
              console.log('下单失败',res)
            }
          })
    }else{
      wx.showToast({
        title: '地址信息有误',
        icon:"none"
      })
    }
    
  },
  // 选择地址
  address:function(e){
    let that = this

    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  console.log(res)
                  that.setData({
                    name:res.userName,
                    phone_number:res.telNumber,
                    address:res.provinceName+res.cityName+res.countyName+res.detailInfo
                  })
                }
              })
            }
          })
        }else{
          wx.openSetting({
            success (res) {
              console.log(res.authSetting)
            }
          })
        }
      }
    })
  },
  // 计算金额
  get_money_sum() {
    let that = this
    let money_sum = 0
    for(var x = 0;x<that.data.product.length;x++){
      money_sum=money_sum+(that.data.product[x].product_num*that.data.product[x].product_price)
    }
    that.setData({
      money:money_sum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var _this = this;
    _this.findXy() //查询用户与商家的距离
    var app=getApp()
    db.collection('shopping_cart').where({
      product_checked:"true",
      _openid:app.globalData.openid
    }).get({
      success:function(res){
        console.log('获取商品成功',res)
        that.setData({
          product:res.data
        })
        that.get_money_sum()
      },fail:function(res){
        console.log('获取商品失败',res)
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