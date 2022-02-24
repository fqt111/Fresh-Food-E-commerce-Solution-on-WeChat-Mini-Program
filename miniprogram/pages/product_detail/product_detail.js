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
        product_detail1: "",
        product_detail2: "",
        product_num: "",
        product_choose: [],
        product_process: [],
        product_note:"",
        id: "",
        product_assessment:[],
        showDialog: false,
        detailValue: [],
        //没有get到这个方法
        isFold: true,
        show: '全文',

        trendsList:[
            {
             auto: false,
             seeMore: false,
             text: '小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟',
            },
            {
             auto: false,
             seeMore: false,
             text: '小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟',
            },
             {
             auto: false,
             seeMore: false,
              text: '小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟',
            },
            {
             auto: false,
             seeMore: false,
             text: '小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟',
            },
            {
             auto: false,
             seeMore: false,
             text: '小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟小老弟',
            },
           ]
    },

    toggleHandler: function (e) {
          var that = this;
          index = e.currentTarget.dataset.index;
          for (var i = 0; i < that.data.trendsList.length; i++) {
           if (index == i) {
            that.data.trendsList[index].auto = true;
            that.data.trendsList[index].seeMore = false;
           }
          }
          that.setData({
           trendsList: that.data.trendsList
          })
         },
         //收起更多
         toggleContent: function (e) {
          var that = this;
          index = e.currentTarget.dataset.index;
          for (var i = 0; i < that.data.trendsList.length; i++) {
           if (index == i) {
            that.data.trendsList[index].auto = true;
            that.data.trendsList[index].seeMore = true;
           }
          }
          that.setData({
           trendsList: that.data.trendsList
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


    /**
     * 控制 pop 的打开关闭
     * 该方法作用有2:
     * 1：点击弹窗以外的位置可消失弹窗
     * 2：用到弹出或者关闭弹窗的业务逻辑时都可调用
     */
    toggleDialog() {
        this.setData({
            showDialog: !this.data.showDialog
        });
    },
    finish: function() {
        this.setData({
            showDialog: !this.data.showDialog
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
        let that = this
        var app=getApp()
        db.collection('shopping_cart').where({
            product_id: that.data.id,
            _openid:that.data.openid
        }).get({
            success: function(res) {
                console.log(res)
                if (res.data == "") {
                    db.collection('shopping_cart').add({
                        data: {
                            product_name: that.data.product_name,
                            product_src: that.data.product_src[0],
                            product_price: that.data.product_price,
                            product_num: 1,
                            product_id: that.data.id,
                            // 新增代码
                            product_checked: "true",
                            product_note: that.data.product_note,
                            product_add: that.data.detailValue,
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
                    console.log("haha")
                        // db.collection('shopping_cart').doc(e.target.dataset.id).update({
                        //   data: {
                        //     product_num: _.inc(1)
                        //   }, success:function(res){
                        //     console.log('商品数量加一',res)
                        //     that.onLoad()
                        //   },fail:function(res){
                        //     console.log('获取商品价格失败',res)
                        //   }
                        // })
                    wx.showToast({
                        title: '已有这个商品',
                        icon: 'none'
                    })
                }
            },
            fail: function(res) {
                console.log(res)
            }
        })
    },
    // 立即购买
    buy: function() {
        let that = this
        db.collection('shopping_cart').where({
            product_id: that.data.id,
            _openid:that.data.openid
        }).get({
            success: function(res) {
                console.log(res)
                if (res.data == "") {
                    db.collection('shopping_cart').add({
                        data: {
                            product_name: that.data.product_name,
                            product_src: that.data.product_src[0],
                            product_price: that.data.product_price,
                            product_num: 1,
                            product_id: that.data.id,
                            // 新增代码
                            product_checked: "",
                            product_note: that.data.product_note,
                            product_add: that.data.detailValue,

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
                    wx.switchTab({
                        url: '../shopping_cart/shopping_cart',
                    })
                }
            },
            fail: function(res) {
                console.log(res)
            }
        })
    },

    // onTap: function(e){
    //   //取出“点的是第几个标题”
    //   var index=e.currentTarget.dataset.index;
    //   //go
    //   var list=this.data.product_assessment;
    //   var data=list[index];
    //   data.flag=!data.flag;//toggle
    //   this.setData({
    //     product_assessment:list
    //   });
    // },
    showAll: function(e) {
        console.log('checkboxChange e:', e);
        var index = e.target.dataset.index;
        var list = this.data.product_assessment;
        var data = list[index];
        console.log(data);
        data.flag = !data.flag;
        this.setData({
            product_assessment: list
        });

        if (data.flag == true) {
            this.setData({
                show: "全文"
            })
        } else {
            this.setData({
                show: "收起"
            })
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var app=getApp()
        this.setData({
          openid:app.globalData.openid,
        })

        console.log('套餐的id已经获取到了', options)
        db.collection('set_meal').doc(options.id)
            .get()
            .then(res => {
                console.log('請求成功', res)
                this.setData({
                    product_src: res.data.img, //
                    product_name: res.data.name, //
                    product_num: res.data.sell, //
                    product_price: res.data.price, //
                    product_process: res.data.process, //初处理备注
                    product_detail1: res.data.detail[0], //主要配料和辅料
                    product_detail2: res.data.detail[1], //主要配料和辅料
                    product_choose: res.data.choose, //让用户选择不需要哪些辅料
                    id: res.data._id //识别id
                })
                console.log(options.id)
                db.collection('assessment').where({
                        product_id: options.id
                    })
                    .get()
                    .then(res => {
                        console.log('assessment請求成功', res.data[0])
                        this.setData({
                            product_assessment: res.data[0].assessment
                        })
                    })
                    .catch(err => {
                        console.log('請求失敗', err)
                    })
            })
            .catch(err => {
                console.log('請求失敗', err)
            })

            var that = this;
            let query = wx.createSelectorQuery().in(this);
            query.selectAll('.textFour_box').fields({
             size:true
            }).exec(function (res) {
             console.log(res, '所有节点信息');
             let lineHeight = 26; //固定高度值 单位：PX
             for (var i = 0; i < res[0].length; i++) {
              if ((res[0][i].height / lineHeight) > 3) {
            //    that.data.trendsList[i].auto = true;
            //    that.data.trendsList[i].seeMore = true;
               that.data.product_assessment[i].auto = true;
               that.data.product_assessment[i].seeMore = true;
              }
             }
             that.setData({
            //   trendsList: that.data.trendsList,
              product_assessment: that.data.product_assessment
             })
            })

    },


})