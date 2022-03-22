// pages/product_detail/product_detail.js
const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})
let value = ""
var index;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      openid:"",
      product_name: "",
      product_src: [],
      product_price: 0,
      product_num: "",
      product_weight:"",
      product_choose: [],
      product_process: [],
      product_note:"",
      product_fenlei:"",
      id: "",
      product_assessment:[],
      showDialog: false,
      showProcess: false,
      detailValue: [],
      processValue: [],
      //没有get到这个方法
      isFold: true,
      show: '全文',

  },

  toggleHandler: function (e) {
    var that = this;
    index = e.currentTarget.dataset.index;
    for (var i = 0; i < that.data.product_assessment.length; i++) {
     if (index == i) {
      that.data.product_assessment[index].auto = true;
      that.data.product_assessment[index].seeMore = false;
     }
    }
    that.setData({
        product_assessment: that.data.product_assessment
    })
   },
   //收起更多
   toggleContent: function (e) {
    var that = this;
    index = e.currentTarget.dataset.index;
    for (var i = 0; i < that.data.product_assessment.length; i++) {
     if (index == i) {
      that.data.product_assessment[index].auto = true;
      that.data.product_assessment[index].seeMore = true;
     }
    }
    that.setData({
        product_assessment: that.data.product_assessment
    })
   },
   
  // 选择需要删减的辅料
  checkboxChange(e) {
      console.log('checkboxChange e:', e);
      let string = "product_choose[" + e.target.dataset.index + "].selected"
      this.setData({
          [string]: !this.data.product_choose[e.target.dataset.index].selected
      })
      this.data.detailValue = this.data.product_choose.filter(it => it.selected).map(it => it.value)

      console.log('所有选中的值为：', this.data.detailValue)
  },

  checkboxChange2(e) {
    console.log('checkboxChange e:', e);
    let string = "product_process[" + e.target.dataset.index + "].selected"
    this.setData({
        [string]: !this.data.product_process[e.target.dataset.index].selected
    })
    this.data.processValue = this.data.product_process.filter(it => it.selected).map(it => it.value)

    console.log('所有选中的值为：', this.data.processValue)
},


  /**
   * 控制 pop 的打开关闭
   * 该方法作用有2:
   * 1：点击弹窗以外的位置可消失弹窗
   * 2：用到弹出或者关闭弹窗的业务逻辑时都可调用
   */
  
  changestate(){
    this.setData({
        showDialog: !this.data.showDialog,
      
    });
},
addcart() {

    this.setData({
        showDialog: !this.data.showDialog,
        showtag:"加入购物车"
    });
},
quickbuy: function() {
    this.setData({
        showDialog: !this.data.showDialog,
        showtag:"立即购买"
    });
},

 

  // 添加备注
  note: function(e) {
      console.log(e)
      value = e.detail.value
      this.setData({
          product_note: value
      })
      console.log(this.data.product_note)
  },

 
  // 加入购物车
  into_shopping_cart: function() {
         // 获取用户信息
    wx.getSetting({
        success:(res)=> {
          if (res.authSetting['scope.userInfo']) {
            let that = this
            db.collection('shopping_cart').where({
                product_id: that.data.id,
                _openid:that.data.openid
            }).get({
                success: (res)=> {
                    console.log(res)
                    if (res.data == "") {
                        db.collection('shopping_cart').add({
                            data: {
                                product_name: that.data.product_name,
                                product_src: that.data.product_src[0],
                                product_price: that.data.product_price,
                                product_num: 1,
                                product_id: that.data.id,
                                product_checked: "true",
                                product_note: that.data.product_note,
                                product_add: that.data.detailValue,
                                product_process: that.data.processValue,
                                product_fenlei:that.data.product_fenlei,
                            },
                            success: function(res) {
                                console.log('商品加入购物车成功', res)
                                wx.showToast({
                                    title: '加入成功',
                                })
                            },
                            fail: function(res) {
                                console.log('商品加入购物车失败', res)
                            }
                        })
                    } else {        
                          db.collection('shopping_cart').where({
                              product_id: that.data.id
                          }).update({
                              data:{
                                product_note: that.data.product_note,
                                product_add: that.data.detailValue,
                                product_process: that.data.processValue,
                              }
                          })
                          
                          wx.showToast({
                              title: '已加入购物车',
                              icon: 'none'
                          })
                    }
                },
                fail: function(res) {
                    console.log(res)
                }
            })
          } else {
            console.log("未授权=====需要跳转界面")
            wx.navigateTo({
              url: '/pages/auth/auth',
            })
          }
        }
      })
  },
  // 立即购买
  buy: function() {
       // 获取用户信息
       wx.getSetting({
        success:(res)=> {
          if (res.authSetting['scope.userInfo']) {
      var app=getApp()
      var that=this
      db.collection('shopping_cart').where({
          product_id: that.data.id,
          _openid:that.data.openid
      }).get({
          success: (res)=> {
              console.log(res)
              if (res.data[0]._openid!=app.globalData._openid) {
                  db.collection('shopping_cart').add({
                      data: {
                          product_name: that.data.product_name,
                          product_src: that.data.product_src[0],
                          product_price: that.data.product_price,
                          product_num: 1,
                          product_id: that.data.id,
                          product_checked: "",
                          product_note: that.data.product_note,
                          product_add: that.data.detailValue,
                          product_process: that.data.processValue,
                          product_fenlei:that.data.product_fenlei,
                      },
                      success: function(res) {
                          console.log('hh商品加入购物车成功', res)
                          wx.switchTab({
                              url: '../shopping_cart/shopping_cart',
                          })
                      },
                      fail: function(res) {
                          console.log('商品加入购物车失败', res)
                      }
                  })
              } else {
                db.collection('shopping_cart').where({
                    product_id: that.data.id
                }).update({
                    data:{
                      product_note: that.data.product_note,
                      product_add: that.data.detailValue,
                      product_process: that.data.processValue,
                    }
                })
                  wx.switchTab({
                      url: '../shopping_cart/shopping_cart',
                  })
              }
          },
          fail: function(res) {
              console.log(res)
          }
      })
          } else {
            console.log("未授权=====需要跳转界面")
            wx.navigateTo({
              url: '/pages/auth/auth',
            })
          }
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var app=getApp()
    this.setData({
      openid:app.globalData.openid,
    })

      console.log('单品的id已经获取到了', options)
      db.collection('item').doc(options.id)
          .get()
          .then(res => {
              console.log('請求成功', res)
              this.setData({
                  product_src: res.data.img, //
                  product_name: res.data.name, //
                  product_num: res.data.sell, //
                  product_price: res.data.price, //
                  product_origin_price: res.data.origin_price,
                  product_sell: res.data.sell,
                  product_process: res.data.process, //初处理选择
                  product_weight: res.data.weight,
                  product_choose: res.data.choose, //让用户选择不需要哪些辅料
                  id: res.data._id, //识别id
                  product_fenlei:res.data.fenlei,
              })
              console.log(options.id)
              db.collection('assessment').where({
                      product_id: options.id
                  })
                  .get()
                  .then(res => {
                      console.log('assessment請求成功', res.data)
                      this.setData({
                        product_assessment: res.data[0].assessment
                      })

                      var that = this;
                      const query = wx.createSelectorQuery();
                      query.selectAll('.textFour_box').fields({
                       size: true,
                      }).exec(function (res) {
                       console.log(res[0], '所有节点信息');
                       let lineHeight = 26; //固定高度值 单位：PX
                       for (var i = 0; i < res[0].length; i++) {
                        if ((res[0][i].height / lineHeight) > 3) {
                        //  that.data.trendsList[i].auto = true;
                        //  that.data.trendsList[i].seeMore = true;
                         that.data.product_assessment[i].seeMore = true;
                         that.data.product_assessment[i].seeMore = true;
                        }
                       }
                       that.setData({
                        // trendsList: that.data.trendsList,
                        product_assessment: that.data.product_assessment
                       })
                      })
                  })
                  .catch(err => {
                      console.log('請求失敗', err)
                  })
          })
          .catch(err => {
              console.log('請求失敗', err)
          })

  },
})