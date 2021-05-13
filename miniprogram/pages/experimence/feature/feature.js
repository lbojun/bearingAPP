// pages/feature/feature.js
var util = require('../../../util/util.js');
var app = getApp();
Page({
  data: {
    index: 0,
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
    test: '1_M01_F10_test.csv'
  },
  onLoad: function (options) {

  },
  formsubmit(e) {
    util.reqFunc('https://phmlearn.com/component/upload/2/432', {
      "access_token": app.globalData.access_token,
      "file_name": this.data.test
    }, "RF", function (res) {
      app.globalData.output_fileName = res.data.data.file_name;
    })
  },

  onReady: function () {

  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      test: this.data.tests[e.detail.value]
    })
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