wx.cloud.init()
const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})

let value = ''
Page({
  data: {
    banner: [],
    start_banner:[],
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
  search_1: function () {
    console.log('chufa', value)
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

 

  onLoad: function () {
    db.collection('fenlei').where({
      _id:'efbc6d716238361e00e5e1b84186ac2a'
    })
      .get()
      .then(res => {
        console.log('首页轮播图获取成功', res)
        this.setData({
          start_banner: res.data[0].start_banner
        })
      })
      .catch(err => {
        console.log('請求失敗', err)
      })

    db.collection('set_meal').where({
      fenlei:'套餐'
    })
      .orderBy("sell", "desc")
      .limit(5)
      .get()
      .then(res => {
        console.log('热销榜单请求成功', res)
        this.setData({
          banner: res.data
        })
      })
      .catch(err => {
        console.log('請求失敗', err)
      })
  },

  onLaunch: function () {

  }
})