var app = getApp()
// pages/borrow/borrow.js
import io from '../../utils/io'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_book: [],
    borrow_book: [],
    
    return_book: false,
    image_qr: null,
    show_order:true,
    order_style:"order_check",
    borrow_style:"",
    empty:{
      borrow:false,
      order:false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    
    app.borrow_book.forEach(function (value, index, array) {
      if (value.takeline != undefined) {
        value.text = "预定保留"
        value.style = "#f9957c"
      }
      else {
        value.text = "暂无馆藏"
        value.style = "#b97248"
      }
    })
    this.setData({
      book: app.borrow_book
    })
    if(app.borrow_book.lenght == 0){
      this.setData({
        "empty.borrow" :true
      })
    }
  },
  skip: function (e) {
    var isbn = e.target.dataset.isbn
    wx.navigateTo({
      url: `../showBook/showBook?isbn=${isbn}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
  take_book: function (e) {
    var index = e.target.dataset.index
    if (this.data.book[index].takeline == undefined)
      return
    wx.showModal({
      title: '取书时间信息',
      showCancel: false,
      content: `请与${this.data.book[index].takeline}前取书`,
    })
  },
  return_book: function (e) {
    console.log("fuck")
    var that = this    
  
    if (app.me){
      console.log("fuck you")
      app.me.disconnect();
    }
    app.me = io(app.socket_url);

    var me = app.me;
    me.on('connect', () => {
      console.log("connect")

      me.on('return qr', (data) => {
        console.log("qr")
        that.setData({
          image_qr: data.qr,
          return_book: true
        })
      });
      me.on('return error', () => {
        // 出错了，可能是不让借太多书
        // 二维码没收到，不画。

        console.log('ERROR return error');
        app.me.disconnect();
        app.me = undefined;
      });
      me.on('return one', (data) => {
        const bookId = data.book;
        const bookISBN = data.isbn;
        // isbn bbb
      });

      me.on('return', (data) => {
        console.log("all right")
        that.return_finish(index)
        app.me.disconnect();
        app.me = undefined;
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
          title: '二维码过期请重新还书',
          success: function () {
            that.setData({
              image_qr: null,
              return_book: false
            })
          }
        })
        // 时间到了，二维码撤掉
      });


      // 这样发起
      console.log("emit")
      me.emit('action', {
        sessionId: app.sessionId,
        action: 'return qr',
        body: {}
      });
    })
  },


  return_finish: function (index) {
    var that = this
    this.setData({
      image_qr: null,
      return_book: false
    })
    app.borrow_book.splice(index,1)
    if(app.borrow_book.length == 0)
      app.borrow_book = []
    wx.setStorage({
      key: "borrow_book",
      data: app.borrow_book,
    })
    console.log("hello")
    wx.navigateTo({
      url: '../act_success/act_success',
    })
  },
  action_return: function () {
    this.setData({
      return_book: false,
      image_qr: null
    })
  },

  change_to_order:function(e){
    this.setData({
      show_order:true,
      order_style:"order_check",
      borrow_style:""
    })
  },

  change_to_borrow:function(e){
    this.setData({
      show_order: false,
      order_style: "",
      borrow_style:"borrow_check"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */

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