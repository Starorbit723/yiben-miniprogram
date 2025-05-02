// 预约管理分页查询
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
    // 获取预约表引用
    const bookCollection = db.collection('book_record');
    const groupInfoCollection = db.collection('group_info');
    
    // 构建查询条件
    let whereCondition = {};
    
    // 添加有值的查询条件（按AND逻辑组合）
    if (condition.bookid) {
      whereCondition.bookid = db.RegExp({
        regexp: condition.bookid,
        options: 'i'
      });
    }
    
    if (condition.ownerName) {
      whereCondition.ownerName = db.RegExp({
        regexp: condition.ownerName,
        options: 'i'
      });
    }
    
    if (condition.ownerPhone) {
      whereCondition.ownerPhone = db.RegExp({
        regexp: condition.ownerPhone,
        options: 'i'
      });
    }
    
    if (condition.bookType !== undefined) {
      whereCondition.bookType = condition.bookType;
    }
    
    if (condition.schoolid) {
      whereCondition.schoolid = condition.schoolid;
    }
    
    // 处理时间范围查询
    if (condition.bookTimeRanger && Array.isArray(condition.bookTimeRanger) && condition.bookTimeRanger.length === 2) {
      const [startTime, endTime] = condition.bookTimeRanger;
      whereCondition.createTime = db.command.and([
        db.command.gte(startTime),
        db.command.lte(endTime)
      ]);
    }
    
    // 查询总记录数
    const countResult = await bookCollection
      .where(whereCondition)
      .count();
    
    // 分页查询预约数据
    const booksResult = await bookCollection
      .where(whereCondition)
      .skip(skip)
      .limit(pageSize)
      .orderBy('createTime', 'desc') // 按创建时间降序排列
      .get();
    
    // 获取所有预约记录的bookid
    const bookIds = booksResult.data.map(book => book.bookid);
    
    // 批量查询拼团信息
    let groupInfoResult = { data: [] };
    if (bookIds.length > 0) {
      groupInfoResult = await groupInfoCollection
        .where({
          bookid: db.command.in(bookIds)
        })
        .get();
    }
    
    // 将拼团信息按bookid分组
    const groupInfoMap = {};
    groupInfoResult.data.forEach(group => {
      if (!groupInfoMap[group.bookid]) {
        groupInfoMap[group.bookid] = [];
      }
      groupInfoMap[group.bookid].push(group);
    });
    
    // 将拼团信息添加到对应的预约记录中
    const booksWithGroups = booksResult.data.map(book => {
      book.groupInfoList = groupInfoMap[book.bookid] || [];
      return book;
    });
    
    return {
      success: true,
      data: {
        list: booksWithGroups,
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