// pages/usr/usr.js
var app = getApp()
Page({

  data: {
    userInfo: {},
    left: 0,
    top: 0,
    image: [{
      left: 0, top: 0,
    }, {
      left: 0, top: 0,
    }, {
      left: 0, top: 0,
    }, {
      left: 0, top: 0,
    }],
    show_other: true,
    id_con: '已认证',
    phone_con:'已绑定',
    usr_name:null,
    usr_id:null,
    usr_phone:null
  },
  touch_start_x: null,
  touch_start_y: null,
  now_image: [],
  /**
   * 生命周期函数--监听页面加载
   */
  start: function (e) {
    this.touch_start_x = e.changedTouches[0].clientX
    this.touch_start_y = e.changedTouches[0].clientY
  },
  onShow: function (options) {
    var that = this
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo
            })
          }
        })
      }
    })
    this.setData({
      usr_name: app.usr_phone_id.name,
      usr_phone: app.usr_phone_id.phoneNumber,
      usr_id: app.usr_phone_id.RICN
    })
            
    if (this.data.usr_id == null) {
      that.setData({
        id_con: '未认证'
      })
    }
    if (this.data.usr_phone == null) {
      that.setData({
        phone_con: '未绑定'
      })
    }
  },
  move: function (e) {
    this.setData({
      left: e.touches[0].clientX - this.touch_start_x,
      top: e.touches[0].clientY - this.touch_start_y
    })
  },
  end: function () {
    this.setData({
      left: 0,
      top: 0
    })
    this.touch_start_x = 0
    this.touch_start_y = 0
  },
  favor: function () {
    wx.navigateTo({
      url: '../favor/favor',
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  // onPullDownRefresh: function () {
  //   wx.stopPullDownRefresh()
  // },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
})