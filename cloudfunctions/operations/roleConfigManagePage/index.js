// 角色配置管理分页查询
exports.main = async (params, db) => {
  // 参数校验
  if (!params) {
    return {
      success: false,
      errMsg: '缺少参数'
    };
  }

  // 提取分页参数和查询条件
  const pageNo = params.pageNo || 1;
  const pageSize = params.pageSize || 10;
  const { yibenid, name, phoneNumber } = params; // Added role to filter fields

  // 计算分页偏移量
  const skip = (pageNo - 1) * pageSize;

  try {
    // 获取角色配置表引用
    const roleConfigCollection = db.collection('role_config');
    
    // 构建查询条件
    let whereCondition = {};
    
    if (yibenid) {
      whereCondition.yibenid = yibenid; // Exact match for yibenid
    }
    
    if (name) {
      // 模糊匹配 name
      whereCondition.name = db.RegExp({
        regexp: name,
        options: 'i' // i 表示不区分大小写
      });
    }
    if (phoneNumber) {
      // 精确匹配 phoneNumber
      whereCondition.phoneNumber = phoneNumber;
    }
    
    // 查询总记录数
    const countResult = await roleConfigCollection
      .where(whereCondition)
      .count();
    
    // 分页查询角色配置数据，并按 updateTime 降序排列
    const roleConfigsResult = await roleConfigCollection
      .where(whereCondition)
      .orderBy('updateTime', 'desc') // Order by updateTime
      .skip(skip)
      .limit(pageSize)
      .get();
    
    return {
      success: true,
      data: {
        list: roleConfigsResult.data,
        total: countResult.total,
        pageNo: pageNo,
        pageSize: pageSize,
        totalPage: Math.ceil(countResult.total / pageSize)
      }
    };
    
  } catch (err) {
    console.error('分页查询角色配置信息失败:', err);
    return {
      success: false,
      errMsg: err.message || '分页查询角色配置信息失败'
    };
  }
}; 