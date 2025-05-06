const app = getApp();
const { validatePhoneNumber, validateUsername } = require("../../utils/common.js");

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
    requestLock: false,
  },
  submitSigleAppointment() {
    console.log('bookMain call', this.data.form);
    console.log('globalData', app.globalData);
    // 验证
    if (!validateUsername(this.data.form.ownerName)) {
      wx.showToast({
        title: '请确认预约人姓名是否有误',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      return;
    }
    if (!validateUsername(this.data.form.ownerChildren)) {
      wx.showToast({
        title: '请确认学生姓名是否有误',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      return;
    }
    if (!validatePhoneNumber(this.data.form.ownerPhone)) {
      wx.showToast({
        title: '请确认手机号是否有误',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      return;
    }
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
        this.setData({
          requestLock: false
        });
        if (res.result.success) {
          this.setData({
            bookid: res.result.bookid,
          });
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
          }, 1900);
        } else {
          wx.showToast({
            title: res.result.errMsg,
            icon: 'none',
            duration: 2000,
            mask: true
          });
        }
      }).catch(err => {
        wx.showToast({
          title: res.result.errMsg,
          icon: 'none',
          duration: 2000,
          mask: true
        });
        this.setData({
          requestLock: false
        });
        console.error('userInfoAuto error:', err)
      });
    }
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
