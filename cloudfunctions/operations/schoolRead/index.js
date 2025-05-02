// 读取校区信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || params.schoolid === undefined) {
    return {
      success: false,
      errMsg: '缺少必要参数：schoolid'
    };
  }

  // 确保 schoolid 为整数类型
  const schoolidInt = parseInt(params.schoolid, 10);
  if (isNaN(schoolidInt)) {
    return {
      success: false,
      errMsg: 'schoolid 必须是有效的整数'
    };
  }

  // 获取数据库引用
  const schoolCollection = db.collection('school');
  try {
    // 根据 schoolid 查询记录
    const result = await schoolCollection
      .where({
        schoolid: schoolidInt
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