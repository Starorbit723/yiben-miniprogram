// 查询单个角色配置信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.roleConfigid) {
    return {
      success: false,
      errMsg: '缺少必要参数：roleConfigid'
    };
  }

  const { roleConfigid } = params;

  try {
    // 获取角色配置表引用
    const roleConfigCollection = db.collection('role_config');
    
    // 根据 roleConfigid 查询角色配置信息
    const roleConfig = await roleConfigCollection.where({
      roleConfigid: roleConfigid
    }).get();

    if (roleConfig.data.length === 0) {
      return {
        success: false,
        errMsg: '角色配置不存在'
      };
    }
    
    return {
      success: true,
      data: roleConfig.data[0]
    };
  } catch (err) {
    console.error('查询角色配置信息失败:', err);
    return {
      success: false,
      errMsg: err.message || '查询角色配置信息失败'
    };
  }
}; 