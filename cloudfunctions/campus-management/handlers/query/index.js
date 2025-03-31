
'use strict';
const { ValidationError } = require('../../errors');

module.exports.main = async (event, app) => {
  try {
    const { campusId, keyword, pageSize = 10, pageNumber = 1 } = event;
    
    // 构建查询条件
    const where = {};
    if (campusId) {
      where._id = { $eq: campusId };
    } else if (keyword) {
      where.$or = [
        { name: { $search: keyword } },
        { address: { $search: keyword } }
      ];
    }

    // 执行查询
    const result = await app.models.campus.list({
      where,
      orderBy: [{ createTime: 'desc' }],
      pageSize: Math.min(pageSize, 100),
      pageNumber,
      getCount: true
    });

    return {
      code: 200,
      data: result.data.records,
      total: result.data.total
    };
  } catch (error) {
    console.error('查询错误:', error);
    throw new ValidationError('查询参数无效');
  }
};
  