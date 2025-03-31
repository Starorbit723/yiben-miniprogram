// 更新预约状态
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (data, context) => {
  try {
    const { appointmentId, status } = data
    
    const result = await db.collection('appointments').doc(appointmentId).update({
      data: {
        status: status,
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