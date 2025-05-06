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
      name: 'operations',
      data: {
        type: 'userLogin'
      }
    }).then(res => {
      console.log('userLogin result:', res);
      // 这里先模拟登录成功
      app.globalData.userInfo.yibenid = res.result.data.yibenid;
      app.globalData.userInfo.openid = res.result.data.openid;
      app.globalData.userInfo.unionid = res.result.data.unionid;
      app.globalData.userInfo.userType = res.result.data.userType;
      app.globalData.userInfo.point = res.result.data.point;
      app.globalData.userInfo.parentName = res.result.data.parentName;
      app.globalData.userInfo.phoneNumber = res.result.data.phoneNumber;
      app.globalData.userInfo.children = res.result.data.children;
      // wx 相关
      app.globalData.userInfo.nickName = res.result.data.nickName;
      app.globalData.userInfo.avatarUrl = res.result.data.avatarUrl;
      app.globalData.userInfo.city = res.result.data.city;
      app.globalData.userInfo.gender = res.result.data.gender;
      app.globalData.userInfo.language = res.result.data.language;
      app.globalData.userInfo.country = res.result.data.country;
      app.globalData.userInfo.province = res.result.data.province;
      setTimeout(() => {
        console.log(app.globalData);
      }, 300);
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
    wx.setNavigationBarTitle({
      title: '登录'
    });
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