// 根据yibenid修改用户信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.yibenid) {
    return {
      success: false,
      errMsg: '缺少必要参数：yibenid'
    };
  }

  const { 
    yibenid,
    parentName,
    phoneNumber,
    children,
    point,
    city,
    country,
    province,
    gender,
    language,
    age,
    userType
  } = params;

  // 检查是否有任何要更新的字段
  const hasUpdates = parentName !== undefined ||
    phoneNumber !== undefined ||
    (children && children.length > 0) ||
    point !== undefined ||
    city !== undefined ||
    country !== undefined ||
    province !== undefined ||
    gender !== undefined ||
    language !== undefined ||
    age !== undefined ||
    userType !== undefined;

  if (!hasUpdates) {
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
      
      // 只有当年龄字段存在时才校验其类型
      if (child.age !== undefined && isNaN(Number(child.age))) {
        return {
          success: false,
          errMsg: '学员年龄必须是数字'
        };
      }
      
      // 只有当性别字段存在时才校验其取值范围
      if (child.gender !== undefined && ![0, 1, 2].includes(Number(child.gender))) {
        return {
          success: false,
          errMsg: '学员性别值无效，应为 0, 1 或 2'
        };
      }
    }
  }

  // 验证userType
  if (userType !== undefined && ![1, 2].includes(Number(userType))) {
    return {
      success: false,
      errMsg: 'userType值无效，应为 1(客户) 或 2(员工)'
    };
  }

  // 验证性别
  if (gender !== undefined && ![0, 1, 2].includes(Number(gender))) {
    return {
      success: false,
      errMsg: '性别值无效，应为 0, 1 或 2'
    };
  }

  // 验证年龄
  if (age !== undefined && isNaN(Number(age))) {
    return {
      success: false,
      errMsg: '年龄必须是数字'
    };
  }

  // 验证积分
  if (point !== undefined && isNaN(Number(point))) {
    return {
      success: false,
      errMsg: '积分必须是数字'
    };
  }

  // 构建更新对象 - 排除不允许修改的字段 (openid, unionid, nickName, avatarUrl)
  const updateData = {};
  
  // 只添加有值的字段
  if (parentName !== undefined) updateData.parentName = parentName;
  if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
  if (children && children.length > 0) updateData.children = children;
  if (point !== undefined) updateData.point = Number(point);
  if (city !== undefined) updateData.city = city;
  if (country !== undefined) updateData.country = country;
  if (province !== undefined) updateData.province = province;
  if (gender !== undefined) updateData.gender = Number(gender);
  if (language !== undefined) updateData.language = language;
  if (age !== undefined) updateData.age = Number(age);
  if (userType !== undefined) updateData.userType = userType;

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
    
    // 更新用户信息
    const updateResult = await userCollection
      .where({
        yibenid: yibenid
      })
      .update({
        data: updateData
      });
  
    return {
      success: true,
      message: '用户信息更新成功',
      updated: updateResult.stats.updated
    };

  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 