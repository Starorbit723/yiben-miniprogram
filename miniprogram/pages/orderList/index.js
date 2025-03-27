// pages/userCenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{
      orderNo: 'YBYY1234567890',
      orderType: '预约试听(单人)',
      teacher: 'Mike',
      time: '2025-3-19 14:00~16:00',
      classroom: '第5教室',
      status: 0,
      orderMainPeople: '张先生',
      phone: '13312345678',
      school: '广安门校区',
      orderTime: '2025-03-16 15:23:46',
      strench: false,
    }, {
      orderNo: 'YBYY1234567890',
      orderType: '预约试听(单人)',
      teacher: 'Mike',
      time: '2025-3-19 14:00~16:00',
      classroom: '第5教室',
      status: 1,
      orderMainPeople: '张先生',
      phone: '13312345678',
      school: '广安门校区',
      orderTime: '2025-03-16 15:23:46',
      strench: false,
      childList: [
        {
          name: '小明妈妈',
          childName: '王小明',
          phone: '13312345678'
        },
        {
          name: '小红爸爸',
          childName: '李小红',
          phone: '13312345678'
        },
        {
          name: '小刚妈妈',
          childName: '赵小刚',
          phone: '13312345678'
        }
      ]
    }],
  },
  openDetail(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      [`orderList[${e.currentTarget.dataset.index}].strench`]: true
    });
  },
  closeDetail(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      [`orderList[${e.currentTarget.dataset.index}].strench`]: false
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