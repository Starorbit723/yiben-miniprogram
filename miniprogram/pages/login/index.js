// pages/login/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
  },
  doLoginStart() {
    if (!this.data.isAgree) {
      wx.showToast({
        title: '请先阅读并同意用户协议及隐私政策',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      return;
    }
    // 这里先模拟登录成功
    app.globalData.yibenId = 'yb123456';
    console.log(app.globalData);
    wx.navigateBack({
      delta: 1
    });
  },
  clickAgree() {
    this.setData({
      isAgree: !this.data.isAgree
    });
  },
  clickToAgreement() {
    wx.navigateTo({
      url: `/pages/agreement/index`,
    });
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