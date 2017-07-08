// pages/borrow_book/borrow_book.js
var app = getApp()
import getDate from '../../utils/util'
import io from '../../utils/io'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    usr_name: '',
    usr_phonenumber: "",
    usr_id: '',
    book: [{ "title": "霍比特人", id: "199", isbn: "9787121276576" }, { "title": "你自以为是的极限，只是别人的起点", id: "400", isbn: "9787121276576" }],
    show_svg: false,
    png_src: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
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
    if (app.usr_phone_id.RICN != null) {
      this.setData({
        usr_id: app.usr_phone_id.RICN
      })
    }
  },
  add_book: function () {
    var that = this
    if (this.data.book.length == 2) {
      wx.showModal({
        showCancel: false,
        title: '可借图书已达上限',
        content: '每次最多可借两本书',
      })
      return
    }
    wx.scanCode({
      success: function (res) {
        var new_list = that.data.book
        var new_book = JSON.parse(res.result)
        new_book.id = 9
        new_list.push(new_book)
        that.setData({
          book: new_list
        })
      }
    })
  },
  delete_book: function (e) {
    var that = this
    var index = e.target.dataset.index
    wx.showModal({
      title: `删除`,
      content: `确定要删除《${that.data.book[index].name}》？`,
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          var new_list = that.data.book
          new_list.splice(index, 1)
          that.setData({
            book: new_list
          })
        } else {
          return
        }
      }
    })
  },
  pay_order: function (res) {
    if (this.data.usr_name == '' || this.data.usr_id == '') {
      wx.showModal({
        showCancel: false,
        title: '未完成身份认证',
        content: '完成身份认证才可以借书',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../usr_info_con/usr_info_con',
            })
          }
        }
      })
      return
    }


    var me = null
    var that = this
    var list = []
    this.data.book.forEach((value, index, arr) => {
      list.push(value.id)
    })
    if (list.length == 0) {
      wx.showModal({
        content: '借书栏为空，无法借书',
        showCancel: false,
      })
      return
    }


    if (app.me)
      app.me.disconnect();

    app.me = io(app.socket_url);

    var me = app.me;
    me.on('connect', () => {
      console.log("connect")

      me.on('borrow qr', (data) => {
        console.log("qr")
        that.setData({
          png_src: data.qr,
          show_svg: true
        })
      });

      me.on('borrow error', () => {
        // 出错了，可能是不让借太多书
        // 二维码没收到，不画。

        app.me.disconnect();
        app.me = undefined;
      });

      me.on('confirm one', (data) => {
        const bookId = data.book;
        const bookISBN = data.isbn;
        // isbn bbb
      });

      me.on('confirm', (data) => {
        console.log("all right")
        app.me.disconnect();
        app.me = undefined;
        that.borrow_finish(res.detail.formId)
        // 全都完成了，二维码可以撤掉了
      });

      me.on('scan', () => {

        //  被扫了
      })

      me.on('error', () => {
        console.log("error")
        app.me.disconnect();
        app.me = undefined;
        // 出错了，提示
      });

      me.on('timeout', () => {
        console.log("timeout")
        app.me.disconnect();
        app.me = undefined;
        wx.showToast({
          title: '二维码过期请重新借书',
          success: function () {
            that.setData({
              png_src: null,
              show_svg: false
            })
          }
        })
        // 时间到了，二维码撤掉
      });


      // 这样发起
      me.emit('action', {
        sessionId: app.sessionId,
        action: 'borrow qr',
        body: { books: list }
      });
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  borrow_finish: function (formId) {
    var that = this
    var future_Date = new Date()
    var now_Date = getDate.formatTime(future_Date)
    var book_title = ""
    future_Date.setMonth(future_Date.getMonth() + 1)
    future_Date = getDate.formatTime(future_Date)

    that.data.book.forEach(function (value, index, array) {
      book_title += value.title + " "

      if (index == array.length - 1) {
        that.show_message(now_Date, future_Date, book_title, formId)
      }
    })
  },
  
  show_message: function (now_Date, future_Date, book_title, formId) {
    wx.request({
      url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9481ac5ec5bc457f&secret=c7c03d91b150689c17e2dfa015b7cdc6`,
      success: function (res) {
        wx.request({
          url: `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${res.data.access_token}`,
          method: 'POST',
          data: {
            touser: app.openId,
            template_id: "fnbyFFGFSygqW_AGWaCyHFkL0FQekFQrJHvl1MjcgvA",
            form_id: formId,
            data: {
              "keyword1": {
                "value": now_Date,
                "color": "#173177"
              },
              "keyword2": {
                "value": future_Date,
                "color": "#173177"
              },
              "keyword3": {
                "value": book_title,
                "color": "#173177"
              }
            }
          },
          success: function (a) {
            console.log("a")
            wx.navigateTo({
              url: '../act_success/act_success',
            })
          }
        })
      }
    })
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   *

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