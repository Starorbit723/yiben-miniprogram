// 查询单个答案信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.answerid) {
    return {
      success: false,
      errMsg: '缺少必要参数：answerid'
    };
  }

  const { answerid } = params;

  try {
    // 获取答案表引用
    const answerCollection = db.collection('answer');
    
    // 根据 answerid 查询答案信息
    const answer = await answerCollection.where({
      answerid: answerid
    }).get();

    if (answer.data.length === 0) {
      return {
        success: false,
        errMsg: '答案不存在'
      };
    }
    
    return {
      success: true,
      data: answer.data[0]
    };
  } catch (err) {
    console.error('查询答案信息失败:', err);
    return {
      success: false,
      errMsg: err.message || '查询答案信息失败'
    };
  }
}; 