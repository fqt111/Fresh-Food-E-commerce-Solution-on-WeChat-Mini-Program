// pages/store_details/store_details.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_picture:[],
    store_location:"",
    store_star:"",
    id:"",
    store_assessment:[],
    showDialog: false,
    showProcess: false,
    detailValue: [],
    processValue: [],
    //没有get到这个方法
    isFold: true,
    show: '全文',
  },

  toggleHandler: function (e) {
    var that = this;
    index = e.currentTarget.dataset.index;
    for (var i = 0; i < that.data.product_assessment.length; i++) {
     if (index == i) {
      that.data.product_assessment[index].auto = true;
      that.data.product_assessment[index].seeMore = false;
     }
    }
    that.setData({
        product_assessment: that.data.product_assessment
    })
   },
   //收起更多
   toggleContent: function (e) {
    var that = this;
    index = e.currentTarget.dataset.index;
    for (var i = 0; i < that.data.product_assessment.length; i++) {
     if (index == i) {
      that.data.product_assessment[index].auto = true;
      that.data.product_assessment[index].seeMore = true;
     }
    }
    that.setData({
        product_assessment: that.data.product_assessment
    })
   },

  /**
   * 生命周期函数--监听页面加载
   */
  // .then(res => {
  //   console.log('assessment請求成功', res.data)
  //   this.setData({
  //     product_assessment: res.data[0].assessment
  //   })
  onLoad: function (options) {
    console.log(options);
    db.collection('store_detail_list').doc(options.id)
    .get()
    .then(res=>{
      console.log('获取商店信息成功',res)
      this.setData({
        store_picture: res.data.store_picture,
        store_location:res.data.store_location,
        store_star:res.data.store_satisfaction,
        store_assessment:res.data.assessment
      })

      var that=this;
      const query = wx.createSelectorQuery();
      query.selectAll('.textFour_box').fields({
      size: true,
      }).exec(function (res) {
      console.log(res[0], '所有节点信息');
      let lineHeight = 26; //固定高度值 单位：PX
      for (var i = 0; i < res[0].length; i++) {
        if ((res[0][i].height / lineHeight) > 3) {
        //  that.data.trendsList[i].auto = true;
        //  that.data.trendsList[i].seeMore = true;
        that.data.store_assessment[i].seeMore = true;
        that.data.store_assessment[i].seeMore = true;
        }
      }
      that.setData({
        // trendsList: that.data.trendsList,
        store_assessment: that.data.store_assessment
      })
      })
    })
    .catch(err => {
      console.log('請求失敗', err)
  })
  },
})