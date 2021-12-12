wx.cloud.init()
const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})

let value = ''
Page({
  data: {
    banner: [],
    fenlei: [],
    product: [],
    search: [],
    num: 20,
    ss: false,
    list: [],
  },


  // 分类跳转事件
  fenlei: function (e) {
    console.log(e)
  },
  // 搜索事件
  search: function (e) {
    console.log(e.detail.value)
    value = e.detail.value

  },
  //有搜索的问题
  //wrt
  search_1: function () {
    console.log('chufa', value)
    // wx.cloud.callFunction({
    //   name: 'test',
    //   complete: res => {
    //     console.log('callFunction test result: ', res)
    //   }
    // })
    if (value && value.length > 0) {
      db.collection("food_list").where({ //collectionName 表示欲模糊查询数据所在collection的名
          name: { //columnName表示欲模糊查询数据所在列的名
            $regex: '.*' + value + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
            $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
          }
        }).get()
        .then(res => {
          console.log('請求成功', res)
          if(res.data.length===0){
            wx.showToast({
              icon: 'none',
              title: '未搜索到该商品',
            })
          }else{
            this.setData({
              search: res.data
            })
          }
        })
        .catch(err => {
          console.log('請求失敗', err)
        })
    } else {
      wx.showToast({
        icon: 'none',
        title: '搜索为空',
      })
    }
  },
  //授权登录
  showSettingToast: function(e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  },

  onLoad: function () {
      let that = this;
      // console.log(e)
      // 获取用户信息
      wx.getSetting({
        success(res) {
          // console.log("res", res)
          if (res.authSetting['scope.userInfo']) {
            console.log("已授权=====")
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                console.log("获取用户信息成功", res.userInfo)
                that.setData({
                  name: res.userInfo.nickName
                })
              },
              fail(res) {
                console.log("获取用户信息失败", res)
              }
            })
          } else {
            console.log("未授权=====")
            that.showSettingToast("请授权")
          }
        }
      })
    

    db.collection('set_meal').where({
      fenlei:'套餐'
    })
      .orderBy("sell", "desc")
      .limit(5)
      .get()
      .then(res => {
        console.log('請求成功', res)
        this.setData({
          banner: res.data
        })
      })
      .catch(err => {
        console.log('請求失敗', err)
      })

    db.collection('fenlei')
      .get()
      .then(res => {
        console.log('請求成功', res)
        this.setData({
          fenlei: res.data
        })
      })
      .catch(err => {
        console.log('請求失敗', err)
      })
  },
})