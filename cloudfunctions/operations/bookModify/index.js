// 修改预约信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.bookid) {
    return {
      success: false,
      errMsg: '缺少必要参数：bookid'
    };
  }

  const { 
    bookid,
    ifPrepaid,
    matchTeacher,
    ifPresent,
    receptionTeacherPhone,
    lessonTime,
    lessonRoom,
    status
  } = params;

  // 构建更新对象，只包含传入的字段
  const updateData = {};
  
  // 添加有值的字段到更新对象
  if (ifPrepaid !== undefined) updateData.ifPrepaid = ifPrepaid;
  if (matchTeacher !== undefined) updateData.matchTeacher = matchTeacher;
  if (ifPresent !== undefined) updateData.ifPresent = ifPresent;
  if (receptionTeacherPhone !== undefined) updateData.receptionTeacherPhone = receptionTeacherPhone;
  if (lessonTime !== undefined) updateData.lessonTime = lessonTime;
  if (lessonRoom !== undefined) updateData.lessonRoom = lessonRoom;
  if (status !== undefined) updateData.status = status;
  
  // 如果没有需要更新的字段
  if (Object.keys(updateData).length === 0) {
    return {
      success: false,
      errMsg: '没有提供需要更新的字段'
    };
  }

  try {
    // 获取预约表引用
    const bookCollection = db.collection('book_record');
    
    // 检查预约记录是否存在
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
    
    // 更新预约记录
    const updateResult = await bookCollection
      .where({
        bookid: bookid
      })
      .update({
        data: updateData
      });
    
    if (updateResult.stats.updated > 0) {
      return {
        success: true,
        message: '预约信息更新成功',
        updated: updateResult.stats.updated
      };
    } else {
      return {
        success: false,
        errMsg: '预约信息更新失败',
        updated: 0
      };
    }
    
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 