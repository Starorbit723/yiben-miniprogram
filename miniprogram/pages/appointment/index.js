const { envList } = require("../../envList");
const app = getApp();

Page({
  data: {
    showModal: false,
    authCookie: '',
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
    if (!app.globalData.yibenId) {
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
    if (!app.globalData.yibenId) {
      wx.navigateTo({
        url: `/pages/login/index`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/groupAppointment/index?envId=2`,
      });
    }
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    try {
      const value = wx.getStorageSync('authCookie')
      if (value) {
        this.setData({
          authCookie: value
        });
      }
    } catch (e) {
      this.setData({
        authCookie: ''
      });
    }
    
  },
});
