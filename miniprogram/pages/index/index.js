const { envList } = require("../../envList");
const app = getApp();

Page({
  data: {
    advList: [
      { id: 1, imgurl: '../../images/swiper/swiper_adv1.png'}, 
      { id: 2, imgurl: '../../images/swiper/swiper_adv1.png'},
      { id: 3, imgurl: '../../images/swiper/swiper_adv1.png'}
    ],
    interval: 4000,
    duration: 500,
    activityList: [
      { id: 1, imgurl: '../../images/swiper/swiper_adv1.png'}, 
      { id: 2, imgurl: '../../images/swiper/swiper_adv1.png'},
    ],
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
    wx.navigateTo({
      url: `/pages/school/index`,
    });
  },
  goToTextBook() {
    wx.navigateTo({
      url: `/pages/textBook/index`,
    });
  },
});
