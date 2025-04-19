// 用户登录处理
const cloud = require('wx-server-sdk');

// cloud.init({
//   env: cloud.DYNAMIC_CURRENT_ENV
// });

// 生成随机的yibenid
function generateYibenId() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'yb_';
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

exports.main = async (params, db) => {
  try {
    // 获取用户的openid和unionid
    const wxContext = cloud.getWXContext();
    const { OPENID, UNIONID } = wxContext;
    
    if (!OPENID) {
      return {
        success: false,
        errMsg: '获取用户openid失败'
      };
    }
    
    // 获取用户表引用
    const userCollection = db.collection('user');
    
    // 查询用户是否已存在
    const queryResult = await userCollection
      .where({
        openid: OPENID
      })
      .get();
    
    if (queryResult.data.length > 0) {
      // 用户已存在，直接返回用户信息
      return {
        success: true,
        data: queryResult.data[0]
      };
    } else {
      // 用户不存在，创建新用户
      // 生成yibenid并检查是否重复
      let yibenid = generateYibenId();
      let isUnique = false;
      let attempts = 0;
      const maxAttempts = 3;
      
      while (!isUnique && attempts < maxAttempts) {
        // 查询是否已存在相同的yibenid
        const idCheckResult = await userCollection
          .where({
            yibenid: yibenid
          })
          .count();
        
        if (idCheckResult.total === 0) {
          // yibenid不重复，可以使用
          isUnique = true;
        } else {
          // yibenid重复，重新生成
          yibenid = generateYibenId();
          attempts++;
        }
      }
      
      // 如果尝试3次后仍然有重复，返回失败
      if (!isUnique) {
        return {
          success: false,
          errMsg: '无法生成唯一的用户ID，请重试'
        };
      }
      
      const newUser = {
        yibenid,
        openid: OPENID,
        unionid: UNIONID || '',
        children: [],
        point: 0,
        userType: 0  // 默认为客户
      };
      
      const addResult = await userCollection.add({
        data: newUser
      });
      
      // 添加_id字段
      newUser._id = addResult._id;
      
      return {
        success: true,
        data: newUser,
        message: '新用户创建成功'
      };
    }
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 