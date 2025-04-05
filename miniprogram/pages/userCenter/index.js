// pages/userCenter/index.js
const { getWxCode } = require("../../utils/common.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false,
    code: '',
    userInfo: {
      avatarUrl: "",
      city: "",
      country: "",
      province: "",
      gender: "",
      language: "",
      nickName: "",
      age: "",
      point: "",
    }
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
    this.setData({
      code: code
    })
    this.getUserProfile();
    this.getOpenId();
  },
  getUserProfile() {
    console.log('getUserProfile');
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const _userinfo = Object.assign(this.data.userInfo, res.userInfo);
        this.setData({
          userInfo: _userinfo,
        });
        console.log(this.data.userInfo);
      }
    })
  },
  getOpenId() {
    const code = this.data.code;
    const appid = app.globalData.appid;
    const secret = app.globalData.secret;
    wx.request({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
      success:(res)=>{
        console.log(res);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
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