// 问卷管理分页查询
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
  const condition = params.condition || {};
  const { schoolid, questionnaireid, title, desc } = condition;

  // 计算分页偏移量
  const skip = (pageNo - 1) * pageSize;

  try {
    // 获取问卷表引用
    const questionnaireCollection = db.collection('questionnaire');
    
    // 构建查询条件
    let whereCondition = {};
    
    if (schoolid) {
      whereCondition.schoolid = schoolid;
    }
    
    if (questionnaireid) {
      // 精确匹配 questionnaireid
      whereCondition.questionnaireid = questionnaireid;
    }
    
    if (title) {
      // 模糊匹配 title
      whereCondition.title = db.RegExp({
        regexp: title,
        options: 'i' // i 表示不区分大小写
      });
    }
    if (desc) {
      // 模糊匹配 desc
      whereCondition.desc = db.RegExp({
        regexp: desc,
        options: 'i' // i 表示不区分大小写
      });
    }
    
    // 查询总记录数
    const countResult = await questionnaireCollection
      .where(whereCondition)
      .count();
    
    // 分页查询问卷数据，并按 createTime 降序排列
    const questionnairesResult = await questionnaireCollection
      .where(whereCondition)
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(pageSize)
      .get();
    
    return {
      success: true,
      data: {
        list: questionnairesResult.data,
        total: countResult.total,
        pageNo: pageNo,
        pageSize: pageSize,
        totalPage: Math.ceil(countResult.total / pageSize)
      }
    };
    
  } catch (err) {
    console.error('分页查询问卷信息失败:', err);
    return {
      success: false,
      errMsg: err.message || '分页查询问卷信息失败'
    };
  }
}; 