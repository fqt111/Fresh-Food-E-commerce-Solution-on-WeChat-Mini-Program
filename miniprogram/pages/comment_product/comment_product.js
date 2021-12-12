// pages/comment_page/comment_page.js

const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})
const _ = db.command
let value=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assessment:{},
    nickName:"",
    avatarurl:"",
    assess:"",
    id:"",
    },

  input_comment: function(e){
    console.log('start input',e)
    let value = e.detail.value
    this.setData({
      // name_here:e.currentTarget.dataset.id,
      assess:value
    })
    console.log(this.data.assess)
    // console.log(this.data.name_here)
  },

  back_and_storage:function(options){
    console.log('这个按钮',options);
      //  let that=this;
       console.log('传输的评论',this.data.id);
      console.log('传输的评论',this.data.assess);
      db.collection('assessment').where({
        product_id:this.data.id
      }).update({
              data: {
                assessment:_.push(this.data.assess)
              },
              success: function(){
                console.log("haha",this.data.id);
                wx.showToast({
                  title: '评价成功',
                })      
              },
              fail: function () {
                console.log('失败', res)
              }
            })
 
  },


  showSettingToast: function(e) {
        wx.showModal({
          title: '提示！',
          confirmText: '去设置',
          showCancel: false,
          content: e,
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../setting/setting',
              })
            }
          }
        })
      },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
          wx.getSetting({
              success(res) {
                // console.log("res", res)
                if (res.authSetting['scope.userInfo']) {
                  console.log("已授权=====")
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.getUserInfo({
                    success(res) {
                      console.log("获取用户信息成功", res.userInfo)
                      that.setData({
        nickName: res.userInfo.nickName,
        avatarUrl:res.userInfo.avatarurl,
                      })
                    },
                    fail(res) {
                      console.log("获取用户信息失败", res)
                    }
                  })
                } else {
                  console.log("未授权=====")
                  that.showSettingToast("请授权")
                }
              }
            })
    let that = this
    console.log('page load',options.id)
    db.collection('assessment').where({product_id:options}).get({
      success:function(res){
        console.log('load succeeded',res)
        that.setData({
          assessment:res.data,
          id:options.id
        })
      },fail:function(res){
        console.log('load failed',res)
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