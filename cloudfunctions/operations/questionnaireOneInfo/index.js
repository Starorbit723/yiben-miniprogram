// 查询单个问卷信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.questionnaireid) {
    return {
      success: false,
      errMsg: '缺少必要参数：questionnaireid'
    };
  }

  const { questionnaireid } = params;

  try {
    // 获取问卷表引用
    const questionnaireCollection = db.collection('questionnaire');
    
    // 根据 questionnaireid 查询问卷信息
    const questionnaire = await questionnaireCollection.where({
      questionnaireid: questionnaireid
    }).get();

    if (questionnaire.data.length === 0) {
      return {
        success: false,
        errMsg: '问卷不存在'
      };
    }
    
    return {
      success: true,
      data: questionnaire.data[0]
    };
  } catch (err) {
    console.error('查询问卷信息失败:', err);
    return {
      success: false,
      errMsg: err.message || '查询问卷信息失败'
    };
  }
}; 