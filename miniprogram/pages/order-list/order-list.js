var app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    statusType: ["等待中", "处理中", "待收货", "待评价"],
    currentType: 0,
    tabClass: ["", "", "", ""],
    bodyHeight:null,
    order:[],
    state:null
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
      state:that.data.statusType[curType]
    })
    db.collection('order').where({
      product_state:that.data.state,
      _openid:app.globalData.openid
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
    this.onShow();
  },
  
  

  onLoad: function (e) {
    var that = this;
    console.log(e)
    this.setData({
      currentType : e.currentType,
      state:this.data.statusType[currentType]
    })
  
    
    //获取当前的openid
    var app=getApp()
    db.collection('order').where({
      product_state:this.data.state,
      _openid:app.globalData.openid
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
    that.statusTap(e);

  },
})