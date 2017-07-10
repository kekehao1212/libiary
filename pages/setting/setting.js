// pages/setting/setting.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reco_fre: ["每天更换一次", "每三天更换一次", "每周更换一次"],
    usr_fre_index: 0,
    usr_reco: undefined,
    show_tag:false,
    tags:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  fre_change: function (res) {
    this.setData({
      usr_fre_index: res.detail.value
    })
    app.usr_setting.reco_fre = res.detail.value
    wx.setStorage({
      key: 'usr_setting',
      data: app.usr_setting,
    })
  },
  switchChange:function(res){
    this.setData({
      usr_reco:res.detail.value,
    })
    app.usr_setting.usr_reco = res.detail.value
    wx.setStorage({
      key: 'usr_setting',
      data: app.usr_setting,
    })
  },
  onLoad: function (options) {
    this.setData({
      usr_reco: app.usr_setting.usr_reco,
      usr_fre_index: app.usr_setting.reco_fre
    })
  },
  get_tag:function(){
    var that = this
    wx.request({
      url: `${app.url}book/tag`,
      header:{
        WX_SESSION_ID:app.sessionId
      },
      success:function(res){
        that.all_tag = res.data.tags
        that.now_num = 0
        var temp = that.all_tag.slice(that.now_num, that.now_num + 20)
        that.now_num += 20
        that.setData({
          show_tag:true,
          tags: temp
        })
      }
    })
  },

  change_tags:function(){
    var temp = that.all_tag.slice(this.now_num,this.now_num+20)
    this.now_num += 20
    this.setData({
      tags: temp
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