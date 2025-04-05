// app.js
App({
  globalData: {
    appid: 'wxe96a5b79479677ca',
    secret: '03513537d74911474f8ab869970293ff',
    userInfo: {
      avatarUrl: "",
      city: "",
      country: "",
      province: "",
      gender: "",
      language: "",
      nickName: "",
      age: "",
      point: "",
    }
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
