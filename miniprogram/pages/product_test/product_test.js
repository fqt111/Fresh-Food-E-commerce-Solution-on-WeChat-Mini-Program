const db = wx.cloud.database({
    env: "cloud1-6gtiz48ybf23c5c5"
})

Page({
    data: {
        showDialog: false,
        product_detail1: "",
        product_detail2: "",
        product_num: "",
        product_choose: [],
        detailValue: [],
    },

    checkboxChange(e) {
        console.log('checkboxChange e:', e);
        let string = "product_choose[" + e.target.dataset.index + "].selected"
        this.setData({
            [string]: !this.data.product_choose[e.target.dataset.index].selected
        })
        this.data.detailValue = this.data.product_choose.filter(it => it.selected).map(it => it.value)

        console.log('所有选中的值为：', this.data.detailValue)
    },

    /**
     * 控制 pop 的打开关闭
     * 该方法作用有2:
     * 1：点击弹窗以外的位置可消失弹窗
     * 2：用到弹出或者关闭弹窗的业务逻辑时都可调用
     */
    toggleDialog() {
        this.setData({
            showDialog: !this.data.showDialog
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('套餐的id已经获取到了', options)
        db.collection('set_meal').doc('fa24ce1a619df32a08b983183771c146')
            .get()
            .then(res => {
                console.log('請求成功', res)
                this.setData({
                    product_detail1: res.data.detail[0], //主要配料和辅料
                    product_detail2: res.data.detail[1], //主要配料和辅料
                    product_choose: res.data.choose, //让用户选择不需要哪些辅料

                })
            })
            .catch(err => {
                console.log('請求失敗', err)
            })

    },

})