// pages/textBook/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleColorStep: ['rgb(50, 151, 253)', 'rgb(8, 190, 166)', 'rgb(233, 120, 15)', 'rgb(160, 23, 240)', 'rgb(23, 240, 77)'],
    schoolid: 1,
    timetable:[
      {isWorkDay: 1,teachers:[],title: "星期六"},
      {isWorkDay: 1,teachers:[],title:"星期日"},
      {isWorkDay: 2,teachers:[],title:"星期一"},
      {isWorkDay: 1,teachers:[],title:"星期二"},
      {isWorkDay: 1,teachers:[],title:"星期三"},
      {isWorkDay: 1,teachers:[],title:"星期四"},
      {isWorkDay: 1,teachers:[],title:"星期五"}
    ]
  },
  getLessonData() {
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
          timetable: res.result.data[0].detail.timetableConfig
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '课程介绍'
    });
    this.getLessonData();
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