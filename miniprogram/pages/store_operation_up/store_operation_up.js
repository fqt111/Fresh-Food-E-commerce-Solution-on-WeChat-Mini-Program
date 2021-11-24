// pages/store_operation_up/store_operation_up.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    belong:[],
    fenlei:[],
    img:[],
    category_1:[],
    category_2:[],
    category_3:[]
  },
  // 上传图片
  upload_img:function(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: 'product/'+timestamp+'.png',
          filePath: tempFilePaths[0], // 文件路径
          success: function(res) {
            // get resource ID
            console.log(res.fileID)
            that.setData({
              img:that.data.img.concat(res.fileID)//添加到元素到数组中
            })
          },
          fail: function(res) {
            // handle error
          }
        })
      }
    })
  },
  // 删除图片
  // 删除数组中指定下标
  delete: function (e) {
    let that = this
    console.log(that.data.img)
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var img= that.data.img;
    img.splice(id,1)
    that.setData({
      img: img
    })
    wx.cloud.deleteFile({
      fileList: [e.currentTarget.dataset.src],
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: err => {
        // handle error
      },
    })
    console.log(that.data.img)
  },
  submit:function(e){
    let that = this
    console.log(e)
    // if(e.detail.value.fenlei==="单品"){
    //   that.setData({
    //     category_1:that.data.category_1.concat(e.detail.value.belong)
    //   })
    //   that.data.category_3=that.data.category_1
    // }else{
    //   that.setData({
    //     category_2:that.data.category_2.concat(e.detail.value.belong)
    //   })
    //   that.data.category_3=that.data.category_2
    // }
    // console.log(that.data.category_3)
    if(e.detail.value.name!==""&&e.detail.value.price!==""&&e.detail.value.fenlei!==""&&e.detail.value.content!==""&&e.detail.value.detail!==""&&that.data.img.length!==0){
      db.collection('food_list').add({//添加商品到food_list的数据库中
        data:{
          name:e.detail.value.name,
          price:e.detail.value.price,
          belong:e.detail.value.belong,
          fenlei:e.detail.value.fenlei,
          content:e.detail.value.content,
          product_contain:e.detail.value.detail,
          img:that.data.img,
          sell:0,
          
        },success:function(res){
          console.log("hahaha",e.detail.value.fenlei)
          
          db.collection('fenlei').where({
            name:e.detail.value.fenlei
          })
          .update({
            data:{
              category:_.push(e.detail.value.belong)//增加商品所属的子分类
            },
            success:function(res){
              console.log("hahahhaah",res)
              wx.showToast({
                title: '提交成功',
              })
              wx.redirectTo({
                url: '../store_operation_up/store_operation_up',
              })
            }
          })
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
            url: '../store_operation_up/store_operation_up',
          })
        }
      })
    }else{
      console.log("haha")
      wx.showToast({
        title: '你还有未填信息',
        icon:"none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('fenlei').get({
      success:function(res){
        console.log('分类获取成功',res.data[0].category)
        that.setData({
          fenlei:res.data,
          // category_1:res.data[0].category,
          // category_2:res.data[1].category
        })
      },fail:function(res){
        console.log('分类获取失败',res)
      }
    })
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
    let that = this
    wx.redirectTo({
      url: '../store_operation_up/store_operation_up',
    })
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

  }
})