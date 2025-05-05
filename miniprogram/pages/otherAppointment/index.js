const app = getApp();

Page({
  data: {
    testConsole: '',
    // 分享数据
    shareFrom: '',
    bookid: '',
    // 主订单数据
    ownerName: '',
    ownerPhone: '',
    schoolid: 1,
    nowMembersNum: '',
    // 表单数据
    form: {
      bookid: '',
      memberName: '',
      memberPhone: '',
      memberChildren: '',
    },
    schoolOptions: [
      {id: 1 , name: '广安门校区'}
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
    requestLock: false,
  },
  onLoad(options) {
    this.setData({
      shareFrom: options.shareFrom || '',
      bookid: options.bookid || '',
      [`form.bookid`]: options.bookid || ''
    });
    console.log('bookid', this.data.bookid);
    this.getMainOrderInfo();
    this.setData({
      testConsole: `shareFrom:${options.shareFrom}  bookid:${this.data.bookid}`
    });
  },
  getMainOrderInfo() {
    console.log('getMainOrderInfo call');
    // 调用查询预定信息接口
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'bookManagePage',
        data: {
          pageNo: 1,
          pageSize: 20,
          condition: {
            bookid: this.data.bookid
          }
        }
      }
    }).then(res => {
      console.log('bookManagePage result:', res);
      if (res.result.success) {
        if (res.result.data.list.length >= 1) {
          this.setData({
            ownerName: res.result.data.list[0].ownerName,
            ownerPhone: res.result.data.list[0].ownerPhone,
            schoolid: res.result.data.list[0].schoolid,
            nowMembersNum: res.result.data.list[0].groupInfoList.length + '人',
          });
        }
      }
    }).catch(err => {
      console.error('bookManagePage error:', err);
    });
  },
  ensureJoinIn() {
    console.log('ensureJoinIn call', app.globalData, this.data.form);
    if (!app.globalData.userInfo.yibenid) {
      wx.navigateTo({
        url: `/pages/login/index`,
      });
    }
    console.log('globalData', app.globalData);
    if (!this.data.requestLock) {
      this.setData({
        requestLock: true
      });
      wx.cloud.callFunction({
        name: 'operations',
        data: {
          type: 'bookGroup',
          data: {
            bookid: this.data.bookid,
            memberOpenid: app.globalData.userInfo.openid,
            memberYibenid: app.globalData.userInfo.yibenid,
            memberName: this.data.form.memberName,
            memberPhone: this.data.form.memberPhone,
            memberChildren: this.data.form.memberChildren,
          },
        }
      }).then(res => {
        console.log('bookGroup result:', res);
        this.setData({
          requestLock: false
        });
        if (res.result.success) {
          wx.redirectTo({
            url: `/pages/finishGroupAppointment/index`,
          });
        } else {
          wx.showToast({
            title: res.result.errMsg,
            icon: 'none',
            duration: 2000,
            mask: true
          });
        }
      }).catch(err => {
        this.setData({
          requestLock: false
        });
        wx.showToast({
          title: '网络异常，请稍后再试',
          icon: 'none',
          duration: 2000,
          mask: true
        });
        console.error('bookGroup error:', err);
      });
    }
    
  },
  memberNameInput(e) {
    this.setData({
      [`form.memberName`]: e.detail.value
    });
  },
  memberChildrenInput(e) {
    this.setData({
      [`form.memberChildren`]: [ e.detail.value ]
    });
  },
  memberPhoneInput(e) {
    this.setData({
      [`form.memberPhone`]: e.detail.value
    });
  },
});
