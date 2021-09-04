// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    order: [{
      createTime: "2018-03-27 08:54:07",
      orderStatus: "取消",
      orderPrice: 26.9,
      orderThum: [{
        orderImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523900834925&di=a8372ccd301716b175a0873da5660df9&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141124%2F0042040512874602_b.jpg"
      }, {
        orderImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523900834925&di=a8372ccd301716b175a0873da5660df9&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141124%2F0042040512874602_b.jpg"
      }]
    }, {
      createTime: "2018-03-27 08:54:07",
      orderStatus: "支付成功",
      orderPrice: 26.9,
      orderThum: [{
        orderImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523900834925&di=a8372ccd301716b175a0873da5660df9&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141124%2F0042040512874602_b.jpg"
      }, {
        orderImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523900834925&di=a8372ccd301716b175a0873da5660df9&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141124%2F0042040512874602_b.jpg"
      }]
    }, {
      createTime: "2018-03-27 08:54:07",
      orderStatus: "支付成功",
      orderPrice: 26.9,
      orderThum: [{
        orderImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523900834925&di=a8372ccd301716b175a0873da5660df9&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141124%2F0042040512874602_b.jpg"
      }, {
        orderImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523900834925&di=a8372ccd301716b175a0873da5660df9&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141124%2F0042040512874602_b.jpg"
      }]
    }, {
      createTime: "2018-03-27 08:54:07",
      orderStatus: "支付成功",
      orderPrice: 26.9,
      orderThum: [{
        orderImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523900834925&di=a8372ccd301716b175a0873da5660df9&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141124%2F0042040512874602_b.jpg"
      }, {
        orderImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523900834925&di=a8372ccd301716b175a0873da5660df9&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141124%2F0042040512874602_b.jpg"
      }]
    }]
  },
  onReady() {
    let slef = this;
    this.swichNav(0);
  },


  /**
   * 
   * 顶部 商品订单  早餐订单 tab 切换 控制
   */
  swichNav: function (e) {
    if (e.target.dataset.current === this.data.currentTab) {
      return false;
    } else {
      console.log(e.target.dataset);
      this.setData({ currentTab: e.target.dataset.current })
    }

  },

  /**
   * swiper 控制 布局替换 控制 切换 swiper-item 
   * 
   */
  bindChange: function (e) {
    if (e.detail.current === this.data.currentTab) {
      return false;
    } else {
      console.log("bindChange" + JSON.stringify(e));
      this.setData({ currentTab: e.detail.current });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log("onPullDownRefresh");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})