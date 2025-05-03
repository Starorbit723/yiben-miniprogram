// 删除资源信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.fileIds || !Array.isArray(params.fileIds)) {
    return {
      success: false,
      errMsg: '缺少必要参数：fileIds数组'
    };
  }

  const { fileIds } = params;

  // 检查数组是否为空
  if (fileIds.length === 0) {
    return {
      success: false,
      errMsg: 'fileIds数组不能为空'
    };
  }

  // 检查数组长度是否超过50
  if (fileIds.length > 50) {
    return {
      success: false,
      errMsg: 'fileIds数组长度不能超过50'
    };
  }

  try {
    // 获取资源表引用
    const resourceCollection = db.collection('resource');
    
    // 批量删除资源
    const deleteResult = await resourceCollection
      .where({
        fileId: db.command.in(fileIds)
      })
      .remove();
    
    return {
      success: true,
      message: '资源删除成功',
      deleted: deleteResult.stats.removed
    };
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 