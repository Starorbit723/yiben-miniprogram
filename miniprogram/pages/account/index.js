// pages/account/index.js
const app = getApp();
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
        name: '',
        age: '',
        gender: 1
      }]
    },
    genderOptions: [
      {id: 1 , name: '男'},
      {id: 2 , name: '女'}
    ],
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
      [`form.children[${index}].name`]: e.detail.value
    });
  },
  ageInput(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`form.children[${index}].age`]: e.detail.value
    });
  },
  bindPickerChange(e) {
    const index = e.currentTarget.dataset.index;
    console.log('picker发送选择改变，携带值为', e.detail.value, 'index', index)
    this.setData({
      [`form.children[${index}].gender`]: parseFloat(e.detail.value) + 1
    });
    console.log(this.data.form.children);
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
    if (len === 0) {
      this.setData({
        [`form.children[0]`]: {
          name: '',
          age: '',
          gender: 1
        }
      });
      return;
    }
    if (!this.data.form.children[len - 1].name || !this.data.form.children[len - 1].age) {
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
        name: '',
        age: '',
        gender: 1
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
      if (!this.data.form.children[i].name || !this.data.form.children[i].age) {
        wx.showToast({
          title: '您还有未填写的信息',
          icon: 'none',
          duration: 2000,
          mask: true
        });
        return;
      }
      if (!validateUsername(this.data.form.children[i].name)) {
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
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'userInfoMan',
        data: {
          yibenid: app.globalData.userInfo.yibenid,
          ...this.data.form
        }
      }
    }).then(res => {
      console.log('userInfoMan result:', res);
      if (res.result.success === true) {
        app.globalData.userInfo.parentName = this.data.form.parentName;
        app.globalData.userInfo.phoneNumber = this.data.form.phoneNumber;
        app.globalData.userInfo.children = this.data.form.children;
        setTimeout(() => {
          console.log(app.globalData);
        }, 300);
        if (this.data.canGoBack === '0') {
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else {
          wx.navigateBack({
            delta: 1
          });
        }
      }
    }).catch(err => {
      console.error('wxId error:', err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '账号管理'
    });
    console.log('userInfo', app.globalData.userInfo);
    this.setData({
      'form.parentName': app.globalData.userInfo.parentName || '',
      'form.phoneNumber': app.globalData.userInfo.phoneNumber || '',
      'form.children': app.globalData.userInfo.children|| [],
    });
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
    if (!app.globalData.userInfo.yibenid || !app.globalData.userInfo.yibenid) {
      wx.navigateBack({
        delta: 1
      });
    }
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