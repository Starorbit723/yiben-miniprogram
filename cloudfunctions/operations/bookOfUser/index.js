// 查询用户的预约信息 - 包括自己发起的和参团的记录
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.yibenid) {
    return {
      success: false,
      errMsg: '缺少必要参数：yibenid'
    };
  }

  const { yibenid } = params;

  try {
    // 获取表引用
    const bookCollection = db.collection('book_record');
    const groupInfoCollection = db.collection('group_info');
    
    // 查询用户作为发起人的预约记录
    const ownerBookingsResult = await bookCollection
      .where({
        ownerYibenid: yibenid
      })
      .get();
    
    // 查询用户作为参团人的记录
    const memberGroupsResult = await groupInfoCollection
      .where({
        memberYibenid: yibenid
      })
      .get();
    
    // 保存用户参团的bookid集合
    const participatedBookIds = memberGroupsResult.data.map(item => item.bookid);
    
    // 查询用户参团的预约记录
    let participatedBookingsResult = { data: [] };
    if (participatedBookIds.length > 0) {
      participatedBookingsResult = await bookCollection
        .where({
          bookid: db.command.in(participatedBookIds)
        })
        .get();
    }
    
    // 合并所有预约记录（去重）
    const allBookRecords = [...ownerBookingsResult.data];
    
    // 添加参团的预约记录（避免重复添加）
    const ownerBookIds = new Set(ownerBookingsResult.data.map(item => item.bookid));
    participatedBookingsResult.data.forEach(item => {
      if (!ownerBookIds.has(item.bookid)) {
        allBookRecords.push(item);
      }
    });
    
    // 按照创建时间倒序排列
    allBookRecords.sort((a, b) => {
      const timeA = a.createTime instanceof Date ? a.createTime.getTime() : new Date(a.createTime).getTime();
      const timeB = b.createTime instanceof Date ? b.createTime.getTime() : new Date(b.createTime).getTime();
      return timeB - timeA; // 降序排列
    });
    
    // 对每个预约记录，查询相应的拼团信息
    const bookRecordsWithGroups = await Promise.all(
      allBookRecords.map(async (bookRecord) => {
        // 查询拼团信息
        const groupInfoResult = await groupInfoCollection
          .where({
            bookid: bookRecord.bookid
          })
          .get();
        
        // 添加拼团信息列表到预约记录中
        bookRecord.groupInfoList = groupInfoResult.data || [];
        
        // 标记用户身份
        bookRecord.isOwner = bookRecord.ownerYibenid === yibenid;
        bookRecord.isParticipant = participatedBookIds.includes(bookRecord.bookid);
        
        return bookRecord;
      })
    );
    
    return {
      success: true,
      data: bookRecordsWithGroups
    };
    
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 