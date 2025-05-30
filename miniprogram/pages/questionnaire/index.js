// pages/lesson/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionnaireid: '',
    schoolid: '',
    questionList: [],
  },
  getQuestionById() {
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'questionnaireOneInfo',
        data: {
          questionnaireid: this.data.questionnaireid,
        },
      }
    }).then(res => {
      console.log('questionnaireOneInfo result:', res);
      if (res.result.success) {
        this.setData({
          questionList: JSON.parse(res.result.data.questionConfig),
          questionnaireid: res.result.data.questionnaireid,
          schoolid: res.result.data.schoolid
        });
        console.log(this.data.questionList);
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
      console.error('questionnaireOneInfo error:', err);
    });
  },
  radioChange(e) {
    console.log(e);
    const _arr = this.data.questionList[e.currentTarget.dataset.index].answer;
    _arr.forEach((ele, idx) => {
      if (idx === parseFloat(e.detail.value) - 1) {
        ele.checked = true;
      } else {
        ele.checked = false;
      }
    });
    this.setData({
      [`questionList.[${e.currentTarget.dataset.index}].answer`]: _arr
    });
    console.log(this.data.questionList);
  },
  checkboxChange(e) {
    console.log(e);
    const _arr = this.data.questionList[e.currentTarget.dataset.index].answer;
    _arr.forEach((ele, idx) => {
      if (e.detail.value.indexOf((idx + 1).toString()) !== -1) {
        ele.checked = true;
      } else {
        ele.checked = false;
      }
    });
    this.setData({
      [`questionList.[${e.currentTarget.dataset.index}].answer`]: _arr
    });
    console.log(this.data.questionList);
  },
  textAreaInput(e) {
    console.log(e);
    this.setData({
      [`questionList.[${e.currentTarget.dataset.index}].value`]: e.detail.value
    });
    console.log(this.data.questionList);
  },
  submitQuestionnaire() {
    console.log(this.data.questionnaireid, this.data.schoolid, app.globalData.userInfo.yibenid, JSON.stringify(this.data.questionList));
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'answerSave',
        data: {
          questionnaireid: this.data.questionnaireid,
          schoolid: this.data.schoolid,
          yibenid: app.globalData.userInfo.yibenid,
          questionAnswer: JSON.stringify(this.data.questionList)
        },
      }
    }).then(res => {
      console.log('answerSave result:', res);
      if (res.result.success) {
        wx.showToast({
          title: '感谢您的支持',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        wx.navigateBack({
          delta: 1
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
      console.error('answerSave error:', err);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      questionnaireid: options.questionnaireid,
    });
    this.getQuestionById();
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
    wx.setNavigationBarTitle({
      title: '意见与反馈'
    });

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