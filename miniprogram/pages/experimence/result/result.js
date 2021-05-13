// pages/result/result.js
import * as echarts from '../../../ec-canvas/echarts';
var app = getApp()

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  var option = {
    color: ["#00FFFF", "#8A2BE2"],
    // dataset: {
    //   source: [

    //   ]
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['RF算法']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    yAxis: [{
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }],
    xAxis: [{
      type: 'category',
      axisTick: {
        show: false
      },
      data: ['准确性', '召回率', '精确度', 'f值', 'AUC'],
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }],
    series: [{
      name: 'RF算法',
      type: 'bar',
      label: {
        normal: {
          show: false,
          position: 'inside'
        }
      },
      data: getApp().globalData.resultArray,
      itemStyle: {
        // emphasis: {
        //   color: '#37a2da'
        // }
      }
    } ]
  };
  chart.setOption(option);
  return chart;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    resultArray: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      resultArray: getApp().globalData.resultArray,
    })
  },
  returnTap() {
    wx.switchTab({
      url: '/pages/experimence/experimence',
    })
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