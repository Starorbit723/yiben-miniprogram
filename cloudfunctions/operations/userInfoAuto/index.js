// 自动更新用户信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.yibenid) {
    return {
      success: false,
      errMsg: '缺少必要参数：yibenid'
    };
  }

  const { 
    openid, 
    yibenid,
    avatarUrl, 
    city, 
    country, 
    province, 
    gender, 
    language, 
    nickName 
  } = params;

  // 检查必要更新字段
  if (!avatarUrl && !city && !country && !province && !gender && !language && !nickName) {
    return {
      success: false,
      errMsg: '至少需要提供一个更新字段'
    };
  }

  // 构建更新对象
  const updateData = {};
  
  // 只添加有值的字段
  if (avatarUrl) updateData.avatarUrl = avatarUrl;
  if (city) updateData.city = city;
  if (country) updateData.country = country;
  if (province) updateData.province = province;
  if (gender !== undefined) updateData.gender = gender;
  if (language) updateData.language = language;
  if (nickName) updateData.nickName = nickName;
  

  try {
    // 获取用户表引用
    const userCollection = db.collection('user');
    
    // 查询用户是否存在
    const queryResult = await userCollection
      .where({
        yibenid: yibenid
      })
      .get();
    
    if (queryResult.data.length === 0) {
      return {
        success: false,
        errMsg: '用户不存在'
      };
    }
    
    // 确认openid匹配（如果提供了openid）
    if (openid && queryResult.data[0].openid !== openid) {
      return {
        success: false,
        errMsg: 'openid与yibenid不匹配'
      };
    }
    
    // 更新用户信息
    const updateResult = await userCollection
      .where({
        yibenid: yibenid
      })
      .update({
        data: updateData
      });
    
    if (updateResult.stats.updated > 0) {
      return {
        success: true,
        message: '用户信息更新成功',
        updated: updateResult.stats.updated
      };
    } else {
      return {
        success: false,
        errMsg: '用户信息更新失败',
        updated: 0
      };
    }
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 