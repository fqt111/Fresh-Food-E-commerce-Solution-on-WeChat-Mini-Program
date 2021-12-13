Component({
  properties: {
    // 当前选中几颗星，暂不支持半星
    num: {
      type: Number,
      value: 2,
    },
    // 总共几颗星
    total: {
      type: Number,
      value: 5
    },
    // 是否可点击
    disabled: {
      type: Boolean,
      value: true
    },
    // 星星宽度
    width: {
      type: Number,
      value: 40
    },
    // 星星高度
    height: {
      type: Number,
      value: 40
    }
  },
  data: {
    // 控制组件显示星星的中间数据，由 num 和 total 生成
    state: []
  },
  methods: {
    // 生成 state 数据
    geneState: function (num) {
      var total = this.data.total;
      if (num > total) {
        return;
      }
      var states = [];
      for (var i = 1; i <= total; i++) {
        var obj = new Object();
        obj.id = i;
        if (i <= num) {
          obj.select = true;
        } else {
          obj.select = false;
        }
        states.push(obj);
      }
      this.setData({
        state: states,
        num: num
      })
    },
    // 点击星星触发事件
    clickImg: function (e) {
      if (!this.data.disabled) {
        return;
      }
      if (e.currentTarget.dataset.id === this.data.num) {
        this.geneState(0)
        this.triggerEvent('change', { value: -1 })
      } else {
        this.geneState(e.currentTarget.dataset.id)
        this.triggerEvent('change', { value: e.currentTarget.dataset.id - 1 })
      }
    }
  },
  // 生命周期函数，组件开始加载时处理数据
  attached: function () {
    this.geneState(this.data.num)
  }
})