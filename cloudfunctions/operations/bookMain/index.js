// 预约功能 - 保存预约信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params) {
    return {
      success: false,
      errMsg: '缺少参数'
    };
  }

  const {
    bookType,
    originInfo,
    prevInfo,
    ownerName,
    ownerPhone,
    ownerChildren,
    schoolid
  } = params;

  // 验证必填字段
  if (!bookType || ![1, 2].includes(Number(bookType))) {
    return {
      success: false,
      errMsg: '无效的预约类型：bookType 必须为 1(单人试听) 或 2(拼团试听)'
    };
  }

  if (!originInfo || !originInfo.yibenid || !originInfo.openid) {
    return {
      success: false,
      errMsg: '缺少必要参数：originInfo (yibenid, openid)'
    };
  }

  if (!ownerName) {
    return {
      success: false,
      errMsg: '缺少必要参数：ownerName'
    };
  }

  if (!ownerPhone) {
    return {
      success: false,
      errMsg: '缺少必要参数：ownerPhone'
    };
  }

  if (!ownerChildren || !Array.isArray(ownerChildren) || ownerChildren.length === 0) {
    return {
      success: false,
      errMsg: '缺少必要参数：ownerChildren'
    };
  }

  // 生成随机的32位bookid
  function generateBookId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  try {
    // 获取预约表引用
    const bookCollection = db.collection('book_record');
    
    // 生成bookid并检查是否重复
    let bookid = generateBookId();
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 5;
    
    while (!isUnique && attempts < maxAttempts) {
      // 查询是否已存在相同的bookid
      const idCheckResult = await bookCollection
        .where({
          bookid: bookid
        })
        .count();
      
      if (idCheckResult.total === 0) {
        // bookid不重复，可以使用
        isUnique = true;
      } else {
        // bookid重复，重新生成
        bookid = generateBookId();
        attempts++;
      }
    }
    
    // 如果尝试5次后仍然有重复，返回失败
    if (!isUnique) {
      return {
        success: false,
        errMsg: '无法生成唯一的预约ID，请重试'
      };
    }
    
    // 构建预约记录
    const bookRecord = {
      bookid,
      bookType: Number(bookType),
      originInfo,
      prevInfo: prevInfo || {},
      ownerName,
      ownerPhone: ownerPhone,
      ownerOpenid: originInfo.openid,
      ownerYibenid: originInfo.yibenid,
      schoolid: schoolid || '',
      ownerChildren,
      ifPrepaid: false,
      matchTeacher: '',
      ifPresent: false,
      receptionTeacherPhone: '',
      createTime: db.serverDate(),
      lessonTime: '',
      lessonRoom: '',
      status: 0  // 拼团中:0, 已预约:1
    };
    
    // 保存预约记录
    const addResult = await bookCollection.add({
      data: bookRecord
    });
    
    if (!addResult._id) {
      return {
        success: false,
        errMsg: '保存预约信息失败'
      };
    }
    
    return {
      success: true,
      message: '预约信息保存成功',
      bookid
    };
    
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 