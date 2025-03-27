// pages/account/index.js
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
  addChildren() {
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
    const _list = this.data.form.children.slice(0, -1);
    this.setData({
      'form.children': _list
    });
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