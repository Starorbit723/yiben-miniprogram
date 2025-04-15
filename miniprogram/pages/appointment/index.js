const { envList } = require("../../envList");
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
    if (!app.globalData.userinfo.yibenid) {
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
    if (!app.globalData.userinfo.yibenid) {
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
    return {
      title: '快来参加壹本英语体验课吧！多人拼团享优惠',
      path: `/pages/appointment/index?shareFrom=friend&originInfo=${app.globalData.userinfo.yibenid}#${app.globalData.userinfo.openid}&prevInfo=${app.globalData.userinfo.yibenid}#${app.globalData.userinfo.openid}`,
      imageUrl: '../../images/shareImg.png',
    };
  },
  onShareTimeline() {
    return {
      title: '快来参加壹本英语体验课吧！多人拼团享优惠',
      imageUrl: '../../images/shareImg.png',
      query: `shareFrom=pyq&orderId=${this.data.orderId}`
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
    this.setData({
      testConsole: `shareFrom:${options.shareFrom}  originInfo:${options.originInfo} prevInfo:${options.prevInfo}`
    });
  }
});
