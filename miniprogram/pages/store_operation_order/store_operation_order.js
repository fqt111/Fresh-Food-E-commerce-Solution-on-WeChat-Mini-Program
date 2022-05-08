// pages/my_record/my_record.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      order:[],
      state:"等待中",
      shop_id:"",
      statusType: ["等待中", "处理中", "待收货", "待评价"],
      currentType: 0,
      tabClass: ["", "", "", ""],
      bodyHeight:null,
      order:[],
      state:"等待中"
  },
  // 选择事件
  xuanze:function(e){
    let that = this
    console.log(e)
    that.setData({
      state:e.currentTarget.dataset.state,
      shop_id:e.currentTarget.dataset.shop_id
    })
    that.onLoad(this.data)
  },

  tiaozhuan:function(){
    wx.navigateTo({
      url:"../store_operation_order_detail/store_operation_order_detail?id="+this.data.order[0]._id+"&currentType="+this.data.currentType+"&state="+this.data.state
    })
  },

  statusTap: function (e) {
    var obj = e;
    var count = 0;
    for (var key in obj) {
      count++;
    }
    if (count == 0) {
      var curType = 0;
    } else {
      console.log('出现Cannot read property "dataset" of undefined;这样的错误是正常的，不用管！');
      var curType = e.currentTarget.dataset.index;
    }
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    let that = this
    //获取当前的openid
    var app=getApp()
    that.setData({
      state:that.data.statusType[curType],
    })
    db.collection('order').where({
      product_state:that.data.state,
      shop_id:that.data.shop_id
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
    this.onShow()
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //获取当前的openid
    var app=getApp()
    that.setData({
      currentType:options.currentType,
      state:that.data.statusType[options.currentType],
      shop_id:options.shop_id
    })
    db.collection('order').where({
      product_state:that.data.state,
      shop_id:that.data.shop_id
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
    // db.collection('order').where({
    //   product_state:that.data.state,
    //   _openid:app.globalData.openid
    // }).get({
    //   success:function(res){
    //     console.log('订单获取成功',res)
    //     that.setData({
    //       order:res.data
    //     })
    //   },fail:function(res){
    //     console.log('订单获取失败',res)
    //   }
    // })


  },


  onShow:function(){
    let that = this
    db.collection('order').where({
      product_state:that.data.state,
      shop_id:that.data.shop_id
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
  }

})
