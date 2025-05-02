const app = getApp();

Page({
  data: {
    bookid: '',
    form: {
      ownerName: '',
      ownerChildren: '',
      ownerPhone: '',
      schoolid: 1
    },
    schoolOptions: [
      {id: 1 , name: '广安门校区'}
    ],
    latitude: 39.890780,
    longitude: 116.355712,
    markers: [{
      id: 1,
      latitude: 39.890780,
      longitude: 116.355712,
      name: '广益大厦'
    }],
  },
  submitSigleAppointment() {
    console.log('bookMain call', this.data.form);
    console.log('globalData', app.globalData);
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'bookMain',
        data: {
          yibenid: app.globalData.userInfo.yibenid,
          openid: app.globalData.userInfo.openid,
          bookType: 1,
          originYibenid: app.globalData.originYibenid ? app.globalData.originYibenid : app.globalData.userInfo.yibenid,
          originOpenid: app.globalData.originOpenid ? app.globalData.originOpenid : app.globalData.userInfo.openid,
          prevYibenid: app.globalData.prevYibenid ? app.globalData.prevYibenid : app.globalData.userInfo.yibenid,
          prevOpenid: app.globalData.prevOpenid ? app.globalData.prevOpenid : app.globalData.userInfo.openid,
          ownerName: this.data.form.ownerName,
          ownerPhone: this.data.form.ownerPhone,
          ownerChildren: this.data.form.ownerChildren,
          schoolid: this.data.form.schoolid,
        },
      }
    }).then(res => {
      console.log('bookMain result:', res);
      wx.showToast({
        title: '预约成功，您可以在我的订单中查看预约信息',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/userCenter/index'
        })
      }, 2000);
      if (res.result.success) {
        this.setData({
          bookid: res.result.bookid
        });
      }
    }).catch(err => {
      console.error('userInfoAuto error:', err)
    });
  },
  ownerNameInput(e) {
    this.setData({
      [`form.ownerName`]: e.detail.value
    });
  },
  ownerChildrenInput(e) {
    this.setData({
      [`form.ownerChildren`]: [ e.detail.value ]
    });
  },
  ownerPhoneInput(e) {
    this.setData({
      [`form.ownerPhone`]: e.detail.value
    });
  },
});
