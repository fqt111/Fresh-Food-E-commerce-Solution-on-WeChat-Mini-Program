/* 
1 发送请求获取数据 
2 点击轮播图 预览大图
  1 给轮播图绑定点击事件
  2 调用小程序的api  previewImage 
3 点击 加入购物车
  1 先绑定点击事件
  2 获取缓存中的购物车数据 数组格式 
  3 先判断 当前的商品是否已经存在于 购物车
  4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
  5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回缓存中
  6 弹出提示
4 商品收藏
  1 页面onShow的时候  加载缓存中的商品收藏的数据
  2 判断当前商品是不是被收藏 
    1 是 改变页面的图标
    2 不是 。。
  3 点击商品收藏按钮 
    1 判断该商品是否存在于缓存数组中
    2 已经存在 把该商品删除
    3 没有存在 把商品添加到收藏数组中 存入到缓存中即可
 */

 Page({
 
   /**
    * 页面的初始数据
    */
   data: {
    goodsObj : {},
    checkboxItems : [
      {name :'微辣' ,value :'hot'},
      {name :'中辣' ,value :'mid_hot'},
      {name :'麻辣' ,value :'very_hot'},
    ]
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
    this.getFoodsDetail(1)
    
   },
   async getFoodsDetail(food_id) {
    const db = wx.cloud.database()
    let res = await db.collection('food_detail_set').where({
      food_id: food_id}).get()
    let goodsObj = res.data[0]
      console.log("查询成功",goodsObj)
    
    
    
    /*
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsInfo = goodsObj;
    */
    /*
    // 1 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    
    // 2 判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
    */
    this.setData({
      goodsObj: {
        goods_name: goodsObj.food_name,
        goods_price: goodsObj.food_price,
        // iphone部分手机 不识别 webp图片格式 
        // 最好找到后台 让他进行修改 
        // 临时自己改 确保后台存在 1.webp => 1.jpg 
        goods_introduce: goodsObj.food_introduce,
        pics: goodsObj.food_pic,
      },
    })
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
     
   },

   checkboxChange: function(e) {
    console.log(e.detail.value)
  }

 })

 
