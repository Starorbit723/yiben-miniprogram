const { envList } = require("../../envList");

Page({
  data: {
    form: {
      parentName: '',
      studentName: '',
      phoneNumber: '',
      school: 0
    },
    schoolOptions: [
      {id: 0 , name: '广安门校区'}
    ],
    latitude: 39.890780,
    longitude: 116.355712,
    markers: [{
      id: 1,
      latitude: 39.890780,
      longitude: 116.355712,
      name: '广益大厦'
    }],
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
  gotoShareAppointment() {

    wx.navigateTo({
      url: `/pages/shareAppointment/index?orderId=12345`,
    });
  },
});
