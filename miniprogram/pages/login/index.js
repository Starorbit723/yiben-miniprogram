// pages/login/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
    canGoBack: ''
  },
  doLoginStart() {
    if (!this.data.isAgree) {
      wx.showToast({
        title: '请先阅读并同意用户协议及隐私政策',
        icon: 'none',
        duration: 1500,
        mask: true
      });
      return;
    }
    wx.cloud.callFunction({
      name: 'utils',
      data: {
        type: 'wxId'
      }
    }).then(res => {
      console.log('wxId result:', res);
      // 这里先模拟登录成功
      app.globalData.userInfo = res.result;
      console.log(app.globalData);
      if (this.data.canGoBack === '0') {
        wx.switchTab({
          url: '/pages/index/index'
        })
      } else {
        wx.navigateBack({
          delta: 1
        });
      }
    }).catch(err => {
      console.error('wxId error:', err)
    })
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
    this.setData({
      canGoBack: options.canGoBack || 1,
    });
    console.log('canGoBack', this.data.canGoBack);
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