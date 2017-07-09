var app = getApp()
Page({
  data: {
  },
  formSubmit:function(e){
    wx.request({
      url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9481ac5ec5bc457f&secret=c7c03d91b150689c17e2dfa015b7cdc6`,
      success:function(res){
        wx.request({
          url: `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${res.data.access_token}`,
          method:'POST',
          data:{
            touser: app.openId,
            template_id: "fnbyFFGFSygqW_AGWaCyHNezzkT08svpydEUsS1KtgY",
            form_id: e.detail.formId,
          },
          success:function(a){
          }
        })
      }
    })
  }
})