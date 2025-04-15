const { envList } = require("../../envList");
const app = getApp();

Page({
  data: {
    testConsole: '',
    showPage: false,
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
    }],
    // 分享数据
    shareFrom: '',
    orderId: ''
  },
  onLoad(options) {
    this.setData({
      shareFrom: options.shareFrom || '',
      orderId: options.orderId || ''
    });
    console.log('orderId', this.data.orderId);
    this.setData({
      testConsole: `shareFrom:${options.shareFrom}  orderId:${this.data.orderId}`
    });
  },
  ensureJoinIn() {
    if (!app.globalData.yibenid) {
      wx.navigateTo({
        url: `/pages/login/index`,
      });
    }
    wx.redirectTo({
      url: `/pages/finishGroupAppointment/index`,
    });
  },
});
