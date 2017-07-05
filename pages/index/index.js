//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    show_recom: true,
    popul_book: [
      [{
        "title": "二手时间",
        "image": "https://img3.doubanio.com/lpic/s28397415.jpg",
        "isbn": "9787508658346"
      }, {
        "title": "极简宇宙史",
        "image": "https://img3.doubanio.com/lpic/s28453934.jpg",
        "isbn": "9787542654434"
      }, {
        "title": "你自以为的极限，只是别人的起点",
        "image": "https://img3.doubanio.com/lpic/s29448632.jpg",
        "isbn": "9787558213755"
      }],
      [{
        "title": "无人生还",
        "image": "https://img1.doubanio.com/lpic/s29012369.jpg",
        "isbn": "9787513322331"
      }, {
        "title": "造房子",
        "image": "https://img3.doubanio.com/lpic/s28944485.jpg",
        "isbn": "9787535678096"
      }, {
        "title": "北鸢",
        "image": "https://img3.doubanio.com/lpic/s29051355.jpg",
        "isbn": "9787020118076"
      }],
      [{
        "title": "我可以咬一口吗",
        "image": "https://img3.doubanio.com/lpic/s28685416.jpg",
        "isbn": "9787201102177"
      }, {
        "title": "我脑袋里的怪东西",
        "image": "https://img3.doubanio.com/lpic/s28880686.jpg",
        "isbn": "9787208135505"
      }, {
        "title": "巨人的陨落",
        "image": "https://img3.doubanio.com/lpic/s28668834.jpg",
        "isbn": "9787539989891"
      }]
    ],
    recom_book: [[{
      "title": "呼吸课",
      "image": "https://img1.doubanio.com/lpic/s29296447.jpg",
      "isbn": "9787530655603"
    }, {
      "title": "人间失格",
      "image": "https://img1.doubanio.com/lpic/s29118837.jpg",
      "isbn": "9787506380263"
    }, {
      "title": "解忧杂货店",
      "image": "https://img3.doubanio.com/lpic/s27264181.jpg",
      "isbn": "9787544270878"
    }],
    [{
      "title": "天才在左 疯子在右（完整版）",
      "image": "https://img3.doubanio.com/lpic/s28350186.jpg",
      "isbn": "9787550263932"
    }, {
      "title": "追风筝的人",
      "image": "https://img3.doubanio.com/lpic/s1727290.jpg",
      "isbn": "9787208061644"
    }, {
      "title": "白夜行",
      "image": "https://img1.doubanio.com/lpic/s24514468.jpg",
      "isbn": "9787544258609"
    }],

    [{
      "title": "一本书读完最美古诗词（上.下）",
      "image": "https://img3.doubanio.com/lpic/s28685416.jpg",
      "isbn": "9787201102177"
    }, {
      "title": "阿米巴经营",
      "image": "https://img3.doubanio.com/lpic/s29356475.jpg",
      "isbn": "9787500097167"
    }, {
      "title": "摆渡人",
      "image": "https://img3.doubanio.com/lpic/s28063701.jpg",
      "isbn": "9787550013247"
    }]
    ]
  },
  url: 'http://123.206.84.238:3000/w/login',
  code_login: function () {
    wx.login({
      success: function (res) {
        wx.request({
          url: 'http://123.206.84.238:3000/w/login',
          method: 'POST',
          header: {
            WX_CODE: res.code
          },
          success: function (res) {
            console.log(res)
            if (res.statusCode == 200) {
              wx.setStorage({
                key: 'sessionId',
                data: res.data.sessionId,
              })
              app.sessionId = res.data.sessionId
              app.openId = res.data.openId
            }
          }
        })
      }
    })
  },
  session_id_login: function () {
    var that = this
    wx.request({
      url: 'http://123.206.84.238:3000/w/login',
      method: 'POST',
      header: {
        WX_SESSION_ID: app.sessionId
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode != 200) {
          that.code_login()
        }
        app.openId = res.data.openId
      }
    })
  },
  onLoad: function () {
    // 在index页面进行登录步骤但并获取用户信息
    this.setData({
      show_recom: app.usr_setting.usr_reco
    })
    app.sessionId = wx.getStorageSync('sessionId')
    if (app.sessionId == undefined)
      this.code_login()
    else {
      this.session_id_login()
    }
    app.getUsrInfo()
  },
  //事件处理函数
  focus: function (e) {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  scan_book: function () {
    wx.navigateTo({
      url: '../borrow_book/borrow_book',
    })
  },
  navto: function (e) {
    wx.navigateTo({
      url: `../showBook/showBook?isbn=${e.currentTarget.dataset.isbn}`,
    })
  },
  classify_book: function () {
    wx.navigateTo({
      url: `../classify/classify`,
    })
  },
  my_borrow: function () {
    wx.navigateTo({
      url: `../borrow/borrow`,
    })
  }
})
