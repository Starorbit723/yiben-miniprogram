// pages/testPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  testFuction1() {
    wx.cloud.callFunction({
      name: 'utils',
      data: {
        type: 'wxId'
      }
    }).then(res => {
      console.log('wxId result:', res)
    }).catch(err => {
      console.error('wxId error:', err)
    })
  },
  testFuction2() {
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'schoolRead',
        data: {
          schoolid: 1,
        }
      }
    }).then(res => {
      console.log('schoolRead result:', res)
    }).catch(err => {
      console.error('schoolRead error:', err)
    })
    console.log('testFuction2 start');
  },
  testFuction3() {
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'schoolSave',
        data: {
          schoolid: 100,
          detail: {
            area:"1000",
            code:"123",
            address:"haidian",
            name:"海淀校区",
            phone:"12345678901",
            email:"12345678901@163.com",
            website:"www.baidu.com",
            logo:"https://www.baidu.com/logo.png",
            description:"海淀校区"
          }
        }
      }
    }).then(res => {
      console.log('schoolSave result:', res)
    }).catch(err => {
      console.error('schoolSave error:', err)
    })
    console.log('testFuction3 start');
  },
  testFuction4() {
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'userManagePage',
        data: {
          pageNo: 1,
          pageSize: 2,
          condition: {
          }
        }
      }
    }).then(res => {
      console.log('userManagePage result:', res)
    }).catch(err => {
      console.error('userManagePage error:', err)
    })
    console.log('userManagePage start');
  },
  testFuction5() {
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'userOneInfo',
        data: {
          yibenid: 'yb_z2Zsnac',
          }
      }
    }).then(res => {
      console.log('userOneInfo result:', res)
    }).catch(err => {
      console.error('userOneInfo error:', err)
    })
    console.log('userOneInfo start');
  },
  testFuction6() {
    wx.cloud.callFunction({
      name: 'operations',
      data: {
        type: 'answerSave',
        data: {
          "answerid": "123",
          "schoolid": "1",
          "yibenid": "123",
          "questionAnswer": "123",
          "questionaireid": "123"
        }
      }
    }).then(res => {
      console.log('answerSave result:', res)
    }).catch(err => {
      console.error('answerSave error:', err)
    })
    console.log('answerSave start');
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