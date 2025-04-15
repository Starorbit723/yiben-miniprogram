// 读取校区信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.schoolid) {
    return {
      success: false,
      errMsg: '缺少必要参数：schoolid'
    };
  }
  // 获取数据库引用
  const schoolCollection = db.collection('school');
  try {
    // 根据 schoolid 查询记录
    const result = await schoolCollection
      .where({
        schoolid: params.schoolid
      })
      .get();

    return {
      success: true,
      data: result.data
    };
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
};