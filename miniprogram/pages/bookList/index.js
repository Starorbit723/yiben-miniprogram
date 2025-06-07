const app = getApp();
const { schoolNameShow, bookTypeName, formatDate, encryptPhoneNumber } = require("../../utils/common.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
  },
  openDetail(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      [`bookList[${e.currentTarget.dataset.index}].strench`]: true
    });
  },
  closeDetail(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      [`bookList[${e.currentTarget.dataset.index}].strench`]: false
    });
  },
  getUserBookList() {
    console.log('bookOfUser call', this.data.form);
    console.log('globalData', app.globalData);
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'bookOfUser',
        data: {
          yibenid: app.globalData.userInfo.yibenid,
        },
      }
    }).then(res => {
      console.log('bookOfUser result:', res);
      if (res.result.success) {
        this.setData({
          bookList: this.filterBookList(res.result.data),
        });
      }
    }).catch(err => {
      console.error('bookOfUser error:', err);
    });
  },
  filterBookList(list) {
    if (list && list.length >= 1) {
      list.forEach(item => {
        item.strench = false;
        item.schoolName = schoolNameShow(item.schoolid);
        item.createTimeShow = formatDate(item.createTime);
        item.bookTypeNameShow = bookTypeName(item.bookType);
        item.matchTeacher = item.matchTeacher || '待分配';
        item.lessonTimeShow = item.lessonTime ? formatDate(item.lessonTime) : '待校区确认';
        item.lessonRoom =  item.lessonRoom || '待校区确认';
        item.ownerPhoneShow = encryptPhoneNumber(item.ownerPhone);
        if (item.bookType === 2 && item.groupInfoList.length > 0) {
          item.groupInfoList.forEach(item2 => {
            item2.memberPhoneShow = encryptPhoneNumber(item2.memberPhone);
          });
        }
      });
      console.log('formate list', list);
      return list;
    }
    return [];
  },
  gotoShare(e) {
    console.log(e.target.dataset.bookid);
    wx.navigateTo({
      url: `/pages/shareAppointment/index?bookid=${e.target.dataset.bookid}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '我的预约'
    });
    this.getUserBookList();
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