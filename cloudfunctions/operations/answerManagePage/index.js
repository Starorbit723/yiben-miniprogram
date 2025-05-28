// 答案管理分页查询
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
  // Potential filter fields for answers: schoolid, yibenid, answerid, questionnaireid
  const condition = params.condition || {};
  const { schoolid, yibenid, answerid, questionnaireid } = condition;

  // 计算分页偏移量
  const skip = (pageNo - 1) * pageSize;

  try {
    // 获取答案表引用
    const answerCollection = db.collection('answer');
    
    // 构建查询条件
    let whereCondition = {};
    
    if (schoolid) {
      whereCondition.schoolid = schoolid;
    }
    
    if (yibenid) {
      whereCondition.yibenid = yibenid;
    }

    if (answerid) {
      whereCondition.answerid = answerid;
    }

    if (questionnaireid) {
      whereCondition.questionnaireid = questionnaireid;
    }
    
    // 查询总记录数
    const countResult = await answerCollection
      .where(whereCondition)
      .count();
    
    // 分页查询答案数据，并按 createTime 降序排列
    // Exclude questionAnswer field
    const answersResult = await answerCollection
      .where(whereCondition)
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(pageSize)
      .field({ questionAnswer: false }) // Exclude questionAnswer
      .get();
    
    return {
      success: true,
      data: {
        list: answersResult.data,
        total: countResult.total,
        pageNo: pageNo,
        pageSize: pageSize,
        totalPage: Math.ceil(countResult.total / pageSize)
      }
    };
    
  } catch (err) {
    console.error('分页查询答案信息失败:', err);
    return {
      success: false,
      errMsg: err.message || '分页查询答案信息失败'
    };
  }
}; 