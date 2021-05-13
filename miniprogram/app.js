//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'banmo-9gtrwx9u192a8e1a',
        traceUser: true,
      })
    }

    this.globalData = {
      access_token: "1985212c911949adad0d5da96c77a79b.7a1e71c2d86d401a4e7a5f63723dccf9",
      output_fileName:"",
      resultArray:[],
      result:[],
      result1:[],
    }
  }
})
