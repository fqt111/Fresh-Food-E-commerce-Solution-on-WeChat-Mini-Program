var region = require('./city.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    region: {
      type: Array,
      value: ['', '', '']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    originData: [],
    multiArray: [],
    multiIndex: [],
  },

  // 获取省市区原始数据 
  attached: function () {
    var originData = region.cityData
    
    // 默认值：省市区
    var [province, city, district] = this.data.region
    // 二维数组  省市区数据列表
    var multiArray = []
    var multiIndex = []

    // 省
    var provinceArrCopy = JSON.parse(JSON.stringify(originData))
    var provinceArr = provinceArrCopy.map(item => item.name)
    var provinceIndex = provinceArr.findIndex(item => item === province)
    provinceIndex = provinceIndex < 0 ? 0 : provinceIndex
    multiArray[0] = provinceArr
    multiIndex[0] = provinceIndex

    // 市
    var cityArrCopy = JSON.parse(JSON.stringify(originData[provinceIndex].cityList)) 
    var cityArr = cityArrCopy.map(item => item.name)
    var cityIndex = cityArr.findIndex(item => item === city)
    cityIndex = cityIndex < 0 ? 0 : cityIndex
    multiArray[1] = cityArr
    multiIndex[1] = cityIndex

    // 区
    var districtArrCopy = JSON.parse(JSON.stringify(originData[provinceIndex].cityList[cityIndex].districtList)) 
    var districtArr = districtArrCopy.map(item => item.name)

    if (districtArr.length === 0) {
      multiArray[1] = [multiArray[0][provinceIndex]]
      multiIndex[1] = 0
      multiArray[2] = cityArr
      multiIndex[2] = 0
    } else {
      var districtIndex = districtArr.findIndex(item => item === district)
      districtIndex = districtIndex < 0 ? 0 : districtIndex
      multiArray[2] = districtArr
      multiIndex[2] = districtIndex
    }

    this.setData({ originData: originData, multiArray: multiArray, multiIndex: multiIndex })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // value 改变时触发 value = [0, 0, 0]
    bindMultiPickerChange: function (e) {
      var multiArray = this.data.multiArray
      var multiIndex = e.detail.value
      var region = [multiArray[0][multiIndex[0]], multiArray[1][multiIndex[1]], multiArray[2][multiIndex[2]]] 
      this.setData({ region: region })
      this.triggerEvent('change', { value: region })
    },
    // 某一列值改变触发事件
    bindMultiPickerColumnChange: function (e) {
      var column = e.detail.column      // 修改的列，0 位第一列，以此类推
      var value = e.detail.value        // 修改的值

      var multiArray = this.data.multiArray
      var multiIndex = this.data.multiIndex
      var originData = this.data.originData

      switch (column) {
        case 0: {
          // 省
          var province = value
          multiIndex[0] = province     // 省份下标
          // 市
          var cityArrCopy = JSON.parse(JSON.stringify(originData[province].cityList))
          var cityArr = cityArrCopy.map(item => item.name)
          multiArray[1] = cityArr
          multiIndex[1] = 0

          // 区
          var districtArrCopy = JSON.parse(JSON.stringify(originData[province].cityList[0].districtList))
          var districtArr = districtArrCopy.map(item => item.name)
          if (districtArr.length === 0) {
            multiArray[1] = [multiArray[0][province]]
            multiIndex[1] = 0
            multiArray[2] = cityArr
            multiIndex[2] = 0
          } else {
            multiArray[2] = districtArr
            multiIndex[2] = 0
          }

          this.setData({ multiArray: multiArray, multiIndex: multiIndex })
          break
        }
        case 1: {
          var province = multiIndex[0]
          var city = value

          // 市
          multiIndex[1] = city

          // 区
          var districtArrCopy = JSON.parse(JSON.stringify(originData[province].cityList[city].districtList))
          var districtArr = districtArrCopy.map(item => item.name)
          if (districtArr.length === 0) {
            multiArray[1] = [multiArray[0][province]]
            multiIndex[1] = 0
            multiArray[2] = cityArr
            multiIndex[2] = 0
          } else {
            multiArray[2] = districtArr
            multiIndex[2] = 0
          }

          this.setData({ multiArray: multiArray, multiIndex: multiIndex })
          break
        }
        case 2: {
          multiIndex[2] = value
          this.setData({ multiIndex: multiIndex })
        }
      }
    },
  }
})
