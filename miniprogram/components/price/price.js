Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    num: {
      type: Number,
      value: 5,
    },
    min: {
      type: Number,
      value: 0,
    },
    max: {
      type: Number,
      value: 10
    }
  },
  methods: {
    // 加法
    plus: function () {
      // 加值小于最大值，才允许加法运算
      var num = this.data.num + 1;
      if (num <= this.data.max) {
        this.setData({
          num: num
        })
        this.triggerEvent('custom', { value: num })
      }
    },
    // 减法
    minus: function () {
      // 减值大于最小值，才允许减法运算
      var num = this.data.num - 1;
      if (num >= this.data.min) {
        this.setData({
          num: num
        })
        this.triggerEvent('custom', { value: num })
      }
    },
    // 文本框失去焦点事件，判断输入值是否为数字
    onInputBlur: function (e) {
      var value = e.detail.value;
      if (isNaN(value)) {
        // 不是数字，直接置为最小值
        this.setData({num: this.data.min})
      } else {
        // 是数字，输入值大于最大值，置为最大值，同理最小值
        if (value > this.data.max) {
          this.setData({ num: this.data.max })
        } else if (value < this.data.min) {
          this.setData({ num: this.data.min })
        }
      }
    }
  }
})