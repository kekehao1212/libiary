//app.js
import setting from 'utils/usr_setting'
App({
  onLaunch: function () {
    var that = this
    wx.getStorage({
      key: 'favor_book',
      complete: function (res) {
        that.favor_book = new Array
        if (res.data != undefined && res.data != '')
          that.favor_book = res.data
      }
    })
    wx.getStorage({
      key: 'borrow_book',
      complete: function (res) {
        that.borrow_book = new Array
        if (res.data != undefined && res.data != '')
          that.borrow_book = res.data
      }
    })
    wx.getStorage({
      key: 'book_ishelf',
      complete: function (res) {
        that.book_ishelf = new Array
        if (res.data != undefined && res.data != '')
          that.book_ishelf = res.data
      }
    }),
      wx.getStorage({
        key: 'history',
        complete: function (res) {
          that.history = new Array
          if (res.data != undefined && res.data != '')
            that.history = res.data
        }
      }),
    wx.getStorage({
      key: 'usr_setting',
      complete: function (res) {
        if(res.data == undefined){
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
getUsrInfo: function (res) {
  var that = this
  wx.getUserInfo({
    success: function (res) {
    },
    fail: function (res) {
    },
    complete: function (res) {
    }
  })
},
globalData: {
  usrInfo: null
},
url: 'http://123.206.84.238:3000/w/',
  socket_url: 'ws://123.206.84.238:4450',
  history:[],
  book_ishelf:[],
  favor_book:[],
  borrow_book:[],
  sessionId:undefined,
  usr_setting:{},
  usr_phone_id:{},
  me:undefined
})