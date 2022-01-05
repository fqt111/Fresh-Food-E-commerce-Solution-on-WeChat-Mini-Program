// pages/comment_page/comment_page.js
var util = require('../../utils/util.js');
const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})
const _ = db.command
let value=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assessment:{},
    nickName:"",
    avatarurl:"",
    assess:"",
    id:"",
    select: 5, // 选中星星数 
    total: 5, // 星星总数
    disabled: true,  // 是否可点击
    star_avg:"",
    product_assessment:[],
    img:[],
    
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
  input_comment: function(e){
    console.log('start input',e)
    let value = e.detail.value
    this.setData({
      // name_here:e.currentTarget.dataset.id,
      assess:value
    })
    console.log(this.data.assess)
    // console.log(this.data.name_here)
  },
  
  back_and_storage:function(){
    db.collection('assessment').where({
      product_id:this.data.id
    })
    .update({
      data:{
        // assessment:_.push(this.data.assess)
        assessment:_.push({
          auto:false,
          avatarUrl:this.data.avatarurl,
          content:this.data.assess,
          image:this.data.img,
          nickname:this.data.nickName,
          seeMore:false,
          star:this.data.star,
          time:this.data.time
        })
      },
      success:function(res){
        console.log("hahahhaah",res)
        wx.showToast({
          title: '提交成功',
        })
      },
      fail: function () {
        console.log('失败', res)
      }
    })
  },

  showSettingToast: function(e) {
        wx.showModal({
          title: '提示！',
          confirmText: '去设置',
          showCancel: false,
          content: e,
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../setting/setting',
              })
            }
          }
        })
      },

    onStarChange: function (e) {
      wx.showToast({
        title: String(e.detail.value+1)
      })
      let list=this.data.product_assessment;
        let len=list.length;
        let sum=0;
        let star_avg=0;
        for(let i=0;i<len;i++){
          sum=sum+list[i].star;
        }
        star_avg=(sum+e.detail.value+1)/(len+1);
        console.log(star_avg);
        this.setData({
          star_avg:star_avg
        })
        
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
    db.collection('assessment').where({
      product_id:options.id
    })
    .get()
    .then(res => {
        console.log('請求成功', res);
        this.setData({
            product_assessment: res.data[0].assessment, //
        })
        console.log(this.data.product_assessment);
    })
    .catch(err => {
        console.log('請求失敗', err)
    })

          wx.getSetting({
              success(res) {
                // console.log("res", res)
                if (res.authSetting['scope.userInfo']) {
                  console.log("已授权=====")
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.getUserInfo({
                    success(res) {
                      console.log("获取用户信息成功", res.userInfo)
                      that.setData({
                      nickName: res.userInfo.nickName,
                      avatarUrl:res.userInfo.avatarUrl,
                      })
                    },
                    fail(res) {
                      console.log("获取用户信息失败", res)
                    }
                  })
                } else {
                  console.log("未授权=====")
                  that.showSettingToast("请授权")
                }
              }
            })
    let that = this
    console.log('page load',options.id)
    db.collection('assessment').where({product_id:options}).get({
      success:function(res){
        console.log('load succeeded',res)
        that.setData({
          assessment:res.data,
          id:options.id
        })
      },fail:function(res){
        console.log('load failed',res)
      }
    })
  },
})