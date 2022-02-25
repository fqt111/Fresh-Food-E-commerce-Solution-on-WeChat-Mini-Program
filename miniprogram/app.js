//app.js
wx.cloud.init()
const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})
App({
   globalData:{
        openid:null
      },
  onLaunch: function () {
      if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
          } else {
            wx.cloud.init({
              // env 参数说明：
              //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
              //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
              //   如不填则使用默认环境（第一个创建的环境）
              env: 'cloud1-6gtiz48ybf23c5c5',
              traceUser: true,
            })
            wx.cloud.callFunction({
              name:'login'
            }).then(res=>{
              this.globalData.openid=res.result.openid
              console.log(this.globalData.openid)
            })
          }
        let that=this
           // 获取用户信息
           wx.getSetting({
            success(res) {
              console.log("res", res)
              if (res.authSetting['scope.userInfo']) {
                console.log("已授权")
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success(res) {
                    console.log("获取用户信息成功", res.userInfo)
                  },
                  fail(res) {
                    console.log("获取用户信息失败", res)
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
  }
})


