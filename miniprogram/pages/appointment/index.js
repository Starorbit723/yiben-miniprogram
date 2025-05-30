const app = getApp();

Page({
  data: {
    testConsole: '',
    showModal: false,
  },
  openModal() {
    this.setData({
      showModal: true
    });
  },
  closeModal() {
    this.setData({
      showModal: false
    });
  },
  gotoSingleAppointment() {
    if (!app.globalData.userInfo.yibenid) {
      wx.navigateTo({
        url: `/pages/login/index`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/singleAppointment/index`,
      });
    }
  },
  gotoGroupAppointment() {
    if (!app.globalData.userInfo.yibenid) {
      wx.navigateTo({
        url: `/pages/login/index`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/groupAppointment/index`,
      });
    }
  },
  onShareAppMessage() {
    console.log('分享到个人', app.globalData);
    let _originInfo = '';
    if (app.globalData.originYibenid && app.globalData.originOpenid) {
      _originInfo = `&originYibenid=${app.globalData.originYibenid}&originOpenid=${app.globalData.originOpenid}`;
    } else {
      _originInfo = `&originYibenid=${app.globalData.userInfo.yibenid}&originOpenid=${app.globalData.userInfo.openid}`
    }
    return {
      title: '快来参加壹本英语体验课吧！多人拼团享优惠',
      path: `/pages/appointment/index?shareFrom=friend${_originInfo}&prevYibenid=${app.globalData.userInfo.yibenid}&prevOpenid=${app.globalData.userInfo.openid}`,
      imageUrl: 'https://636c-cloud1-0gvvdaq4c40b8f74-1351667792.tcb.qcloud.la/uploads/1748590157239-shareImg.png?sign=998210867d919d0dbaaa3926da19393d&t=1748590157',
    };
  },
  onShareTimeline() {
    let _originInfo = '';
    if (app.globalData.originYibenid && app.globalData.originOpenid) {
      _originInfo = `&originYibenid=${app.globalData.originYibenid}&originOpenid=${app.globalData.originOpenid}`;
    } else {
      _originInfo = `&originYibenid=${app.globalData.userInfo.yibenid}&originOpenid=${app.globalData.userInfo.openid}`
    }
    return {
      title: '快来参加壹本英语体验课吧！多人拼团享优惠',
      imageUrl: 'https://636c-cloud1-0gvvdaq4c40b8f74-1351667792.tcb.qcloud.la/uploads/1748590157239-shareImg.png?sign=998210867d919d0dbaaa3926da19393d&t=1748590157',
      query: `shareFrom=pyq${_originInfo}&prevYibenid=${app.globalData.userInfo.yibenid}&prevOpenid=${app.globalData.userInfo.openid}`
    }
  },
  toQueryString(obj) {
    const parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    }
    return parts.join('&');
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (!app.globalData.userInfo.openid) {
      wx.showToast({
        title: '尊敬的用户，请您登录后再预约',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/login/index?canGoBack=0`,
        });
      }, 2100);
    }
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '预约试听'
    });
    console.log('onLoad', options, app.globalData);
    if (options.shareFrom) {
      if (options.originYibenid && options.originOpenid) {
        app.globalData.originYibenid = options.originYibenid;
        app.globalData.originOpenid = options.originOpenid;
      }
      if (options.prevYibenid && options.prevOpenid) {
        app.globalData.prevYibenid = options.prevYibenid;
        app.globalData.prevOpenid = options.prevOpenid;
      }
      console.log('存入', app.globalData);
    }
    this.setData({
      testConsole: `shareFrom:${options.shareFrom}  originYibenid:${options.originYibenid} prevYibenid:${options.prevYibenid}`
    });
  }
});
