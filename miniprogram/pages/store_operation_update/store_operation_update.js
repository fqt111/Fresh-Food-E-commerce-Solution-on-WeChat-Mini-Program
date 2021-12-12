// pages/store_operation_up/store_operation_up.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[],
    img:[],
    name:"",
    price:"",
    detail:"",
    id:"",
    belong:"",
    content:"",
    img:[],
    judge:""
  },

  delete_product:function(e){
    let that = this
   
    wx.showModal({
      title: '提示',
      content: '确定删除该商品吗？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以
          console.log('用户点击确定')
          db.collection('food_list').doc(that.options.id).remove({
            success: function(res) {
              console.log('删除成功',res.data)
              wx.cloud.deleteFile({
                fileList: that.data.img,
                success: res => {
                  // handle success
                  console.log(res.fileList)
                },
                fail: err => {
                  // handle error
                },
              })
              wx.redirectTo({
                url: '../store_operation_gl/store_operation_gl',
              })
            }
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
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
              img:that.data.img.concat(res.fileID)
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
    let id = that.data.id
    console.log(e)
    if(e.detail.value.name!==""&&e.detail.value.price!==""&&e.detail.value.detail!==""&&that.data.img.length!==0){
      db.collection('food_list').doc(this.options.id).update({
        data:{
          name:e.detail.value.name,
          price:e.detail.value.price,
          fenlei:e.detail.value.fenlei,
          content:e.detail.value.content,
          img:that.data.img,
          product_contain:e.detail.value.detail
        },
        success:function(res){
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
            url: '../store_operation_gl/store_operation_gl',
          })
        },fail:function(res){
          console.log('提交失败',res),
          console.log(that.data)
          console.log(id)
        }
      })
    }else{
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
    console.log(options)
    let that = this
    // that.setData({
    //   id:options.id
    // })
    db.collection('fenlei').get({
      success:function(res){
        console.log('分类获取成功',res)
        that.setData({
          fenlei:res.data
        })
      },fail:function(res){
        console.log('分类获取失败',res)
      }
    })
    db.collection('food_list').doc(options.id).get({
      success:function(res){
        console.log('信息获取成功',res)
        that.setData({
          name:res.data.name,
          price:res.data.price,
          detail:res.data.product_contain,
          id:res.data._id,
          belong:res.data.belong,
          content:res.data.content,
          img:res.data.img
        })
      },fail:function(res){
        console.log('分信息获取失败',res)
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
  // onShow: function () {
  //   let that = this
  //   // that.setData({
  //   //   id:id_1
  //   // })
  //   db.collection('fenlei').get({
  //     success:function(res){
  //       console.log('分类获取成功',res)
  //       that.setData({
  //         fenlei:res.data
  //       })
  //     },fail:function(res){
  //       console.log('分类获取失败',res)
  //     }
  //   })
  //   db.collection('food_list').doc(id_1).get({
  //     success:function(res){
  //       console.log('信息获取成功',res)
  //       that.setData({
  //         name:res.data.name,
  //         price:res.data.price,
  //         detail:res.data.product_contain,
  //         id:res.data._id,
  //         belong:res.data.belong,
  //         content:res.data.content
  //       })
  //     },fail:function(res){
  //       console.log('分信息获取失败',res)
  //     }
  //   })
  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this
    wx.redirectTo({
      url: '../store_operation_update/store_operation_update',
    })
  },


})