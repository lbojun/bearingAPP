import * as echarts from '../../../ec-canvas/echarts';
var util = require('../../../util/util.js')
var app = getApp()



Page({
  data: {
    // 6种工况信息和名称
    allParams: [{
        text: '径向力',
        value: 'force'
      },
      {
        text: '第一相电流',
        value: 'phase_current_1'
      },
      {
        text: '第二相电流',
        value: 'phase_current_2'
      },
      {
        text: '旋转速率',
        value: 'speed'
      },
      {
        text: '负荷扭矩',
        value: 'torque'
      },
      {
        text: '振动信号',
        value: 'vibration_1'
      }
    ],
    time: '',
    arrayName: ['1_M01_F10',
      '2_M01_F10',
      '3_M01_F10',
      '4_M01_F10',
      '5_M07_F04',
      '6_M07_F04',
      '7_M07_F04',
      '8_M07_F04',
      '9_M07_F10',
      '10_M07_F10',
      '11_M07_F10',
      '12_M07_F10'
    ],
    allConditionName: ['径向力', '第一相电流', '第二相电流', '旋转速率', '负荷扭矩', '振动信号'],
    zcnum: ['result'],
    attr: 'speed',
    index: 0,
    index2: 1,
    index3: 0,
    labels: [],
    result: [],
    result1: [],
    series: [],
    i: 0,
    timer: '',
    timer2: '',
    chartTimer: '',
    ec: {
      lazyLoad: true
    }
  },
  navToChart() {
    wx.navigateTo({
      url: '/pages/monitor/compare/echart/echart',
    })
  },
  onLoad: function () {
    this.setData({
      time: util.formatTime(new Date()),
    })
    this.getAllParamsDatas1('1_M01_F10')
    this.getAllParamsDatas2('2_M01_F10')

    this.oneComponent = this.selectComponent('#mychart-dom-line');

  },

  //获取单个工况原始数据
  getSingParamData: function (bearingId, attr, callback) {
    var that = this;
    wx.request({
      url: 'https://phmlearn.com/component/data/paderborn',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.globalData.access_token,
        device_id: bearingId,
        attribute: attr
      },
      success: function (res) {
        // console.log(res.data)
        callback(res)
      }
    })
  },
  //获取所有工况数据
  getAllParamsDatas1: function (bearingId) {
    const allParamsName = this.data.allParams;
    let promises = []

    wx.showLoading({
      title: '数据加载中',
    })
    for (let i = 0; i < allParamsName.length; i++) {
      let paramsKey = allParamsName[i].value
      if (i === 0) {
        this.getSingParamData(bearingId, paramsKey, res => {})
      }
      promises.push(this.getSingParamData(bearingId, paramsKey, res => {
        if (i == 0) {
          const data = res.data.data.force
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        } else if (i == 1) {
          const data = res.data.data.phase_current_1
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        } else if (i == 2) {
          const data = res.data.data.phase_current_2
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        } else if (i == 3) {
          const data = res.data.data.speed
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        } else if (i == 4) {
          const data = res.data.data.torque
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        } else if (i == 5) {
          const data = res.data.data.vibration_1
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        }
        app.globalData.result = this.data.result
      }))
    }
    setTimeout(function () {
      wx.hideLoading()
    }, 15000)
    Promise.all(promises).then(res => {
      this.startTimer();
      this.setDate()
    })
  },
  // //获取所有工况数据
  getAllParamsDatas2: function (bearingId) {
    const allParamsName = this.data.allParams
    let promises = []
    wx.showLoading({
      title: '数据加载中',
    })
    for (let i = 0; i < allParamsName.length; i++) {
      let paramsKey = allParamsName[i].value
      if (i === 0) {
        this.getSingParamData(bearingId, paramsKey, res => {})
      }
      promises.push(this.getSingParamData(bearingId, paramsKey, res => {
        if (i == 0) {
          const data = res.data.data.force
          this.setData({
            [`result1[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        } else if (i == 1) {
          const data = res.data.data.phase_current_1
          this.setData({
            [`result1[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        } else if (i == 2) {
          const data = res.data.data.phase_current_2
          this.setData({
            [`result1[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        } else if (i == 3) {
          const data = res.data.data.speed
          this.setData({
            [`result1[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        } else if (i == 4) {
          const data = res.data.data.torque
          this.setData({
            [`result1[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        } else if (i == 5) {
          const data = res.data.data.vibration_1
          this.setData({
            [`result1[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)
            }
          })
        }
        app.globalData.result1 = this.data.result1

      }))
    }
    setTimeout(function () {
      wx.hideLoading()
    }, 15000)

    Promise.all(promises).then(res => {
      this.startTimer();
      this.setDate()
    })
  },
  //切换设备picker
  bindPickerChange: function (e) {
    let arr = ['1_M01_F10',
      '2_M01_F10',
      '3_M01_F10',
      '4_M01_F10',
      '5_M07_F04',
      '6_M07_F04',
      '7_M07_F04',
      '8_M07_F04',
      '9_M07_F10',
      '10_M07_F10',
      '11_M07_F10',
      '12_M07_F10'
    ]
    this.closeTimer(this.data.timer)
    this.closeTimer(this.data.timer2)
    this.setData({
      index: e.detail.value
    })
    let j = this.data.index
    let bearingId = arr[j]
    this.getAllParamsDatas1(bearingId)
  },
  //切换设备picker
  bindPickerChange2: function (e) {
    let arr = ['1_M01_F10',
      '2_M01_F10',
      '3_M01_F10',
      '4_M01_F10',
      '5_M07_F04',
      '6_M07_F04',
      '7_M07_F04',
      '8_M07_F04',
      '9_M07_F10',
      '10_M07_F10',
      '11_M07_F10',
      '12_M07_F10'
    ]
    this.closeTimer(this.data.timer)
    this.closeTimer(this.data.timer2)
    this.setData({
      index2: e.detail.value
    })
    let j = this.data.index
    let bearingId = arr[j]
    this.getAllParamsDatas2(bearingId)
  },
  //开启刷新时间定时器
  setDate: function () {
    this.setData({
      timer2: setInterval(() => {
        this.setData({
          time: util.formatTime(new Date())
        })
      }, 1000)
    })
  },
  //开启刷新数据定时器
  startTimer: function () {
    this.setData({
      i: 0
    })
    this.setData({
      timer: setInterval(() => {
        if (this.data.i <= 8000) {
          this.setData({
            i: this.data.i + 1
          })
        } else {
          this.setData({
            i: 0
          })
          this.closeTimer(this.data.timer)
          this.closeTimer(this.data.timer2)
        }
      }, 1000)
    })
  },
  //关闭定时器
  closeTimer: function (time) {
    clearInterval(time)
  },


  //页面卸载时清空定时器
  onUnload: function () {
    if (this.data.timer) {
      this.closeTimer(this.data.timer)
    }
    if (this.data.timer2) {
      this.closeTimer(this.data.timer2)
    }
    if (this.data.chartTimer) {
      this.closeTimer(this.data.chartTimer)
    }
  }
})