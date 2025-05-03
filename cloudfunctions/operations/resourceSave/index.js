// 保存资源信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params) {
    return {
      success: false,
      errMsg: '缺少参数'
    };
  }

  const { url, fileId, type, name } = params;

  // 检查必要参数
  if (!url || !fileId || !type || !name) {
    return {
      success: false,
      errMsg: '缺少必要参数：url, fileId, type, name'
    };
  }

  // 验证资源类型
  if (![1, 2].includes(Number(type))) {
    return {
      success: false,
      errMsg: '资源类型无效，应为 1(图片) 或 2(视频)'
    };
  }

  // 自动生成当前时间戳
  const createTime = Date.now();

  // 构建存储对象
  const resourceData = {
    url,
    fileId,
    createTime,
    type: Number(type),
    name
  };

  try {
    // 获取资源表引用
    const resourceCollection = db.collection('resource');
    
    // 保存资源信息
    const result = await resourceCollection.add({
      data: resourceData
    });
    
    return {
      success: true,
      message: '资源信息保存成功',
      _id: result._id
    };
  } catch (err) {
    return {
      success: false,
      errMsg: err.message
    };
  }
}; 