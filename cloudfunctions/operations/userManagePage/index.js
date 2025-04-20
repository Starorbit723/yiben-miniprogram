// 用户管理分页查询
exports.main = async (params, db) => {
  // 参数校验
  if (!params) {
    return {
      success: false,
      errMsg: '缺少参数'
    };
  }

  // 提取分页参数
  const pageNo = params.pageNo || 1;
  const pageSize = params.pageSize || 10;
  const condition = params.condition || {};

  // 计算分页偏移量
  const skip = (pageNo - 1) * pageSize;

  try {
    // 获取用户表引用
    const userCollection = db.collection('user');
    
    // 构建查询条件
    let whereCondition = {};
    
    // 添加有值的查询条件（按AND逻辑组合）
    if (condition.yibenid) {
      whereCondition.yibenid = db.RegExp({
        regexp: condition.yibenid,
        options: 'i'
      });
    }
    
    if (condition.nickName) {
      whereCondition.nickName = db.RegExp({
        regexp: condition.nickName,
        options: 'i'
      });
    }
    
    if (condition.phoneNumber) {
      whereCondition.phoneNumber = db.RegExp({
        regexp: condition.phoneNumber,
        options: 'i'
      });
    }
    
    if (condition.userType !== undefined) {
      whereCondition.userType = condition.userType;
    }
    
    // 查询总记录数
    const countResult = await userCollection
      .where(whereCondition)
      .count();
    
    // 分页查询用户数据
    const usersResult = await userCollection
      .where(whereCondition)
      .skip(skip)
      .limit(pageSize)
      .orderBy('createTime', 'desc') // 按创建时间降序排列
      .get();
    
    return {
      success: true,
      data: {
        list: usersResult.data,
        total: countResult.total,
        pageNo: pageNo,
        pageSize: pageSize,
        totalPage: Math.ceil(countResult.total / pageSize)
      }
    };
    
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 