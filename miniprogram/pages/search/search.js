// pages/search/search.js
const app = getApp()
wx.cloud.init()
const db = wx.cloud.database({
  env: "cloud1-6gtiz48ybf23c5c5"
})
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		search2: [],
		value:"",
		search: true,
		noneHidden: true,
		searchHidden: true,
		recentSearch: [],
		searchValue: '',
	},
	getRecentSearch: function() {
		var that=this;
		wx.getStorage({
			key: 'key',
			success: function(res) {
				that.setData({
					recentSearch: res.data
				})
			},
			fail: function(res) {
				that.setData({
					// number: res.data
				})
			}

		})
		// let recentSearch = wx.getStorageSync('recentSearch');
		// this.setData({
		// 	recentSearch:recentSearch
		// });
	},
	clearHistory:function(){
		wx.clearStorageSync('recentSearch')
		this.setData({
			recentSearch:[]
		})
	},

	search1: function (e) {
		console.log(e.detail.value)
		this.setData({
			value:e.detail.value
		})
	},
	
	search_1: function () {
		var value=this.data.value
		console.log('触发', value)
		wx.setStorage({
      key: "key",
      data: value,
      success:function(res){
        console.log(res);
      },
      fail:function(log){
        console.log(log);
      },
      complete:function(com){
        console.log(com);
      }
		})
		
    if (value && value.length > 0) {
      db.collection("allfood").where({ //collectionName 表示欲模糊查询数据所在collection的名
          name: { //columnName表示欲模糊查询数据所在列的名
            $regex: '.*' + value + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
            $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
          }
        }).get()
        .then(res => {
          console.log('請求成功', res)
          if(res.data.length===0){
            wx.showToast({
              icon: 'none',
              title: '未搜索到该商品',
            })
          }else{
            this.setData({
              search2: res.data
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
	
	goSearch:function(e){
		console.log("haha")
		this.search(e)
	},
	search: function(e) {
		let that = this
		let keywords;
		e.detail.value? keywords= e.detail.value: keywords = e.currentTarget.dataset.text,
		that.data.searchValue = keywords;
		if (that.data.searchValue) {
			// 记录最近搜索
			let recentSearch = wx.getStorageSync('recentSearch') || [];
			if(!app.isStrInArray(keywords,recentSearch)){
				recentSearch.unshift(that.data.searchValue);
				wx.setStorageSync('recentSearch', recentSearch)
				that.setData({
					recentSearch:recentSearch
				})
			}
		}

		// wx.request({
		// 	url: app.globalData.urls + '/shop/goods/list',
		// 	data: {
		// 		nameLike: keywords
		// 	},
		// 	success: function(res) {
		// 		if (res.data.code == 0) {	
		// 			var searchs = [];
		// 			for (var i = 0; i < res.data.data.length; i++) {
		// 				searchs.push(res.data.data[i]);
		// 			}
		// 			that.setData({
		// 				searchs: searchs,
		// 				searchHidden: false,
		// 				noneHidden: true
		// 			});
		// 		} else {
		// 			that.setData({
		// 				searchHidden: true,
		// 				noneHidden: false
		// 			});
		// 		}
		// 	}
		// })

	},
	searchFocus: function() {
		this.setData({
			search: false,
			searchInput: true
		})
	},
	searchClose: function() {
		// this.getRecentSearch()
		this.setData({
			search: true,
			searchInput: false,
			searchHidden:true
		})
	},
	toDetailTap:function(e){
		wx.navigateTo({
			url:"/pages/goods-detail/goods-detail?id=" + e.currentTarget.dataset.id
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.getRecentSearch();
	},

})
