// pages/favor/favor.js
var app = getApp()
Page({
  data: {
    book: []
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
      data_temp.book.splice(index,1)
      this.setData(data_temp)
      this.temp_f = -1
      app.favor_book.splice(index, 1)
      wx.setStorageSync("favor_book", app.favor_book)
    }
    else
      this.can_del()
  },
  skip: function (e) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      this.setData({
        "book":app.favor_book
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
    var favor_book = wx.getStorageSync('favor_book')
    if (favor_book == '') {
      wx.setStorage({
        key: 'favor_book',
        data: []
      })
    }
    else {
      this.setData({
        "book": favor_book
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // wx.request({
    //   url: '',
    // })
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