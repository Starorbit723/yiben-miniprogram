// 保存问卷信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params) {
    return {
      success: false,
      errMsg: '缺少参数'
    };
  }

  const { questionnaireid, schoolid, questionConfig, desc, title } = params;

  // 检查必要参数
  if (!schoolid || !questionConfig || !title) {
    return {
      success: false,
      errMsg: '缺少必要参数：schoolid, questionConfig, title'
    };
  }

  // 自动生成当前时间戳
  const createTime = Date.now();

  // 构建存储对象
  const questionnaireData = {
    schoolid,
    questionConfig,
    createTime,
    desc: desc || '',
    title
  };

  try {
    // 获取问卷表引用
    const questionnaireCollection = db.collection('questionnaire');
    
    if (questionnaireid) {
      // 检查是否存在该问卷
      const existingQuestionnaire = await questionnaireCollection.where({
        questionnaireid: questionnaireid
      }).get();

      if (existingQuestionnaire.data.length > 0) {
        // 更新现有问卷，创建时间采用existingQuestionnaire.data[0].createTime
        questionnaireData.createTime = existingQuestionnaire.data[0].createTime;
        await questionnaireCollection.where({
          questionnaireid: questionnaireid
        }).update({
          data: questionnaireData
        });
        
        return {
          success: true,
          message: '问卷信息更新成功',
          questionnaireid: questionnaireid
        };
      } else { // 不存在该问卷, 返回错误
        return {
          success: false,
          errMsg: '问卷不存在'
        };
      }
    }

    // 生成新的questionnaireid
    const newQuestionnaireId = generateId();
    questionnaireData.questionnaireid = newQuestionnaireId;

    // 保存新问卷
    await questionnaireCollection.add({
      data: questionnaireData
    });
    
    return {
      success: true,
      message: '问卷信息保存成功',
      questionnaireid: newQuestionnaireId
    };
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
};

// 生成随机的16位bookid
function generateId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}