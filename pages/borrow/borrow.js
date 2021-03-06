var app = getApp()
// pages/borrow/borrow.js
import io from '../../utils/io'
import date from '../../utils/util'
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
  request_borrow_book: function () {
    var that = this

    wx.request({
      url: `${app.url}user/ordering/all`,
      method: 'GET',
      header: {
        WX_SESSION_ID: app.sessionId
      },
      success: function (res) {
        that.setData({
          order_book : res.data.books
        })
        that.change_style()
      }
    })

    wx.request({
      url:`${app.url}user/borrowing`,
      method:'GET',
      header:{
        WX_SESSION_ID:app.sessionId
      },
      success:function(res){
        console.log(res)
        var temp = []
        res.data.books.forEach(function(item,index,array){
          if (item.returned == 0)
          temp.push(item)
        })
        temp.forEach(function(item,index,array){
          var dat = new Date(item.borrow_time)
          dat.setMonth(dat.getMonth() + 1)
          item.borrow_time = date.formatTime(dat)
        })
        that.setData({
          borrow_book: temp
        })
        if (that.data.borrow_book.length == 0) {
          that.setData({
            "empty.borrow": true
          })
        }
      }
    })

  },

  change_style:function(){
    var temp = this.data.order_book
    temp.forEach(function (value, index, array) {
      if (value.fetch_time != undefined) {
        value.text = "预定保留"
        value.style = "#f9957c"
      }
      else {
        value.text = "暂无馆藏"
        value.style = "#b97248"
      }
    })

    this.setData({
      order_book: temp
    })

    if (this.data.order_book.length == 0) {
      this.setData({
        "empty.order": true
      })
    }
  },
  onShow: function () {
    this.request_borrow_book()
  },
  skip: function (e) {
    var isbn = e.currentTarget.dataset.isbn
    wx.navigateTo({
      url: `../showBook/showBook?isbn=${isbn}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
  take_book: function (e) {
    var index = e.target.dataset.index
    if (this.data.order_book[index].fetch_time == undefined)
      return
    wx.showModal({
      title: '取书时间信息',
      showCancel: false,
      content: `请于${date.formatTime(new Date(this.data.order_book[index].fetch_time))}前取书`,
    })
  },
  
  return_book: function (e) {
    var that = this    
  
    if (app.me){
      app.me.disconnect();
    }
    app.me = io(app.socket_url);

    var me = app.me;
    me.on('connect', () => {

      me.on('return qr', (data) => {
        that.setData({
          image_qr: data.qr,
          return_book: true
        })
      });
      me.on('return error', () => {
        // 出错了，可能是不让借太多书
        // 二维码没收到，不画。

        app.me.disconnect();
        app.me = undefined;
      });
      me.on('return one', (data) => {
        const bookId = data.book;
        const bookISBN = data.isbn;
        // isbn bbb
      });

      me.on('return', (data) => {
        that.return_finish()
        app.me.disconnect();
        app.me = undefined;
        // 全都完成了，二维码可以撤掉了
      });

      me.on('scan', () => {

        //  被扫了
      })

      me.on('error', () => {
        app.me.disconnect();
        app.me = undefined;
        // 出错了，提示
      });

      me.on('timeout', () => {
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
      me.emit('action', {
        sessionId: app.sessionId,
        action: 'return qr',
        body: {}
      });
    })

  },


  return_finish: function () {
    var that = this
    this.setData({
      image_qr: null,
      return_book: false
    })
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
    if(this.data.return_book == true)
      return
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