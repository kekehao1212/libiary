// pages/showBook/showBook.js
var app = getApp()
Page({
  data: {
    book: {
      relat: []
    },
    text_style: [
      { text: 'fold_text', image: '../../source/arrow_down.png' }
      , { text: 'fold_text', image: '../../source/arrow_down.png' },
      { text: 'fold_text', image: '../../source/arrow_down.png' }
    ],
    favor_image: '../../source/favor.png',
    isfavor: '收藏',
    borrow_image: '../../source/borrow2.png',
    put_book_shelf: false,
    empty: false
  },

  check: function () {
    if (this.data.book.summary == "") {
      this.setData({
        "book.summary": '此书暂无简介'
      })
    }
    if (this.data.book.catalog == "") {
      this.setData({
        "book.catalog": '此书暂无目录'
      })
    }
    if (this.data.book.review == "" || this.data.book.review == undefined) {
      this.setData({
        "book.review[0]": '此书暂无书评'
      })
    }
  },

  check_favor: function (isbn) {
    var that = this
    wx.request({
      url: `${app.url}collection/${isbn}`,
      method: 'GET',
      header: {
        WX_SESSION_ID: app.sessionId
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            'favor_image': '../../source/favoring.png',
            'isfavor': '已收藏'
          })
        }
      }
    })
  },
  onLoad: function (res) {

    var that = this

    this.check_favor(res.isbn)
    wx.request({
      url: `${app.url}book/${res.isbn}`,
      method: 'GET',
      header: {
        WX_SESSION_ID: wx.sessionId
      },
      success: function (res) {
        if (res.statusCode == 404) {
          that.setData({
            empty: true
          })
          return
        }

        var temp = res.data
        temp.summary = temp.summary.split(String.fromCharCode(10))
        that.setData({
          book: temp
        })
        that.get_review(res.data.isbn)
        that.get_relat(res.data.isbn)
      }
    })
  },

  get_review: function (isbn) {
    var that = this
    wx.request({
      url: `https://api.douban.com/v2/book/isbn/${isbn}?fields=id`,
      method: 'GET',
      header: {
        'content-type': 'text/html'
      },
      success: function (res) {

        wx.request({
          url: `https://api.douban.com/v2/book/${res.data.id}/annotations?format=text`,
          method: 'GET',
          header: {
            'content-type': 'text/html'
          },
          success: function (res) {
            if (res.data.annotations.length == 0) {
              that.check()
              return
            }
            var temp = res.data.annotations[0].content
            temp = temp.split(String.fromCharCode(10))
            that.setData({
              "book.review": temp
            })
            that.check()
          }
        })
      }
    })
  },

  get_relat: function (isbn) {
    var that = this
    var relat_book = []
    wx.request({
      url: `${app.url}book/rec/isbn/${isbn}`,
      method: "GET",
      success: function (res) {
        res.data.books.forEach(function (value, index, array) {
          if (value.image != undefined)
            relat_book.push(value)
        })
        relat_book.length = relat_book.length < 9 ? relat_book.length : 9
        that.setData({
          "book.relat": relat_book
        })
      }
    })
  },


  get_brief_book: function (book) {
    this.title = book.title
    this.image = book.image
    this.isbn = book.isbn
    this.publisher = book.publisher
    this.author = book.author
    this.store = book.store
  },

  borrow_book: function () {
    app.book_ishelf.unshift(new this.get_brief_book(this.data.book))
    wx.setStorage({
      key: 'book_ishelf',
      data: app.book_ishelf
    })
    wx.switchTab({
      url: '../book_shelf/book_shelf'
    })
  },

  put_book: function () {
    this.setData({
      'put_book_shelf': true
    })
    var that = this
    setTimeout(function () {
      that.setData({
        'put_book_shelf': false
      })
    }, 2500)

    app.book_ishelf.unshift(new this.get_brief_book(this.data.book))
    wx.setStorage({
      key: 'book_ishelf',
      data: app.book_ishelf
    })
  },

  text_style_cha: function (e) {
    var index = Number(e.currentTarget.dataset.index)
    var data_temp = {}
    if (this.data.text_style[index].text == "launch_text") {
      data_temp['text_style[' + index + '].text'] = 'fold_text'
      data_temp['text_style[' + index + '].image'] = '../../source/arrow_down.png'
    }
    else {
      data_temp['text_style[' + index + '].text'] = 'launch_text'
      data_temp['text_style[' + index + '].image'] = '../../source/arrow_up.png'
    }
    this.setData(data_temp)
  },

  favor_behvor: function () {
    if (this.data.isfavor == '已收藏') {
      this.setData({
        'favor_image': '../../source/favor.png',
        'isfavor': '收藏'
      })
      wx.request({
        url: `${app.url}collection/${this.data.book.isbn}`,
        method: 'DELETE',
        header: {
          WX_SESSION_ID: app.sessionId
        },
        success: function (res) {
        }
      })
    }
    else {
      wx.request({
        url: `${app.url}collection`,
        method: 'POST',
        header: {
          WX_SESSION_ID: app.sessionId
        },
        data: {
          isbn: `${this.data.book.isbn}`
        },
        success: function (res) {
        }
      })

      this.setData({
        'favor_image': '../../source/favoring.png',
        'isfavor': '已收藏'
      })
    }

  },
  search_tag: function (e) {
    wx.redirectTo({
      url: `../search/search?act=search&key=${e.target.dataset.tag}`,
    })
  },

  change_book: function (e) {
    var isbn = e.target.dataset.isbn
    wx.navigateTo({
      url: `../showBook/showBook?isbn=${isbn}`
    })
  }
  
})