// app.js
App({
  globalData: {
    userInfo: {
      appid: '',
      yibenid: '',
      openid: '',
      unionid: '',
      parentName: '',
      phoneNumber: '',
      point: "",
      userType: 0, // 0 客户 1 销售 2 老师
      children: [],
      // 微信授权返回
      nickName: '',
      avatarUrl: "",
      city: "",
      country: "",
      province: "",
      gender: 0,
      language: "",
      age: ""
    },
    // 转发信息
    originYibenid: '',
    originOpenid: '',
    prevYibenid: '',
    prevOpenid: '',
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "cloud1-0gvvdaq4c40b8f74",
        traceUser: true,
      });
    }
    console.log(this.globalData);
  },
});
