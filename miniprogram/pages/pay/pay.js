// pages/pay/pay.js

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
    flag:false,
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
    console.log(e.detail)
    this.setData({
      time:e.detail.value
    })
  },
  // 备注
  beizhu:function(e){

    console.log(e)
    this.setData({
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
             //传入当前位置的经度和纬度，和四个店铺的经度和纬度分别计算了当前位置和四个店铺位置的直线距离
              for (var i = 0; i < _this.data.shop.length; ++i) {
               dis[i]=_this.getDistance(_this.data.position.latitude, _this.data.position.longitude,_this.data.shop[i].coordinate.latitude,_this.data.shop[i].coordinate.longitude)
                if(dis[i]<5000){
                  _this.setData({
                    flag:true
                  })
                }
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
    console.log("结算")
    let DATE = new Date();
    if(that.data.flag==true){
      if(that.data.showView==1){
        wx.showModal({
          title: '提示',
          content: '当前距离你最近的店铺超过5公里，请慎重选择',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定')
              if(that.data.name!==""&&that.data.address!==""&&that.data.phone_number!==""&&that.data.showView==2||that.data.showView==1){
                db.collection('order').add({
                      data:{
                        name:that.data.name,
                        phone_number:that.data.phone_number,
                        address:that.data.address,
                        beizhu:that.data.beizhu,
                        money:that.data.money,
                        product:that.data.product,
                        time:that.data.time,
                        product_state:"等待中",
                        shop_id:that.data.shop_id
                      },success:function(res){
                        console.log(that.data.shop_id)
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
                            wx.redirectTo({
                              url: '../paySuccess/paySuccess'
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
            } else {//这里是点击了取消以后
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.showToast({
          title: '距离您最近的店铺超过5公里，不提供外卖服务',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
    }else{
      wx.showToast({
        title: '距离您最近的店铺超过5公里，不提供外卖服务',
        icon: 'none',
        duration: 2000//持续的时间
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
    that.findXy() //查询用户与商家的距离

    //获取当前用户的openid
    var app=getApp()
    that.setData({
      openid:app.globalData.openid,
      shop_id:options.shop_id
    })

    console.log(options.shop_id)
    //将选择后的商家添加到mendian中
    db.collection('store_detail_list').where({
      _id:options.shop_id
    }).get({
      success:function(res){
        console.log("haha",res)
        console.log(res.data[0].store_location)
        that.setData({
          mendian:res.data[0].store_location
        })
      }
    })
    //获取当前购物车为true的选项
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
})