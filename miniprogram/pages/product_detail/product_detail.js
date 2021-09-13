// pages/product_detail/product_detail.js
const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})
let value=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_name: "",
    product_src: [],
    product_price: 0,
    product_detail: "",
    product_num: "",
    product_contain: "",
    id: "",
    product_add:[],
    //没有get到这个方法
    
    
  },
  search: function (e) {
    console.log(e)
    value = e.detail.value
    this.setData({
      product_add:value
    })
    console.log(this.data.product_add)
  },
  checkboxChange:function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const items = this.data.item
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }
    this.setData({
      product_add:that.data.product_add.concat(value)
    })
    
    // if(e.detail.value.length !== 0){
    //   db.collection('shopping_cart').where({
    //     id:e.target.dataset.id
    //   }).add({
    //     data:{
    //       product_add:product_contain
    //     },success:function(res){
    //       that.onLoad()
    //     }
    //   })
    },

  // 加入购物车
  into_shopping_cart: function () {
    let that = this
    db.collection('shopping_cart').where({
      product_id: that.data.id
    }).get({
      success: function (res) {
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
              product_add:that.data.product_add
            },
            success: function (res) {
              console.log('商品加入购物车成功', res)
              wx.showToast({
                title: '加入成功',
              })
            },
            fail: function (res) {
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
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 立即购买
  buy: function () {
    let that = this
    db.collection('shopping_cart').where({
      product_id: that.data.id
    }).get({
      success: function (res) {
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
              product_add:that.data.product_add
            },
            success: function (res) {
              console.log('hh商品加入购物车成功', res)
              wx.switchTab({
                url: '../shopping_cart/shopping_cart',
              })
            },
            fail: function (res) {
              console.log('商品加入购物车失败', res)
            }
          })
        } else {
          wx.switchTab({
            url: '../shopping_cart/shopping_cart',
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log('产品的id已经获取到了', options.id)
    db.collection('food_list').doc(options.id)
      .get()
      .then(res => {
        console.log('請求成功', res)
        this.setData({
          product_src: res.data.img,
          product_name: res.data.name,
          product_num: res.data.sell,
          product_price: res.data.price,
          product_detail: res.data.content,
          product_contain: res.data.product_contain,
          id: res.data._id
        })
      })
      .catch(err => {
        console.log('請求失敗', err)
      })
   
  },

})