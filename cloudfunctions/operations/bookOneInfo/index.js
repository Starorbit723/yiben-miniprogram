// 查询单个预约信息 - 包括预约记录和拼团信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.bookid) {
    return {
      success: false,
      errMsg: '缺少必要参数：bookid'
    };
  }

  const { bookid } = params;

  try {
    // 获取表引用
    const bookCollection = db.collection('book_record');
    const groupInfoCollection = db.collection('group_info');
    
    // 查询预约记录
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
    
    // 获取主预约信息
    const bookRecord = bookResult.data[0];
    
    // 查询拼团信息
    const groupInfoResult = await groupInfoCollection
      .where({
        bookid: bookid
      })
      .get();
    
    // 添加拼团信息列表到预约记录中
    bookRecord.groupInfoList = groupInfoResult.data || [];
    
    return {
      success: true,
      data: bookRecord
    };
    
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 