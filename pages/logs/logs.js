 //logs.js
var app = getApp()
Page({
  data: {
    history: undefined,
    hot_trend: ['嫌疑人X的献身', '上瘾', '造彩虹的人', '别来无恙', '夏洛克是我的名字', '黄狗', '霍比特人','没有你，什么都不甜蜜'],
    inputVal: '',
    isHistory: null,
    search_status: true,
    isSearching: false,
    book:null,
    tips:false
  },
  book_num : 0,
  event: null,
  search_num: 0,
  bottom_update:false,
  onLoad: function (res) {
    this.setData({
      'history': app.history,
    })
    if (app.history.length == 0)
      this.setData({
        'isHistory': false
      })
    else
      this.setData({
        'isHistory': true
      })
    if (res.act == 'scan') {
      this.scan_book()
    }
    if (res.act == 'search') {
      this.change_val(res.key)
    }
  },
  scan_book: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        that.request_book(res.result)
      }
    })
  },
  skip: function (e) {
    wx.navigateTo({
      url: `../showBook/showBook?isbn=${e.target.dataset.isbn}&store=${e.target.dataset.store}`
    })
  },
  request_book: function (res) {
    var that = this
    if (this.search_num < 3) {
      var search_Val = this.data.inputVal
      if (res != undefined) {
        that.setData({
          inputVal : res
        })
        search_Val = res
      }
      this.search_num++;
      wx.request({
        url: `https://api.douban.com/v2/book/search?q=${search_Val}`,
        method: 'GET',
        header: {
          'content-type': 'text/html'
        },
        data:{

        },
        success: function (res) {
          console.log(res)
          if (res.data.books == undefined) {
            that.setData({
              'isSearching': false,
              "search_status": false
            })
            return
          }
          res.data.books.forEach(function(item,index,array){
            item.store = Math.floor(Math.random() * 6)
          })
          that.setData({
            'book': res.data.books,
            'isSearching': false,
            "search_status": false
          })
          that.book_num = 20
        },
        complete:function(){
          that.search_num--
        }
      })
    }
    if (this.data.inputVal == "") {
      this.setData({
        'search_status': true,
        'isSearching': false
      })
    }
  },
  search_ac: function (e) {
    if (e.target.dataset.type == "hot") {
      var str = this.data.hot_trend[e.target.dataset.index]
    }
    else if (e.target.dataset.type == "history") {
      var str = this.data.history[e.target.dataset.index]
    }
    this.change_val(str)
  },
  change_val: function (str) {
    var that = this
    if (str == "") {
      this.setData({
        'inputVal': str,
        'search_status': true,
        'isSearching': false
      })
    }
    else {
      if (this.data.inputVal.length < str.length) {
        var that = this
        this.setData({
          'inputVal': str,
          'isSearching': true
        })
        setTimeout(function () { that.request_book() }, 300)
      }
      else {
        this.setData({
          'inputVal': str,
          'isSearching': false
        })
      }
    }
  },
  bindinput: function (e) {
    this.change_val(e.detail.value)
  },
  clear: function (e) {
    this.setData({
      'inputVal': '',
      'search_status': true
    })
  },
  clear_history: function (e) {
    this.setData({
      'isHistory': false,
      'history': []
    })
    app.history = []
    wx.setStorage({
      key: 'history',
      data: [],
    })
  },
  search: function () {
    if (this.data.inputVal.trim() == "")
      return
    app.history.unshift(this.data.inputVal)
    this.setData({
      'history': app.history,
      'isHistory': true,
      'isSearching':true
    })
    wx.setStorage({
      key: 'history',
      data: app.history,
    })
    this.request_book()
  }, 
  
  
  onReachBottom: function () {
    if(this.bottom_update == true)
      return
    if(this.book_num == 'all'){
      this.show_tips()
      return
    }
      
    this.bottom_update = true
    var that = this
    this.book_num += 20
    var search_Val = this.data.inputVal
    wx.request({
      url: `https://api.douban.com/v2/book/search?q=${search_Val}&start=${this.book_num}`,
      method: 'GET',
      header: {
        'content-type': 'text/html'
      },
      data: {

      },
      success: function (res) {
        if(res.data.books.length == 0){
          that.book_num = 'all'
          that.show_tips()
          return
        }
        res.data.books.forEach(function (item, index, array) {
          item.store = Math.floor(Math.random() * 6)
        })
        var new_list = []
        new_list = that.data.book.concat(res.data.books)
        that.setData({
          'book': new_list
        })
        that.bottom_update = false
      }
    })
  },
  show_tips:function(){
    var that = this
    this.setData({
        tips:true
    })
    setTimeout(function(){
      that.setData({
        tips:false
      })
    },2500)
  }
})

