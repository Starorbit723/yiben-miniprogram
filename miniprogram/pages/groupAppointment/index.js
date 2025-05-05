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
    stepList: [{
      text1: '拼团发起人',
      text2: '填写信息'
    },{
      text1: '分享预约单',
      text2: '给其他参与者'
    },{
      text1: '给其他参与者',
      text2: '继续填写'
    },{
      text1: '完成拼团',
      text2: '享受优惠'
    }],
    requestLock: false,
  },
  submitGroupAppointment() {
    console.log('bookMain call', this.data.form);
    console.log('globalData', app.globalData);
    if (!this.data.requestLock) {
      this.setData({
        requestLock: true
      });
      wx.cloud.callFunction({
        name: 'operations',
        data: {
          type: 'bookMain',
          data: {
            yibenid: app.globalData.userInfo.yibenid,
            openid: app.globalData.userInfo.openid,
            bookType: 2,
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
        this.setData({
          requestLock: false
        });
        if (res.result.success) {
          this.setData({
            bookid: res.result.bookid,
          });
          this.gotoShareAppointment();
        } else {
          wx.showToast({
            title: res.result.errMsg,
            icon: 'none',
            duration: 2000,
            mask: true
          });
        }
      }).catch(err => {
        this.setData({
          requestLock: false
        });
        wx.showToast({
          title: '网络异常，请稍后再试',
          icon: 'none',
          duration: 2000,
          mask: true
        });
        console.error('bookMain error:', err);
      });
    }
  },
  gotoShareAppointment() {
    wx.navigateTo({
      url: `/pages/shareAppointment/index?bookid=${this.data.bookid}`,
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
