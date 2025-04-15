// 保存校区信息（创建或更新）
exports.main = async (params, db) => {
  // 参数校验
  if (!params || !params.schoolid) {
    return {
      success: false,
      errMsg: '缺少必要参数：schoolid'
    };
  }
  
  // 检查是否只包含允许的参数
  const allowedParams = ['schoolid', 'detail'];
  const paramKeys = Object.keys(params);
  for (const key of paramKeys) {
    if (!allowedParams.includes(key)) {
      return {
        success: false,
        errMsg: `不允许的参数：${key}，只能包含 schoolid 和 detail`
      };
    }
  }
  

  // 获取数据库引用
  const schoolCollection = db.collection('school');
  
  try {
    // 根据 schoolid 查询记录是否存在
    const queryResult = await schoolCollection
      .where({
        schoolid: params.schoolid
      })
      .get();
    
    if (queryResult.data.length === 0) {
      // 不存在记录，创建新记录
      const addResult = await schoolCollection.add({
        data: {
          ...params,
          createTime: db.serverDate()
        }
      });
      
      return {
        success: true,
        message: '创建成功',
        _id: addResult._id
      };
    } else {
      // 存在记录，更新记录
      const updateResult = await schoolCollection
        .where({
          schoolid: params.schoolid
        })
        .update({
          data: {
            ...params,
            updateTime: db.serverDate()
          }
        });
      
      return {
        success: true,
        message: '更新成功',
        updated: updateResult.stats.updated
      };
    }
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 