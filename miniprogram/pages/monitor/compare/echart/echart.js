// miniprogram/pages/monitor/compare/echart/echart.js
var util = require('../../../../util/util.js')
import * as echarts from '../../../../ec-canvas/echarts';
// var initChart = null
var app = getApp()

function setOption(chart, ylist1, ylist2) {
  var options = {
    title: {
      left: 'center'
    },
    color: ["#37A2DA","#7FFF00"],
    legend:{
      data:["A","B"]
    },
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
      data: ylist1,
      name:'A'
    }, {
      type: 'line',
      smooth: true,
      data: ylist2,
      name:'B'
    }]
  }
  chart.setOption(options);
}
Page({
  // 数据的可视化

  /**
   * 页面的初始数据
   */
  data: {
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
    index: 0,
    index2: 1,
    array1: [],
    array2: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      array1:app.globalData.result[5].arr,
      array2:app.globalData.result1[5].arr,
    })
    this.getChartdata(app.globalData.result[5].arr,app.globalData.result1[5].arr)
    this.oneComponent = this.selectComponent('#mychart-dom-line');
  },
  returnTap() {
    wx.switchTab({
      url: '/pages/monitor/monitor',
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
    wx.showLoading({
      title: '折线图加载中',
    })
    this.setData({
      index: e.detail.value,
    })
    let j = this.data.index
    let bearingId = arr[j]
    this.getAllParamsDatas1(bearingId)
    setTimeout(function () {
      wx.hideLoading()
    }, 4000)
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
    wx.showLoading({
      title: '折线图加载中',
    })
    this.setData({
      index2: e.detail.value
    })
    let j = this.data.index
    let bearingId = arr[j]
    this.getAllParamsDatas2(bearingId)
    setTimeout(function () {
      wx.hideLoading()
    }, 4000)
  },
  //获取折线图数据
  getChartdata: function (array1, array2) {
    wx.showLoading({
      title: '折线图加载中',
    })
    if (this.data.chartTimer) {
      this.closeTimer(this.data.chartTimer)
    }
    let index = 0
    this.setData({
      chartTimer: setInterval(() => {
        if (index <= 8000) {
          this.setData({
            ylist1: array1.slice(index, index + 6),
            ylist2: array2.slice(index, index + 6)
          })
          index++
        } else {
          this.closeTimer(this.data.chartTimer)
          this.setData({
            ylist1: array1.slice(array1.length - 7, array1.length - 1),
            ylist2: array2.slice(array2.length - 7, array2.length - 1)
          })
        }
        this.oneComponent.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          setOption(chart, this.data.ylist1, this.data.ylist2) //赋值给echart图表
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
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
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})