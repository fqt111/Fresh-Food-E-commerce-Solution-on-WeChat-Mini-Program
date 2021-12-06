// pages/product_fenlei/product_fenlei.js

const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fenlei: [],
        img: [],
        product: [],
        fenlei_now: "",
 
    },
    get_product_detail: function(e) {
      console.log("huoqudetail", e)

      let id = e.currentTarget.dataset.name._id
      console.log(id)
      if(e.currentTarget.dataset.name.fenlei=="单品"){
       	wx.navigateTo({
          url: '../product_detail2/product_detail2?id=' + id 
        })
      }else{
        wx.navigateTo({
          url: '../product_detail/product_detail?id=' + id 
        })
      }
  },
  // 当前文件：A.js
// go: function (e){//event对象
	
// 	// 这个就是 flag 值(要带走的参数)
// 	let flag = e.currentTarget.dataset.flag
	
// 	// 路由跳转并带参数(跳转到 B 页面)
// 	wx.navigateTo({
//       url: '/pages/B?flag =' + flag 
//     })
// }

  
    get_product_fenlei: function(e) {
        console.log("huoqu", e)
        this.setData({
            fenlei_now: e.currentTarget.dataset.name
        })
        this.get_product()
    },
    // 获取当前分类的商品
    get_product: function() {
        db.collection('food_list').where({
                belong: this.data.fenlei_now
            }).get()
            .then(res => {
                console.log('获取分类成功', res)
                this.setData({
                    product: res.data
                })
            })
            .catch(err => {
                console.log('获取分类失败', res)
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this
        console.log("获取到类别", options.name)
        if (options.name === "单品") {
            console.log("danping")
            db.collection('item').where({
                belong: "海鲜"
            }).get()
            .then(res => {
              console.log('获取分类成功', res)
              this.setData({
                  product: res.data
              })
          })
          .catch(err => {
              console.log('获取分类失败', res)
          })
        } else {
            console.log("taocan")
            db.collection('set_meal').where({
                belong: "川菜"
            }).get()
             .then(res => {
                console.log('获取分类成功', res)
                this.setData({
                    product: res.data
                })
            })
            .catch(err => {
                console.log('获取分类失败', res)
            })
        }
        this.get_fenlei(options.name)
            // this.get_product()
    },
    get_fenlei(options) {
        let that = this
        db.collection('fenlei').where({
                name: options
            })
            .get({
                success: function(res) {
                    console.log('获取分类成功', res)
                    that.setData({
                        fenlei: res.data[0].category

                    })
                },
                fail: function(res) {
                    console.log('获取分类失败', res)
                }
            })
    },

    // get_product(){
    //   let that = this
    //   db.collection('food_list').where({
    //     belong:"蔬菜"
    // }).get({
    //   success:function(res){
    //     console.log('获取分类成功',res)
    //     that.setData({
    //       product:res.data
    //     })
    //   },fail:function(res){
    //     console.log('获取分类成功',res)
    //   }
    // })
    // },
    // onShow: function () {
    //   let that = this
    //   db.collection('food_list').where({
    //     belong:"蔬菜"
    // }).get({
    //   success:function(res){
    //     console.log('获取分类成功',res)
    //     that.setData({
    //       product:res.data
    //     })
    //   },fail:function(res){
    //     console.log('获取分类成功',res)
    //   }
    // })
    // },
})