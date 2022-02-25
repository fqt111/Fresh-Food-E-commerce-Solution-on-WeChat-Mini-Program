const app = getApp();
Page({
  data: {
    remind: true
  },
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.navigateBack({
           delta:1
          })
        }else{
          wx.showToast({
            title: '您拒绝了授权', // 标题
            icon: 'none',
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
        }
      }
    })
  },
  onLoad(){
    setTimeout(()=> {
      this.setData({
        remind: false,
      })
    }, 1500)
  },

  goIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
});
