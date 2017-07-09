//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    show_recom: true,
    popul_book:null,
    recom_book: null
  },
  url: 'http://123.206.84.238:3000/w/login',

  register : function(){
    wx.navigateTo({
      url: '../register /register ',
    })
  },

  code_login: function () {
    var that = this
    wx.login({
      success: function (res) {
        app.code = res.code
        wx.request({
          url: `${app.url}login`,
          method: 'POST',
          header: {
            WX_CODE: res.code
          },
          success: function (res) {
            if (res.statusCode == 200) {
              app.set_session_id(res.data.sessionId)
              app.set_open_id(res.data.openId)
            }
            else {
              if (res.data.error == 'ERR_USER_NOT_REGISTERED') {
                that.register()
              }
            }
          }
        })
      }
    })
  },

  session_id_login: function () {
    var that = this
    wx.request({
      url: `${app.url}login`,
      method: 'POST',
      header: {
        WX_SESSION_ID: app.sessionId
      },
      success: function (res) {
        if (res.statusCode != 200) {
          that.code_login()
          return
        }
        app.set_open_id(res.data.openId)
      }
    })
  },
  onLoad: function () {
    var that = this
    // 在index页面进行登录步骤但并获取用户信息


    if (app.sessionId == ''){
      this.code_login()
    }
    else {
      this.session_id_login()
    }
    
    wx.request({
      url: `${app.url}rec-book`,
      header:{
        WX_SESSION_ID:app.sessionId
      },
      success:function(res){
        that.setData({
          popul_book:res.data.books
        })
      }
    })

    wx.request({
      url: `${app.url}rec-book/special`,
      header:{
        WX_SESSION_ID:app.sessionId
      },
      success:function(res){
        that.setData({
          recom_book:res.data.books
        })
      }
    })
  },
  onShow:function(){
    this.setData({
      show_recom: app.usr_setting.usr_reco
    })
  },
  //事件处理函数
  focus: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  scan_book: function () {
    wx.navigateTo({
      url: '../borrow_book/borrow_book',
    })
  },
  navto: function (e) {
    wx.navigateTo({
      url: `../showBook/showBook?isbn=${e.currentTarget.dataset.isbn}`,
    })
  },
  classify_book: function () {
    wx.navigateTo({
      url: `../classify/classify`,
    })
  },
  my_borrow: function () {
    wx.navigateTo({
      url: `../borrow/borrow`,
    })
  }
})
