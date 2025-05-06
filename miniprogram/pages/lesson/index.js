// pages/textBook/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleColorStep: ['rgb(50, 151, 253)', 'rgb(8, 190, 166)', 'rgb(233, 120, 15)', 'rgb(160, 23, 240)', 'rgb(23, 240, 77)'],
    timetable:[
      {
        title: "星期六",
        isWorkDay: 1,
        teachers: [{
          name:"Tracy",
          schedule:[
            {
              endTime:"10:00",
              heightRate:120,
              lesson:"XXXXXXXXXXXXXXXXX",
              posTop:0,
              room:"第5教室",
              startTime:"08:00"
            },
            {
              endTime: "12:00",
              heightRate: 60,
              lesson: "123123123213213123312313",
              posTop: 180,
              room: "第2教室",
              startTime: "11:00"
            },
            {
              endTime:"15:40",
              heightRate:160,
              lesson:"231312312312312321123123",
              posTop:300,
              room:"第5教室",
              startTime:"13:00"
            }
          ]
        },{
          name:"Tracy1",
          schedule:[
            {
              endTime:"10:00",
              heightRate:120,
              lesson:"XXXXXXXXXXXXXXXXX",
              posTop:0,
              room:"第5教室",
              startTime:"08:00"
            }
          ]
        },{
          name:"Tracy2",
          schedule:[
            {
              endTime:"10:00",
              heightRate:120,
              lesson:"XXXXXXXXXXXXXXXXX",
              posTop:0,
              room:"第5教室",
              startTime:"08:00"
            }
          ]
        }],
      },{"isWorkDay":1,"teachers":[],"title":"星期日"},
      {"isWorkDay":2,"teachers":[],"title":"星期一"},
      {"isWorkDay":1,"teachers":[],"title":"星期二"},
      {"isWorkDay":1,"teachers":[],"title":"星期三"},
      {"isWorkDay":1,"teachers":[],"title":"星期四"},
      {"isWorkDay":1,"teachers":[],"title":"星期五"}
    ]
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