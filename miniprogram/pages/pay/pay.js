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
    position:[],
    money:0,
    name:"",
    openid:null,
    phone_number:"",
    shop_id:null,
    address:"",
    beizhu:"",
    time:'12:01',
    showView:2,
    distance:[],
    shop:[],
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
  findXy() { //获取用户的经纬度与计算距离
    var _this = this
    var dis=[]
    wx.getLocation({
        type: 'wgs84',
        success(res) {
          _this.setData({
            position:res
          })
          db.collection('shop').get({
            success:function(res){
              console.log('获取店铺成功',res)
              _this.setData({
                shop:res.data
              })
              console.log('111',_this.data.shop[0].coordinate.latitude)
             
              for (var i = 0; i < _this.data.shop.length; ++i) {
               dis[i]=_this.getDistance(_this.data.position.latitude, _this.data.position.longitude,_this.data.shop[i].coordinate.latitude,_this.data.shop[i].coordinate.longitude)
               
             }
             //distance信息上传到云数据库,以更新的形式
             db.collection('distance').where({
              _openid:_this.data.openid
            }).get({
             success:function(res){
               console.log("1",res)
               _this.setData({
                 distance:res.data
               })
               if(_this.data.distance.length)
               {
                 console.log("更新")
                db.collection('distance').update({
                  data:{
                   // _openid:_this.openid,
                    distance:dis
                  },success:function(res){
                  console.log("上传成功")
                  },fail:function(res){//如果找不到则创建
                  }
                })
               }else{
                console.log("添加")
                db.collection('distance').add({
                  data:{
                   // _openid:_this.openid,
                    distance:dis
                  },success:function(res){
                  console.log("上传成功")
                  },fail:function(res){
                  }
                })
               }
             },fail:function(res){
             }
            })
            console.log(1)
  
           },fail:function(res){
             console.log('获取店铺失败',res)
           }
         })
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
    s = s.toFixed(2)  //保留两位小数
    console.log('经纬度计算的距离:' + s+'公里')
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
  show_store_list(){
    wx.navigateTo({
      url: '../store_detail_list/store_detail_list',
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
    console.log(options.shop_id)
    _this.setData({
      shop_id:options.shop_id
    })
    var app=getApp()
    _this.setData({
      openid:app.globalData.openid
    })
    db.collection('store_detail_list').where({
      _id:_this.data.shop_id
    }).get({
      success:function(res){
        console.log(res.data[0].store_location)
        _this.setData({
          mendian:res.data[0].store_location
        })
      }
    })
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