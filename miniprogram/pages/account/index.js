// pages/account/index.js
const { validatePhoneNumber, validateUsername, validateAge } = require("../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      parentName: '',
      phoneNumber: '',
      children: [{
        studentName: '',
        age: ''
      }]
    },
  },
  parentNameInput(e) {
    console.log(e);
    this.setData({
      'form.parentName': e.detail.value
    });
  },
  phoneNumberInput(e) {
    this.setData({
      'form.phoneNumber': e.detail.value
    });
  },
  nameInput(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`form.children[${index}].studentName`]: e.detail.value
    });
  },
  ageInput(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`form.children[${index}].age`]: e.detail.value
    });
  },
  addChildren() {
    const len = this.data.form.children.length;
    if (len === 3) {
      wx.showToast({
        title: '最多只能添加3名子女',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      return;
    }
    console.log('1222233', this.data.form.children);
    if (!this.data.form.children[len - 1].studentName || !this.data.form.children[len - 1].age) {
      wx.showToast({
        title: '请您先完成上一个学生信息的填写',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      return;
    }
    console.log(this.data.form.children.length);
    const addIndex = this.data.form.children.length;
    this.setData({
      [`form.children[${addIndex}]`]: {
        studentName: '',
        age: ''
      }
    });
  },
  deleteChildren() {
    console.log(this.data.form.children);
    if (this.data.form.children.length >= 2) {
      const _list = this.data.form.children.slice(0, -1);
      this.setData({
        'form.children': _list
      });
    }
  },
  subimit() {
    console.log('form', this.data.form);
    if (!validateUsername(this.data.form.parentName)) {
      wx.showToast({
        title: '请确认家长姓名是否有误',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      return;
    }
    if (!validatePhoneNumber(this.data.form.phoneNumber)) {
      wx.showToast({
        title: '请确认手机号是否有误',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      return;
    }
    for(let i = 0; i < this.data.form.children.length; i++) {
      if (!this.data.form.children[i].studentName || !this.data.form.children[i].age) {
        wx.showToast({
          title: '您还有未填写的信息',
          icon: 'none',
          duration: 2000,
          mask: true
        });
        return;
      }
      if (!validateUsername(this.data.form.children[i].studentName)) {
        wx.showToast({
          title: '请确认学生姓名是否有误',
          icon: 'none',
          duration: 2000,
          mask: true
        });
        return;
      }
      if (!validateAge(this.data.form.children[i].age)) {
        wx.showToast({
          title: '请确认学生年龄是否有误',
          icon: 'none',
          duration: 2000,
          mask: true
        });
        return;
      }
    }
    console.log('开始提交');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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