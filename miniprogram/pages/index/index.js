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
    let that = this
    if (value && value.length > 0) {

      db.collection("food_list").where({ //collectionName 表示欲模糊查询数据所在collection的名
          name: { //columnName表示欲模糊查询数据所在列的名
            $regex: '.*' + value + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
            $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
          }
        }).get()
        // db.collection('food_list').where({
        //   name: db.RegExp({
        //     regexp: 'value',
        //     options: 'i',
        //   })
        // }).get()
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
  // wrt
  onLoad: function () {
    db.collection('food_list')
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
// fqt

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
  //hlx
  onReachBottom: function () {

  },


})