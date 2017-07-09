// pages/act_success/act_success.js
var util_time = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  dest: '',
  takeline: null,
  back: function () {
    if (this.dest == 'index') {
      wx.switchTab({
        url: '../index/index'
      })
      return
    }
    wx.navigateBack({
      delta: 2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  creat_borrow: function (book) {
    this.title = book.title
    this.isbn = book.isbn
  },

  borrow_book: function () {
    var book_ish = []
    var borrow_book = []
    var that = this
    app.book_ishelf.forEach(function (item, index, array) {
      if (item.checked == true)
        borrow_book.push(new that.creat_borrow(item))
      else
        book_ish.push(item)
    })
    app.book_ishelf = book_ish

    // app.borrow_book.push.apply(app.borrow_book, borrow_book)//apply会将一个数组装换为一个参数接一个参数的传递给方法
    

    wx.setStorage({
      key: 'book_ishelf',
      data: book_ish,
    })
    
    this.get_message(borrow_book)
  },


  onLoad: function (options) {
    this.dest = options.dest
    this.takeline = options.date
    this.formId = options.formId
    this.template_id = options.template_id
    if (this.dest == 'index') {
      this.borrow_book()
    }
  },

  get_message: function (borrow_book) {
    var the_data = this.get_data(borrow_book)
    var that = this
    wx.request({
      url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9481ac5ec5bc457f&secret=c7c03d91b150689c17e2dfa015b7cdc6`,
      success: function (res) {
        wx.request({
          url: `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${res.data.access_token}`,
          method: 'POST',
          data: {
            touser: app.openId,
            template_id: that.template_id,
            form_id: that.formId,
            data: the_data
          },
          success: function (a) {

          }
        })
      }
    })
  },



  get_data: function (borrow_book) {
    if (this.template_id == "Cm8l70uJYwEgFIqOqwAFhvHT0x0_6cooXc2OFL3N3So") {
      var book = ""
      borrow_book.forEach(function (value, index, array) {
        book = book + value.title + " "
      })
      var data = {
        "keyword1": {
          "value": this.takeline,
          "color": "#173177"
        },
        "keyword2": {
          "value": book,
          "color": "#173177"
        },
        "keyword3": {
          "value": "超出预定时间之外无法取书",
          "color": "#173177"
        },
        "keyword4": {
          "value": "联系方式",
          "color": "#173177"
        },
      }
    }
    return data
  }
})