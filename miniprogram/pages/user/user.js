Page({
  data: {
    username: "",
    showModal: false,
    head: "../../images/head.png",
  },
  // 点击换手机相册  
  upload: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9      
      sizeType: ['original', 'compressed'],
      // 指定是原图还是压缩图，默认两个都有      
      sourceType: ['album', 'camera'],
      // 指定来源是相册还是相机，默认两个都有    
      success: function (res) {
        // 返回选定照片的本地文件路径tempFilePath可以作为img标签的src属性显示图片        
        _this.setData({
          head: res.tempFilePaths
        })
      }
    })
  },

  onLoad: function () {
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'username',
      success: function(res) {
        console.log(res)
        that.setData({
          //
          storageContent: res.data
        })
      },
      /**
       * 失败会调用
       */
      fail: function(res) {
        console.log(res)
      }
    })
  },
  onReady: function () {},
})