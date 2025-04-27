const { envList } = require("../../envList");
const app = getApp();

Page({
  data: {
    bookid: '',
    form: {
      ownerName: '',
      ownerChildren: '',
      ownerPhone: '',
      schoolid: 0
    },
    schoolOptions: [
      {id: 0 , name: '广安门校区'}
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
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'bookMain',
        data: {
          yibenid: app.globalData.userInfo.yibenid,
          openid: app.globalData.userInfo.openid,
          bookType: 1,
          originOpenid: app.globalData.userInfo.openid,
          prevOpenid: app.globalData.userInfo.openid,
          ownerName: this.data.form.ownerName,
          ownerPhone: this.data.form.ownerPhone,
          ownerChildren: this.data.form.ownerChildren,
          schoolid: this.data.form.schoolid,
        },
      }
    }).then(res => {
      console.log('userInfoAuto result:', res);
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
