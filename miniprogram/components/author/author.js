// components/author.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        remind: true
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindGetUserInfo (e) {
            console.log(e.detail.userInfo)
            wx.getSetting({
              success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                  wx.navigateBack({
                   
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
    }
})
