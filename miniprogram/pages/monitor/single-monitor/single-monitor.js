var util = require('../../../util/util.js')
import * as echarts from '../../../ec-canvas/echarts';
// var initChart = null
var app = getApp()

// 数据的可视化
function setOption(chart, ylist) {
  var options = {
    title: {
      left: 'center'
    },
    color: ["#37A2DA"],
    grid: {
      top: 20,
      right: 20,
      bottom: 30
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['6s前', '5s前', '4s前', '3s前', '2s前', '1s前']
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      data: ylist
    }]
  }
  chart.setOption(options);
}

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
    tests: ['1_M01_F10_test.csv',
      '2_M01_F10_test.csv',
      '3_M01_F10_test.csv',
      '4_M01_F10_test.csv',
      '5_M07_F04_test.csv',
      '6_M07_F04_test.csv',
      '7_M07_F04_test.csv',
      '8_M07_F04_test.csv',
      '9_M07_F10_test.csv',
      '10_M07_F10_test.csv',
      '11_M07_F10_test.csv',
      '12_M07_F10_test.csv'
    ],
    test: '1_M01_F10_test.csv',
    output: 'out_2_3958443805714429.csv',
    attr: 'speed',
    index: 0,
    index2: 0,
    labels: [],
    result: [],
    series: [],
    i: 0,
    timer: '',
    timer2: '',
    chartTimer: '',
    ec: {
      lazyLoad: true
    }
  },
  onLoad: function () {
    this.setData({
      time: util.formatTime(new Date()),
    })
    this.oneComponent = this.selectComponent('#mychart-dom-line')
    this.getFeature()
    this.getAllParamsDatas('1_M01_F10')

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
  getAllParamsDatas: function (bearingId) {
    const allParamsName = this.data.allParams;
    let promises = []
    for (let i = 0; i < allParamsName.length; i++) {
      let paramsKey = allParamsName[i].value
      if (i === 0) {
        this.getSingParamData(bearingId, paramsKey, res => {
          this.getChartdata(res.data.data.force)
        })
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
      }))
    }

    Promise.all(promises).then(res => {
      this.startTimer();
      this.setDate()
    })
  },
  //获取折线图数据
  getChartdata: function (array) {
    wx.showLoading({
      title: '折线图加载中',
    })
    if (this.data.chartTimer) {
      this.closeTimer(this.data.chartTimer)
    }
    let index = 0
    this.setData({
      chartTimer: setInterval(() => {
        if (index <= 12375) {
          this.setData({
            ylist: array.slice(index, index + 6)
          })
          index++
        } else {
          this.closeTimer(this.data.chartTimer)
          this.setData({
            ylist: array.slice(array.length - 7, array.length - 1)
          })
        }
        this.oneComponent.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          setOption(chart, this.data.ylist) //赋值给echart图表
          this.chart = chart;
          wx.hideLoading()
          return chart;
        });
      }, 2000)
    })
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
        if (this.data.i <= 12375) {
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
      index: e.detail.value,
      test: this.data.tests[e.detail.value]
    })
    let j = this.data.index
    let bearingId = arr[j]
    this.getAllParamsDatas(bearingId)
    // this.getSingParamData(bearingId)
  },
  //切换工况picker
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
    let index = e.detail.value
    let array = this.data.result[index].arr
    this.getChartdata(array)
  },
  getFeature: function (callback) {
    var that = this;
    wx.request({
      url: 'https://phmlearn.com/component/upload/2/432',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.globalData.access_token,
        file_name: this.data.test
      },
      success: function (res) {
        // console.log(res.data.data.file_name)
        that.setData({
          output : res.data.data.file_name
        })
        that.getLabel()
      }
    })
  },
  getLabel: function (callback) {
    var that = this;
    wx.request({
      url: 'https://phmlearn.com/component/upload/ML/model/195/430',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.globalData.access_token,
        file_name: that.data.output
      },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          labels: res.data.data.predict
        })
      }
    })
  },
  //调用云函数，获取预测结果
  // getLabel: function () {
  //   if (!wx.cloud) {
  //     console.error('请使用 2.2.3 或以上的基础库以使用云能力')
  //   } else {
  //     wx.cloud.init({
  //       env: 'bearing-4gyok6g034c44b0f'
  //     })
  //   }
  //   wx.cloud.callFunction({
  //     name: 'bearing',
  //     data: {
  //       id: 'result'
  //     }
  //   }).then(res => {
  //     this.setData({
  //       labels: res.result.data
  //     })
  //   })
  // },
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