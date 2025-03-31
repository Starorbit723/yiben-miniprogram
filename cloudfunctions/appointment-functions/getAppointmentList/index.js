// 获取预约列表
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (data, context) => {
  try {
    const { openid, status } = data
    
    // 如果未传入openid，则使用当前用户的openid
    const userOpenId = openid || cloud.getWXContext().OPENID
    
    let query = db.collection('appointments').where({
      openid: userOpenId
    })

    if (status) {
      query = query.where({
        status: status
      })
    }

    const result = await query.orderBy('createTime', 'desc').get()

    return {
      success: true,
      data: result.data
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
} 