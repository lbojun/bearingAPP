// miniprogram/pages/user/suggestion/suggestion.js
const db = wx.cloud.database();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textValue: "",
  },
  //文本输入
  handleTextInput(e) {
    this.setData({
      textValue: e.detail.value,
    });
  },
  //提交按钮单击事件
  handlefrom(e) {
    wx.showLoading({
      title: "正在上传中",
      mask: true,
    });
    //获取文本的值
    const {
      textValue,
    } = this.data;
    //验证合法性
    if (!textValue.trim()) {
      //不合法
      wx.showToast({
        title: "输入有误,请重新输入哦",
        icon: "none",
        mask: true,
      });
      return;
    } else {
      wx.showToast({
        title: '反馈成功',
        icon: 'none'
      })
      var that = this
      var myDate = new Date();
      var y = myDate.getFullYear();
      var m = myDate.getMonth() + 1;
      var d = myDate.getDate();
      var h = myDate.getHours();
      var ms = myDate.getMinutes();
      var s = myDate.getSeconds();
      var time = y + '-' + m + '-' + d + ' ' + h + ':' + ms + ':' + s
      db.collection('suggestion').add({ //验证完成之后，添加的接口
        data: {
          username: that.data.storageContent, //用户名
          text: that.data.textValue, //内容
          time: time
        },
        success: function (res) {
          if (res.errMsg == 'collection.add:ok') {
            wx.hideLoading();
            wx.navigateBack({
              delta: 1,
            })
          } else {}
        }
      })
    }
    //显示正在上传中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'username',
      success: function (res) {
        console.log(res)
        that.setData({
          //
          storageContent: res.data
        })
      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
      }
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