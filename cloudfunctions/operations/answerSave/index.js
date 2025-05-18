// 保存答案信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params) {
    return {
      success: false,
      errMsg: '缺少参数'
    };
  }

  // Fields for answer: answerid, schoolid, yibenid, questionAnswer (json), createTime (datetime), questionaireid
  const { answerid, schoolid, yibenid, questionAnswer, questionaireid } = params;

  // 检查必要参数
  if (schoolid === undefined || schoolid === null || !yibenid || !questionAnswer || !questionaireid) {
    return {
      success: false,
      errMsg: '缺少必要参数：schoolid, yibenid, questionAnswer, questionaireid'
    };
  }

  // 自动生成当前时间戳 for createTime
  const createTime = Date.now();

  // 构建存储对象
  const answerData = {
    schoolid,
    yibenid,
    questionAnswer,
    questionaireid,
    createTime
  };

  try {
    // 获取答案表引用
    const answerCollection = db.collection('answer');
    
    if (answerid) {
      // 检查是否存在该答案 (for updating)
      const existingAnswer = await answerCollection.where({
        answerid: answerid
      }).get();

      if (existingAnswer.data.length > 0) {
        // 更新现有答案，保留原始创建时间
        answerData.createTime = existingAnswer.data[0].createTime;
        // The user has specified that only questionAnswer should be updated.
        // schoolid from the original record will be maintained.
        const updateData = {
            questionAnswer: answerData.questionAnswer,
        };

        await answerCollection.where({
          answerid: answerid
        }).update({
          data: updateData // only update questionAnswer
        });
        
        return {
          success: true,
          message: '答案信息更新成功',
          answerid: answerid
        };
      } else { // 不存在该答案, 返回错误 (or treat as new if desired, but README implies answerid is for existing)
        return {
          success: false,
          errMsg: '答案不存在，无法更新'
        };
      }
    }

    // 生成新的answerid
    const newAnswerId = generateId(); // Reusing the generateId function from questionnaireSave
    answerData.answerid = newAnswerId;

    // 保存新答案
    await answerCollection.add({
      data: answerData
    });
    
    return {
      success: true,
      message: '答案信息保存成功',
      answerid: newAnswerId
    };
  } catch (err) {
    console.error('保存答案信息失败:', err);
    return {
      success: false,
      errMsg: err.message || '保存答案信息失败'
    };
  }
};

// 生成随机的16位ID (can be reused for answerid)
function generateId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
} 