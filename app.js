//app.js
import setting from 'utils/usr_setting'
App({

  onLaunch: function () {
    var that = this

    this.sessionId = wx.getStorageSync('sessionId')




    wx.getSystemInfo({
      success: function(res) {
        that.system_height = res.windowHeight
      }
    })


    wx.getStorage({
      key: 'history',
      success: function (res) {
        if (res.data != undefined && res.data != '')
          that.history = res.data
      }
    })

    
    wx.getStorage({
      key: 'book_ishelf',
      success: function (res) {
        if (res.data != undefined && res.data != '')
          that.book_ishelf = res.data
      }
    })

    wx.getStorage({
      key: 'usr_setting',
      success: function (res) {
        if (res.data == undefined) {
          that.usr_setting = setting
          wx.setStorage({
            key: 'usr_setting',
            data: that.usr_setting,
          })
        }
        else
          that.usr_setting = res.data
      }
    })

  },

  //调用API从本地缓存中获取数据

  request_user_info: function () {
    var that = this
    wx.request({
      url: `${this.url}user`,
      header: {
        WX_SESSION_ID: this.sessionId
      },
      success: function (re) {
        console.log(re)
        that.usr_phone_id = re.data
      }
    })
  },



  set_session_id: function (sessionId) {
    this.sessionId = sessionId
    wx.setStorage({
      key: 'sessionId',
      data: sessionId
    })
    this.request_user_info()
  },
  set_open_id: function (openId) {
    this.request_user_info()
    this.openId = openId
  },


  url: 'http://123.206.84.238:3000/w/',
  socket_url: 'ws://123.206.84.238:4450',
  history: [],
  book_ishelf: [],
  order_book:[],
  usr_setting: {},
  usr_phone_id: {},
  me: undefined
})