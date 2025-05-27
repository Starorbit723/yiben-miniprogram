const app = getApp();

Page({
  data: {
    schoolid: 1,
    interval: 4000,
    duration: 500,
    advList: [],
    activityList: [],
    userInfo: {}, // 随时同步globalData里的数据
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '首页'
    });
    this.getAllData();
  },
  getAllData() {
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'schoolRead',
        data: {
          schoolid: this.data.schoolid,
        },
      }
    }).then(res => {
      console.log('schoolRead result:', res);
      if (res.result.success) {
        this.setData({
          advList: res.result.data[0].detail.swiperData,
          activityList: res.result.data[0].detail.activityData,
        });
      } else {
        wx.showToast({
          title: '网络异常，请稍后再试',
          icon: 'none',
          duration: 2000,
          mask: true
        });
      }
    }).catch(err => {
      wx.showToast({
        title: '网络异常，请稍后再试',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      console.error('bookMain error:', err);
    });
  },
  gotoTestPage() {
    wx.navigateTo({
      url: `/pages/testPage/index`,
    });
  },
  goToLogin() {
    wx.navigateTo({
      url: `/pages/login/index`,
    });
  },
  goToTeachers() {
    wx.navigateTo({
      url: `/pages/teachers/index`,
    });
  },
  goToLesson() {
    wx.navigateTo({
      url: `/pages/lesson/index`,
    });
  },
  goToSchool() {
    // wx.navigateTo({
    //   url: `/pages/school/index`,
    // });
    wx.navigateTo({
      url: `/pages/aboutUs/index`,
    });
  },
  goToTextBook() {
    wx.navigateTo({
      url: `/pages/textBook/index`,
    });
  },
  goToConnectUs() {
    wx.navigateTo({
      url: `/pages/connectUs/index`,
    });
  },
});
