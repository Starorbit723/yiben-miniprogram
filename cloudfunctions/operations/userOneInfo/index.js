// 根据yibenid查询用户详细信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.yibenid) {
    return {
      success: false,
      errMsg: '缺少必要参数：yibenid'
    };
  }

  const { yibenid } = params;

  try {
    // 获取用户表引用
    const userCollection = db.collection('user');
    
    // 查询用户信息
    const userResult = await userCollection
      .where({
        yibenid: yibenid
      })
      .get();
    
    if (userResult.data.length === 0) {
      return {
        success: false,
        errMsg: '用户不存在'
      };
    }
    
    return {
      success: true,
      data: userResult.data[0]
    };
    
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 