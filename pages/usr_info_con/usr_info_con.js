// pages/usr_info_con/usr_info_con.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_wrong: false,
    do_con: false,
    usr_name:null,
    usr_id:null
  },
  onLoad: function (options) {
    if (options.name == 'null' || options.id == 'null' || options.name == undefined || options.id == undefined){
      this.setData({
        do_con : true
      })
    }
    else{
      this.setData({
        usr_name:options.name,
        usr_id:options.id
      })
    }
  },
  onReady: function () {

  },
  formSubmit: function (e) {
    var name = e.detail.value.name
    var id = e.detail.value.id
    if (id.length != 18) {
      this.setData({
        "show_wrong": true
      })
      return
    }
    for (var c of id) {
      if ((c >= '0' && c <= '9') || c == 'X')
        continue
      else {
        this.setData({
          "show_wrong": true
        })
        return
      }
    }
    wx.request({
    url: `${app.url}register`,
    method: 'PUT',
    header: {
      WX_SESSION_ID: app.sessionId
    },
    data: {
      "RICN": id,
      "name": name
    },
    success: function (res) {
      app.usr_phone_id.RICN = id
      app.usr_phone_id.name= name
      wx.navigateTo({
        url: '../act_success/act_success',
      })
    }
  })
},
  input:function (e) {
    this.setData({
      "show_wrong": false
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})