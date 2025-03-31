// 创建预约
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (data, context) => {
  try {
    const { openid, courseId, courseName, appointmentTime, studentName, phoneNumber } = data
    
    // 如果未传入openid，则使用当前用户的openid
    const userOpenId = openid || cloud.getWXContext().OPENID
    
    const result = await db.collection('appointments').add({
      data: {
        openid: userOpenId,
        courseId,
        courseName,
        appointmentTime,
        studentName,
        phoneNumber,
        status: 'pending', // pending, confirmed, completed, cancelled
        createTime: db.serverDate(),
        updateTime: db.serverDate()
      }
    })

    return {
      success: true,
      data: result
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
} 