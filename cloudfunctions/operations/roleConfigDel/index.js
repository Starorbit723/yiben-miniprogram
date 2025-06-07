// 删除角色配置信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params) {
    return {
      success: false,
      errMsg: '缺少参数'
    };
  }

  const { roleConfigidList } = params;

  // 检查必要参数
  if (!roleConfigidList || !Array.isArray(roleConfigidList) || roleConfigidList.length === 0) {
    return {
      success: false,
      errMsg: '缺少必要参数或格式不正确：roleConfigidList (must be a non-empty array)'
    };
  }

  try {
    // 获取角色配置表引用
    const roleConfigCollection = db.collection('role_config');
    
    // 批量删除操作
    const deletePromises = roleConfigidList.map(roleConfigid => {
      return roleConfigCollection.where({
        roleConfigid: roleConfigid
      }).remove();
    });

    // 执行所有删除操作
    const deleteResults = await Promise.all(deletePromises);
    
    // 计算删除的总数
    let totalDeleted = 0;
    const failedDeletes = [];
    
    deleteResults.forEach((result, index) => {
      if (result.stats && result.stats.removed > 0) {
        totalDeleted += result.stats.removed;
      } else {
        failedDeletes.push(roleConfigidList[index]);
      }
    });
    
    if (failedDeletes.length > 0) {
      return {
        success: false,
        errMsg: `部分角色配置删除失败，未找到的ID: ${failedDeletes.join(', ')}`,
        deletedCount: totalDeleted,
        failedIds: failedDeletes
      };
    }
    
    return {
      success: true,
      message: `成功删除 ${totalDeleted} 个角色配置`,
      deletedCount: totalDeleted
    };
  } catch (err) {
    console.error('删除角色配置信息失败:', err);
    return {
      success: false,
      errMsg: err.message || '删除角色配置信息失败'
    };
  }
}; 