// pages/sub_order/sub_order.js
var app = getApp()
var getDate = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */

  data: {
    book: [],
    now_date: '',
    start_date: '',
    index: 0,
    now_time: '',
    time: '00:00',
    end_date: '',
    end_time: '24:00',
    borrow_book_now: false,
    usr_name: '',
    usr_phonenumber: ''
  },

  isbn: undefined,
  /**
   * 生命周期函数--监听页面加载
   */
  order_book: function () {
    var array = getDate.formatTime(new Date()).split(' ')
    this.setData({
      "borrow_book_now": true,
      "start_date": array[0],
      "now_time": array[1],
      "now_date": array[0]
    })

    var future_Date = new Date()
    future_Date.setMonth(future_Date.getMonth() + 1)
    var array = getDate.formatTime(future_Date).split(' ')
    this.setData({
      "end_date": array[0]
    })

  },
  onLoad: function (options) {
    var that = this
    if (app.usr_phone_id.name != null) {
      that.setData({
        usr_name: app.usr_phone_id.name
      })
    }

    if (app.usr_phone_id.phoneNumber != null) {
      that.setData({
        usr_phonenumber: app.usr_phone_id.phoneNumber
      })
    }
    
    this.isbn = options.order.split(',')
    var temp = options.title.split(',')
    this.setData({
      book: temp
    })
    var that = this
    that.order_book();
  },
  pay_order: function (res) {
    var that = this
    console.log(this.data.usr_name)
    console.log(this.data.usr_phonenumber)
    if (this.data.usr_name == "") {
      wx.showModal({
        showCancel: false,
        title: '未完成身份认证',
        content: '完成身份认证才可以借书',
        success: function (res){
          if(res.confirm){
            wx.navigateTo({
              url: '../usr_info_con/usr_info_con',
            })
            that.setData({
              usr_name: app.usr_phone_id.name
            })
          }
        }
      })
      return
    }
    if (this.data.usr_phonenumber == "") {
      wx.showModal({
        showCancel: false,
        title: '未完成手机号绑定',
        content: '完成手机号绑定才可以借书',
      })
      return
    }
    var dest = 'index'
    var date = this.data.now_date + ' ' + this.data.now_time
    wx.navigateTo({
      url: `../act_success/act_success?dest=${dest}&date=${date}&formId=${res.detail.formId}&template_id=Cm8l70uJYwEgFIqOqwAFhvHT0x0_6cooXc2OFL3N3So`,
    })
  },
  me: undefined,
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      now_date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      now_time: e.detail.value
    })
  }
})