// pages/product_fenlei/product_fenlei.js

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[],
    img:[],
    product:[],
    fenlei_now:""
  },
  get_product_fenlei:function(e){
    let that = this
    console.log("huoqu",e)
    that.setData({
      fenlei_now:e.currentTarget.dataset.name
    })
    that.get_product()
  },
  // 获取当前分类的商品
  get_product:function(){
    let that = this
    db.collection('food_list').where({
      belong:that.data.fenlei_now
  }).get({
    success:function(res){
      console.log('获取分类成功',res)
      that.setData({
        product:res.data
      })
    },fail:function(res){
      console.log('获取分类成功',res)
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.log("获取到类别",options.name)
    if(options.name==="单品"){
      db.collection('food_list').where({
        belong:"海鲜"
    }).get({
      success:function(res){
        console.log('获取分类成功',res)
        that.setData({
          product:res.data
        })
      },fail:function(res){
        console.log('获取分类成功',res)
      }
    })
    }else{
      db.collection('food_list').where({
        belong:"川菜"
    }).get({
      success:function(res){
        console.log('获取分类成功',res)
        that.setData({
          product:res.data
        })
      },fail:function(res){
        console.log('获取分类成功',res)
      }
    })
    }
    this.get_fenlei(options.name)
    // this.get_product()
  },
  get_fenlei(options){
    let that = this
    db.collection('fenlei').where({
      name:options
    })
    .get({
      success:function(res){
        console.log('获取分类成功',res)
        that.setData({
          fenlei:res.data[0].category
          
        }) 
      },fail:function(res){
        console.log('获取分类失败',res)
      }
    })
  },

  // get_product(){
  //   let that = this
  //   db.collection('food_list').where({
  //     belong:"蔬菜"
  // }).get({
  //   success:function(res){
  //     console.log('获取分类成功',res)
  //     that.setData({
  //       product:res.data
  //     })
  //   },fail:function(res){
  //     console.log('获取分类成功',res)
  //   }
  // })
  // },
  // onShow: function () {
  //   let that = this
  //   db.collection('food_list').where({
  //     belong:"蔬菜"
  // }).get({
  //   success:function(res){
  //     console.log('获取分类成功',res)
  //     that.setData({
  //       product:res.data
  //     })
  //   },fail:function(res){
  //     console.log('获取分类成功',res)
  //   }
  // })
  // },
})