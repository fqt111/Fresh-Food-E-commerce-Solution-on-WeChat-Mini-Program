// pages/star/star.js
wx.cloud.init()
const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})
//获取应用实例
const app = getApp()

Page({
  data: {
    select: 5, // 选中星星数 
    total: 5, // 星星总数
    disabled: true,  // 是否可点击
    star:"",
    product_assessment:[],
  },
  onStarChange: function (e) {
    wx.showToast({
      title: String(e.detail.value+1)
    })
    this.setData({
      star:e.detail.value+1
    })

  },
  onLoad:function(){

    db.collection('assessment').where({
      product_id:"c462c81061aae333005e40847f678575"
    })
    .get()
    .then(res => {
        console.log('請求成功', res);
        let list=res.data[0].assessment;
        let len=list.length;
        let sum=0;
        let avg=0;
        this.setData({
            product_assessment: res.data[0].assessment, //
        })
        console.log(this.data.product_assessment);
        for(let i=0;i<len-1;i++){
          sum=sum+list[i].star;
        }
        avg=sum/len;
        console.log(avg);
    
    })
    .catch(err => {
        console.log('請求失敗', err)
    })
  },
 
})
