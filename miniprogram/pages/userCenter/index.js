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
    },
    lastUpdate: ''
  },
  gotoAccount() {
    if (!app.globalData.userInfo.yibenid) {
      wx.navigateTo({
        url: `/pages/login/index`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/account/index`,
      });
    }
  },
  gotoOrderList() {
    if (!app.globalData.userInfo.yibenid) {
      wx.navigateTo({
        url: `/pages/login/index`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/bookList/index`,
      });
    }
  },
  gotoAgreement() {
    wx.navigateTo({
      url: `/pages/agreement/index`,
    });
  },
  gotoAboutUs() {
    wx.navigateTo({
      url: `/pages/aboutUs/index`,
    });
  },
  gotoConnectUs() {
    wx.navigateTo({
      url: `/pages/connectUs/index`,
    });
  },
  getUserInfo(code) {
    console.log('getUserInfo', code);
    this.setData({
      code: code
    })
    this.getUserProfile();
  },
  getUserProfile() {
    console.log('getUserProfile');
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('WX getUserProfile res', res.userInfo);
        const _userinfo = Object.assign(this.data.userInfo, res.userInfo);
        this.setData({
          userInfo: _userinfo,
        });
        // 更新全局信息
        app.globalData.userInfo.nickName = res.userInfo.nickName;
        app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl;
        app.globalData.userInfo.city = res.userInfo.city;
        app.globalData.userInfo.gender = res.userInfo.gender;
        app.globalData.userInfo.language = res.userInfo.language;
        app.globalData.userInfo.country = res.userInfo.country;
        app.globalData.userInfo.province = res.userInfo.province;
        console.log('getUserProfile', this.data.userInfo);
        // 如果已经登录了，做资料完善，否增去登录
        if (app.globalData.userInfo.yibenid && ((new Date().getTime() + 86400000) > this.data.lastUpdate)) {
          console.log('need update');
          this.updateUserWxInfo();
        } else {
          wx.navigateTo({
            url: `/pages/login/index`,
          });
        }
      }
    })
  },
  // 给后台回传微信接口信息
  updateUserWxInfo() {
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'userInfoAuto',
        data: {
          yibenid: app.globalData.userInfo.yibenid,
          nickName: app.globalData.userInfo.nickName,
          avatarUrl: app.globalData.userInfo.avatarUrl,
          city: app.globalData.userInfo.city,
          gender: app.globalData.userInfo.gender,
          language: app.globalData.userInfo.language,
          country: app.globalData.userInfo.country,
          province: app.globalData.userInfo.province,
        },
      }
    }).then(res => {
      console.log('userInfoAuto result:', res);
      this.setData({
        lastUpdate: new Date().getTime(),
      });
      console.log('lastUpdate', this.data.lastUpdate);
    }).catch(err => {
      console.error('userInfoAuto error:', err)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
    });
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
    this.setData({
      userInfo: app.globalData.userInfo
    });
    // 已登录情况下，获取全部用户信息，用户数据矫正
    if (app.globalData.userInfo.yibenid) {
      wx.cloud.callFunction({
        name: 'operations',
        data: {
          type: 'userOneInfo',
          data: {
            yibenid: app.globalData.userInfo.yibenid
          },
        }
      }).then(res => {
        console.log('userOneInfo result:', res);
        this.setData({
          userInfo: app.globalData.userInfo
        });
        console.log('update userInfo', this.data.userInfo);
      }).catch(err => {
        console.error('userOneInfo error:', err)
      });
      getWxCode(this.getUserInfo);
    }
    
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