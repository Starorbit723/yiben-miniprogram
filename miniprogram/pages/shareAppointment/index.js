const { envList } = require("../../envList");

Page({
  data: {
    testConsole: '',
    showPage: false,
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
    if (options.shareFrom === 'pyq') {
      wx.redirectTo({
        url: `/pages/otherAppointment/index?${this.toQueryString(options)}`
      })
      return;
    }
    this.setData({
      showPage: true
    });
    this.setData({
      shareFrom: options.shareFrom || '',
      orderId: options.orderId
    });
    console.log('orderId', this.data.orderId);
    this.setData({
      testConsole: `shareFrom:${options.shareFrom}  orderId:${this.data.orderId}`
    })
  },
  onShareAppMessage() {
    return {
      title: '快来参加壹本英语体验课吧！多人拼团享优惠',
      path: `/pages/otherAppointment/index?shareFrom=friend&orderId=${this.data.orderId}`,
      imageUrl: '../../images/shareImg.png',
    };
  },
  onShareTimeline() {
    return {
      title: '快来参加壹本英语体验课吧！多人拼团享优惠',
      imageUrl: '../../images/shareImg.png',
      query: `shareFrom=pyq&orderId=${this.data.orderId}`
    };
  },
  toQueryString(obj) {
    const parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    }
    return parts.join('&');
  }
});
