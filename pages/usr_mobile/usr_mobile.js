// pages/usr_mobile/usr_mobile.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_wrong: false,
    code:'获取验证码',
    phonenumber:'',
    do_con:false
  },
  i:0,
  /**
   * 生命周期函数--监听页面加载
   */
  get_code:function(){
    var phonenumber = this.data.phonenumber
    if (phonenumber.length != 11) {
      this.setData({
        "show_wrong": true
      })
      return
    }
    if(this.i != 0){
      return
    }
    var that = this
    that.i = 60
    var si = setInterval(function(){
      that.setData({
        code: that.i +'秒'
      })
      that.i--
      if (that.i == 0){
        that.setData({
          code: "获取验证码"
        })
        clearInterval(si)
      }
    },1000)
  },
  formSubmit:function(e){
    var phonenumber = e.detail.value.phonenumber
    var code = e.detail.value.code
    if (phonenumber.length != 11 || code != '1234') {
      this.setData({
        "show_wrong": true
      })
      return
    }
    wx.request({
      url: `${app.url}register`,
      method: 'PUT',
      header: {
        WX_SESSION_ID: app.sessionId
      },
      data: {
        "phoneNumber": phonenumber,
      },
      success: function (res) {
        wx.navigateTo({
          url: '../act_success/act_success',
        })
      }
    })
  },
  input: function (e) {
    this.setData({
      "show_wrong": false,
    })
    if(e.target.id =="phone_input"){
      this.setData({
        "phonenumber": e.detail.value
      })
    }
  },
  onLoad: function (options) {
    if(options.phone == "null"){
      this.setData({
        do_con:true
      })
    }
    else{
      this.setData({
        phonenumber:options.phone
      })
    }
  },
  change_number:function(){
    this.setData({
      do_con:true,
      phonenumber:""
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