// 手动更新用户信息
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
    parentName,
    phoneNumber,
    children
  } = params;

  // 检查必要更新字段
  if (!parentName && !phoneNumber && (!children || !children.length)) {
    return {
      success: false,
      errMsg: '至少需要提供一个更新字段'
    };
  }

  // 验证children数组格式
  if (children && children.length > 0) {
    for (const child of children) {
      if (!child.name) {
        return {
          success: false,
          errMsg: '学员信息缺少必要字段：name'
        };
      }
      
      // 年龄必须是数字类型
      if (child.age !== undefined && isNaN(Number(child.age))) {
        return {
          success: false,
          errMsg: '学员年龄必须是数字'
        };
      }
      
      // 性别必须是有效值
      if (child.gender !== undefined && ![0, 1, 2].includes(Number(child.gender))) {
        return {
          success: false,
          errMsg: '学员性别值无效，应为 0, 1 或 2'
        };
      }
    }
  }

  // 构建更新对象
  const updateData = {};
  
  // 只添加有值的字段
  if (parentName) updateData.parentName = parentName;
  if (phoneNumber) updateData.phoneNumber = phoneNumber;
  if (children && children.length > 0) updateData.children = children;

  try {
    // 获取用户表引用
    const userCollection = db.collection('user');
    
    // 查询用户是否存在 - 仅使用yibenid查询
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
    
    // 更新用户信息 - 仅使用yibenid条件
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