// pages/store_detail_list/store_detail_list.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store:[],
    items: [
      { name: '1', value: '评价',checked: 'true' },
      { name: '2', value: '距离'},
      { name: '3', value: '综合'},
    ],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var app=getApp()
    console.log(app.globalData.openid)
    wx.cloud.callFunction(
      {
        data:{
          id:app.globalData.openid,
        },
        name:'get_store_list',
        success:function(res){
          console.log('联表成功',res.result)
          var Store=res.result.list;
         // console.log(Store)
          for(var i=0;i<Store.length;i++){
            Store[i].dis=Store[i].distance[i]
          }
          console.log(Store)
          for(var i =0;i<Store.length;i++){
            for(var j =0;j<i;j++){
              if(Store[j].store_satisfaction<Store[i].store_satisfaction){
                var a;
                a=Store[j];
                Store[j]=Store[i];
                Store[i]=a;
              }
            }
          }
          that.setData({
            store:Store
          })
      },
      fail:console.error
      })


    // db.collection('store_detail_list').orderBy("store_satisfaction", "desc").get({
    //   success:function(res){
    //     console.log('获取商店信息成功',res)
    //     that.setData({
    //       store: res.data,
    //     })
        
    //   },
    //   fail:function(res){
    //     console.log('获取商店信息失败',res)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  radioChange: function(e) {
      // wx.cloud.callFunction(
      //   {
      //     name:'get_store_list',
      //     success:function(res){
      //       console.log('联表成功',res.result)
      //       that.setData({
      //         store: res.result.list,
      //       })
      //   },
      //   fail:console.error
      //   })
      // },
    let that = this
    console.log('排序方式发生改变，目前的排序方式是：' + 'e.detail.value')
    if (e.detail.value == 1){
      var Store=that.data.store;
      // console.log(Store)
       console.log(Store)
       for(var i =0;i<Store.length;i++){
         for(var j =0;j<i;j++){
           if(Store[j].store_satisfaction<Store[i].store_satisfaction){
             var a;
             a=Store[j];
             Store[j]=Store[i];
             Store[i]=a;
           }
         }
       }
       that.setData({
         store:Store
       })
    // db.collection('store_detail_list').orderBy("store_satisfaction", "desc").get({
    //   success:function(res){
    //     console.log('获取商店信息成功',res)
    //     that.setData({
    //       store: res.data,
    //     })
        
    //   },
    //   fail:function(res){
    //     console.log('获取商店信息失败',res)
    //   }
    // })
  }
    else if (e.detail.value == 2){
      var Store=that.data.store;
       // console.log(Store)
       //  for(var i=0;i<Store.length;i++){
       //    Store[i].dis=Store[i].distance[i]
       //  }
        console.log(Store)
        for(var i =0;i<Store.length;i++){
          for(var j =0;j<i;j++){
            if(Store[j].dis<Store[i].dis){
              var a;
              a=Store[j];
              Store[j]=Store[i];
              Store[i]=a;
            }
          }
        }
        that.setData({
          store:Store
        })
    }
      // let that = this
      // db.collection('store_detail_list').orderBy("dis", "asc").get({
      //   success:function(res){
      //     console.log('获取商店信息成功',res)
      //     that.setData({
      //       store: res.data,
      //     })
          
      //   },
      //   fail:function(res){
      //     console.log('获取商店信息失败',res)
      //   }
      // })
      else if (e.detail.value == 3){
        var Store=that.data.store;
         // console.log(Store)
         //  for(var i=0;i<Store.length;i++){
         //    Store[i].dis=Store[i].distance[i]
         //  }
          console.log(Store)
          for(var i=0;i<Store.length;i++){
            Store[i].Comprehensive = 0.7*Store[i].dis + 0.3*Store[i].store_satisfaction
          }
          console.log(Store)
          for(var i =0;i<Store.length;i++){
            for(var j =0;j<i;j++){
              if(Store[j].Comprehensive<Store[i].Comprehensive){
                var a;
                a=Store[j];
                Store[j]=Store[i];
                Store[i]=a;
              }
            }
          }
          that.setData({
            store:Store
          })
  }
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