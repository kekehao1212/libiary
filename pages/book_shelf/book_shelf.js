// pages/book_shelf/book_shelf.js
var app = getApp()

Page({
  data: {
    book: [
    ],
    book_self: {
      "all_chose": true,
      "have_book": true,
      "book_num": undefined
    },
    "wrong_index": false
  },
  can_wrong: function () {
    this.setData({
      "show_wrong": false,
      "wrong_index": false
    })
  },
  change_radio: function (event) {
    var index = event.target.dataset.index
    var data_temp = {}
    if (this.data.book[index].checked == false) {
      data_temp['book[' + index + '].checked'] = true;
      data_temp['book[' + index + '].color'] = '#fff'
    }

    else {
      data_temp['book[' + index + '].checked'] = false
      data_temp['book[' + index + '].color'] = '#f6f9f8'
    }

    this.setData(data_temp)

    var temp = this.data.book.every(function (item, index, array) {
      return item.checked == true ? true : false
    })
    this.setData({
      "book_self.all_chose": temp
    })

  },
  // change_num(index, num) {
  //   var data_temp = {}
  //   if (num == 1)
  //     data_temp['book[' + index + '].rm_disable'] = true
  //   if (num == 2)
  //     data_temp['book[' + index + '].rm_disable'] = false
  //   data_temp['book[' + index + '].num'] = num
  //   this.setData(data_temp)
  // },

  // book_add: function (event) {
  //   var index = event.target.dataset.index
  //   this.change_num(index, ++this.data.book[index].num)
  // },
  // book_remo: function (event) {
  //   var index = event.target.dataset.index
  //   this.change_num(index, --this.data.book[index].num)
  // },

  all_chose: function () {
    if (this.data.book_self.all_chose == false) {
      var num = this.data.book.length
      var data_temp = {}
      for (var i = 0; i < num; i++) {
        data_temp['book[' + i + '].checked'] = true
        data_temp['book[' + i + '].color'] = '#fff'
      }
      this.setData({
        "book_self.all_chose": true
      })
    }
    else {
      var num = this.data.book.length
      var data_temp = {}
      for (var i = 0; i < num; i++) {
        data_temp['book[' + i + '].checked'] = false
        data_temp['book[' + i + '].color'] = '#f6f9f8'
      }
      this.setData(data_temp)
      this.setData({
        "book_self.all_chose": false
      })
    }
    this.setData(data_temp)
  },

  onShow: function () {
    var book = this.createBooks(app.book_ishelf)
    this.setData({
      "book": book,
      "book_self.book_num": book.length
    })
  },

  createBooks: function (book) {
    book.forEach(function (item, index, array) {
      item.checked = true
      item.color = "#fff"
    })
    return book
  },

  temp_f: -1,
  del: function (e) {
    if (this.temp_f == -1) {
      var index = e.target.dataset.index
      this.temp_f = index
      var data_temp = {}
      data_temp['book[' + index + '].show_del'] = true
      data_temp['book[' + index + '].animate'] = 'animate'
      this.setData(data_temp)
    }
    else
      this.can_del()
  },
  del_cof: function (e) {
    if (this.temp_f != -1) {
      var index = e.target.dataset.index
      var data_temp = this.data
      data_temp.book[index].show_del = false
      data_temp.book.splice(index, 1)
      this.setData(data_temp)
      this.setData({
        "book_self.book_num": this.data.book_self.book_num - 1
      })
      this.temp_f = -1
      app.book_ishelf.splice(index, 1)
      wx.setStorageSync("book_ishelf", app.book_ishelf)
    }
    else
      this.can_del()
  },
  navorToBook: function (e) {
    if (this.temp_f == -1) {
      var isbn = e.target.dataset.isbn
      wx.navigateTo({
        url: `../showBook/showBook?isbn=${isbn}`,
      })
    }
    else
      this.can_del()
  },
  can_del: function () {
    if (this.temp_f != -1) {
      var index = this.temp_f
      var data_temp = {}
      data_temp['book[' + index + '].show_del'] = false
      data_temp['book[' + index + '].animate'] = 'animate1'
      this.setData(data_temp)
      this.temp_f = -1
    }
  },

  borrow_book: function () {
    var that = this
    if (this.temp_f == -1) {
      var order = []
      var title = []
      for (var i = 0; i < this.data.book.length; i++) {
        var item = this.data.book[i]
        if (item.checked == true) {
          if (that.data.wrong_index == false && item.store < 1) {
            that.setData({
              "wrong_index": true
            })
          }
          order[order.length++] = item.isbn
          title[title.length++] = item.title
        }
      }

      if (order.length == 0) {
        wx.showModal({
          content: `借书栏为空`,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.setData({
                "wrong_index": false
              })
            }
          }
        })
        return
      }


      if (this.data.wrong_index == true) {

        var that = this
        wx.showModal({
          content: `借书栏中存在馆藏为0的书籍，暂时无法预定，将开启有书通知`,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.setData({
                "wrong_index": false
              })
              that.navito_sub(order,title)
            }
          }
        })
      }

      that.navito_sub(order, title)
    }
    else
      this.can_del()
  },
  navito_sub: function (order, title){
    app.book_ishelf = this.data.book
    wx.navigateTo({
      url: `../sub_order/sub_order?order=${order}&title=${title}`,
    })
  }
})