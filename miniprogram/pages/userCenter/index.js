// pages/userCenter/index.js
const { getWxCode } = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
  },
  gotoAccount() {
    wx.navigateTo({
      url: `/pages/account/index?envId=3`,
    });
  },
  gotoOrderList() {
    wx.navigateTo({
      url: `/pages/orderList/index?envId=3`,
    });
  },
  gotoAgreement() {
    wx.navigateTo({
      url: `/pages/agreement/index?envId=3`,
    });
  },
  gotoAboutUs() {
    wx.navigateTo({
      url: `/pages/aboutUs/index?envId=3`,
    });
  },
  gotoConnectUs() {
    wx.navigateTo({
      url: `/pages/connectUs/index?envId=3`,
    });
  },
  getUserInfo(code) {
    console.log('getUserInfo', code);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    getWxCode(this.getUserInfo);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})