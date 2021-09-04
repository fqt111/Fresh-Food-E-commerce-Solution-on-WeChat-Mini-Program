// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,//当前索引 默认0；tab
    curIndex: 0,// 当前 索引 默认0；left tab
    buynumber: 0,
    goodsPrice:0,
    isScroll: true,// scrollview 是否可以滑动
    toView: 'guowei',//scrollview  滑动指定位置
    todayImg: "http://img.dwstatic.com/lol/1405/264077743227/1400123196470.png",
    category: [
      { name: '特价', id: 'guowei' },
      { name: '第1层', id: 'shucai' },
      { name: '第2层', id: 'chaohuo' },
      { name: '第3层', id: 'dianxin' },
      { name: '第4层', id: 'cucha' },
      { name: '第5层', id: 'danfan' },
    ],
    category_type1: [
      {
        id: 'guowei',
        name: '特价',
        product: [
          { productId: "100", name: "库尔勒香梨(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 3.5, stock: "2" ,saleNumber: 0},
          { productId: "101", name: "烟台富士苹果(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 6.8, stock: "4", saleNumber: 0 }
        ]
      }, {
        id: 'shucai',
        name: '挂钩层',
        product: [
          { productId: "100", name: "库尔勒香梨(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 3.2, stock: "2", saleNumber: 0},
          { productId: "101", name: "烟台富士苹果(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 6.8, stock: "4", saleNumber: 0}
        ]
      }, {
        id: 'chaohuo',
        name: '糖巧+糕点',
        product: [
          { productId: "100", name: "库尔勒香梨(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 3.2, stock: "2", saleNumber: 0},
          { productId: "101", name: "烟台富士苹果(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 6.8, stock: "4", saleNumber: 0}
        ]
      }, {
        id: 'dianxin',
        name: '无肉不欢',
        product: [
          { productId: "100", name: "库尔勒香梨(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 3.2, stock: "2", saleNumber: 0},
          { productId: "101", name: "烟台富士苹果(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 6.8, stock: "4", saleNumber: 0 }
        ]
      }, {
        id: 'cucha',
        name: '咔吱脆',
        product: [
          { productId: "100", name: "库尔勒香梨(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 3.2, stock: "2", saleNumber: 0},
          { productId: "101", name: "烟台富士苹果(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 6.8, stock: "4", saleNumber: 0 }
        ]
      }, {
        id: 'danfan',
        name: '泡面+粥+饮品',
        product: [
          { productId: "100", name: "库尔勒香梨(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 3.2, stock: "2", saleNumber: 0},
          { productId: "101", name: "烟台富士苹果(两粒一份)", imgUrl: "http://img1.dwstatic.com/lol/1410/276707403146/1412752217106.png", price: 6.8, stock: "4", saleNumber: 0}
        ]
      }
    ],

  },
  onReady() {
    var self = this;
    swichNav(0);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  switchTab(e) {
    const self = this;
    // this.setData({
    //   isScroll: true
    // })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    // setTimeout(function () {
    //   self.setData({
    //     isScroll: false
    //   })
    // }, 1)

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

  },

  /**
   * 选择商品的时候 点击的+号事件  计算价格
   */
  addProduct: function(e){
    let parentIndex = e.currentTarget.dataset.parentId;//获取父类索引
    let sonIndex = e.currentTarget.id;//获取子类索引
    console.log("addProduct==>父类索引==>" + parentIndex + "   子类索引==>" + sonIndex);
    this.data.category_type1[parentIndex].product[sonIndex].saleNumber = this.data.category_type1[parentIndex].product[sonIndex].saleNumber+1;//改变索引值；是否出现减号
    let price = this.data.category_type1[parentIndex].product[sonIndex].price;//获取product的价格
    let temp1 = this.formatFloat(this.data.goodsPrice + price, 1);//计算价格，这里要自定义，否则会造成丢失精度的问题
    let self = this;
    self.setData({
      buynumber: this.data.buynumber+1,
      category_type1:this.data.category_type1,
      goodsPrice: temp1
    });
  },
 /**
   * 选择商品的时候 点击的-号事件  计算价格
   */
  reduceProduct: function(e){
    let parentIndex = e.currentTarget.dataset.parentId;
    let sonIndex = e.currentTarget.id;
    console.log("addProduct==>父类索引==>" + parentIndex + "   子类索引==>" + sonIndex);
    let self = this;
    this.data.category_type1[parentIndex].product[sonIndex].saleNumber = this.data.category_type1[parentIndex].product[sonIndex].saleNumber-1;
    let price = this.data.category_type1[parentIndex].product[sonIndex].price;
    let temp1 = this.formatFloat(this.data.goodsPrice - price,1);
    self.setData({
      category_type1: this.data.category_type1,
      buynumber: this.data.buynumber - 1,
      goodsPrice: temp1
    });
  },
  /**
   * 进行支付;
   */
  actionPay: function(e){
    console.log(this.data.buynumber + "==" + this.data.goodsPrice);
  },
  /**
   * 自定义js进行浮点运算带来的丢失精度的问题；
   */
  formatFloat: function (f, digit) {
    var m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
  }
})
