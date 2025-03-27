const { envList } = require("../../envList");

Page({
  data: {
    stepList: [{
      text1: '拼团发起人',
      text2: '填写信息'
    },{
      text1: '分享预约单',
      text2: '给其他参与者'
    },{
      text1: '给其他参与者',
      text2: '继续填写'
    },{
      text1: '完成拼团',
      text2: '享受优惠'
    }] 
  },
  gotoOtherAppointment() {
    wx.navigateTo({
      url: `/pages/otherAppointment/index?envId=3`,
    });
  },
});
