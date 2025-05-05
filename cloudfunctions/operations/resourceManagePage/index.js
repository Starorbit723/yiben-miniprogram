// 资源管理分页查询
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
    // 获取资源表引用
    const resourceCollection = db.collection('resource');
    
    // 构建查询条件
    let whereCondition = {};
    
    // 添加有值的查询条件（按AND逻辑组合）
    if (condition.name) {
      whereCondition.name = db.RegExp({
        regexp: condition.name,
        options: 'i'
      });
    }
    
    if (condition.url) {
      whereCondition.url = db.RegExp({
        regexp: condition.url,
        options: 'i'
      });
    }
    
    if (condition.fileId) {
      whereCondition.fileId = db.RegExp({
        regexp: condition.fileId,
        options: 'i'
      });
    }
    
    if (condition.type !== undefined && [1, 2].includes(Number(condition.type))) {
      whereCondition.type = Number(condition.type);
    }
    
    // 处理时间范围查询
    if (condition.uploadTimeRanger && Array.isArray(condition.uploadTimeRanger) && condition.uploadTimeRanger.length === 2) {
      const [startTime, endTime] = condition.uploadTimeRanger;
      whereCondition.createTime = db.command.and([
        db.command.gte(startTime),
        db.command.lte(endTime)
      ]);
    }
    
    // 查询总记录数
    const countResult = await resourceCollection
      .where(whereCondition)
      .count();
    
    // 分页查询资源数据
    const resourcesResult = await resourceCollection
      .where(whereCondition)
      .skip(skip)
      .limit(pageSize)
      .orderBy('createTime', 'desc') // 按创建时间降序排列
      .get();
    
    return {
      success: true,
      data: {
        list: resourcesResult.data,
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