var level = require('level.js')
Page({
  data: {
    chinese_level: [],
    foreign_level: [],
    seleted: 5,
    show_chinese: true,
    show_second: false,
    index: 1,
    system_height:''
  },
  onShow: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          system_height: res.windowHeight-51
        })
      }
    })
    this.setData({
      "chinese_level" : level.chinese_level
    })
    this.setData({
      "foreign_level": level.foreign_level
    })
  },
  change_to_foreign: function () {
    this.setData({
      'show_chinese': false
    })
  },
  change_to_chinese: function () {
    this.setData({
      'show_chinese': true
    })
  },
  change_to_second: function (e) {
    var index = e.target.dataset.index
    var tpe = e.target.dataset.type
    this.setData({
      "index": index,
      'show_second': true,
    })
  },
  focus: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  change_to_first: function () {
    if (this.data.show_second == true) {
      var that = this
     that.setData({
        'show_second' : false
      })
    }
  },
  search_by_type:function(e){
    if (e.target.dataset.type =='chinese')
      var key = this.data.chinese_level[this.data.index].second_level[e.target.dataset.index]
    else{
      var key = this.data.foreign_level[this.data.index].second_level[e.target.dataset.index][0]
    }
    wx.navigateTo({
      url: `../search/search?act=search&key=${key}`,
    })
  }
})