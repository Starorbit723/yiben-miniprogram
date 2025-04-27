// 查询所有校区信息
exports.main = async (params, db) => {
  try {
    // 获取校区表引用
    const schoolCollection = db.collection('school');
    
    // 查询所有校区信息
    const schoolResult = await schoolCollection
      .orderBy('createTime', 'desc') // 按创建时间降序排列，如果没有createTime可以替换为其他字段
      .get();
    
    return {
      success: true,
      data: schoolResult.data
    };
    
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 