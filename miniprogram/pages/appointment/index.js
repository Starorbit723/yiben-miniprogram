const { envList } = require("../../envList");

Page({
  data: {
    showModal: false,
  },
  openModal() {
    this.setData({
      showModal: true
    });
  },
  closeModal() {
    this.setData({
      showModal: false
    });
  },
  gotoSingleAppointment() {
    wx.navigateTo({
      url: `/pages/singleAppointment/index?envId=1`,
    });
  },
  gotoGroupAppointment() {
    wx.navigateTo({
      url: `/pages/groupAppointment/index?envId=2`,
    });
  },
});
