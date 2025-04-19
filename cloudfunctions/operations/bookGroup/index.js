// 拼团参与功能 - 保存拼团信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params) {
    return {
      success: false,
      errMsg: '缺少参数'
    };
  }

  const {
    memberOpenid,
    memberYibenid,
    memberName,
    memberPhone,
    memberChildren,
    bookid
  } = params;

  // 验证必填字段
  if (!memberOpenid) {
    return {
      success: false,
      errMsg: '缺少必要参数：memberOpenid'
    };
  }

  if (!memberYibenid) {
    return {
      success: false,
      errMsg: '缺少必要参数：memberYibenid'
    };
  }

  if (!memberName) {
    return {
      success: false,
      errMsg: '缺少必要参数：memberName'
    };
  }

  if (!memberPhone) {
    return {
      success: false,
      errMsg: '缺少必要参数：memberPhone'
    };
  }

  if (!memberChildren || !Array.isArray(memberChildren) || memberChildren.length === 0) {
    return {
      success: false,
      errMsg: '缺少必要参数：memberChildren'
    };
  }

  if (!bookid) {
    return {
      success: false,
      errMsg: '缺少必要参数：bookid'
    };
  }

  // 生成随机的32位groupInfoid
  function generateGroupInfoId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  try {
    // 获取拼团信息表引用
    const groupInfoCollection = db.collection('group_info');
    
    // 检查bookid是否存在
    const bookCollection = db.collection('book_record');
    const bookResult = await bookCollection
      .where({
        bookid: bookid
      })
      .get();
    
    if (bookResult.data.length === 0) {
      return {
        success: false,
        errMsg: '预约记录不存在'
      };
    }
    
    // 检查该bookid的拼团人数是否已达上限
    const groupCount = await groupInfoCollection
      .where({
        bookid: bookid
      })
      .count();
    
    if (groupCount.total >= 2) {
      return {
        success: false,
        errMsg: '该拼团已达到最大参与人数'
      };
    }
    
    // 检查用户是否已参与该拼团
    const existingMember = await groupInfoCollection
      .where({
        bookid: bookid,
        memberYibenid: memberYibenid
      })
      .count();
    
    if (existingMember.total > 0) {
      return {
        success: false,
        errMsg: '您已参与该拼团，无需重复参与'
      };
    }
    
    // 生成groupInfoid并检查是否重复
    let groupInfoid = generateGroupInfoId();
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 5;
    
    while (!isUnique && attempts < maxAttempts) {
      // 查询是否已存在相同的groupInfoid
      const idCheckResult = await groupInfoCollection
        .where({
          groupInfoid: groupInfoid
        })
        .count();
      
      if (idCheckResult.total === 0) {
        // groupInfoid不重复，可以使用
        isUnique = true;
      } else {
        // groupInfoid重复，重新生成
        groupInfoid = generateGroupInfoId();
        attempts++;
      }
    }
    
    // 如果尝试5次后仍然有重复，返回失败
    if (!isUnique) {
      return {
        success: false,
        errMsg: '无法生成唯一的拼团ID，请重试'
      };
    }
    
    // 构建拼团信息记录
    const groupInfoRecord = {
      groupInfoid,
      memberOpenid,
      memberYibenid,
      memberName,
      memberPhone,
      memberChildren,
      bookid
    };
    
    // 保存拼团信息记录
    const addResult = await groupInfoCollection.add({
      data: groupInfoRecord
    });
    
    if (!addResult._id) {
      return {
        success: false,
        errMsg: '保存拼团信息失败'
      };
    }
    
    // 检查拼团是否已满，如果满了则更新主预约记录状态
    const updatedGroupCount = await groupInfoCollection
      .where({
        bookid: bookid
      })
      .count();
    
    if (updatedGroupCount.total >= 2) {
      // 拼团已满，更新预约状态为"已预约(1)"
      await bookCollection
        .where({
          bookid: bookid
        })
        .update({
          data: {
            status: 1,  // 更新为"已预约"状态
          }
        });
    }
    
    return {
      success: true,
      message: '拼团参与成功',
      groupInfoid,
      isFull: updatedGroupCount.total >= 2
    };
    
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 