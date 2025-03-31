
'use strict';
const dayjs = require('dayjs');
const { ValidationError } = require('../../errors');

module.exports.main = async (data, app) => {
  try {
    // 字段校验
    if (!data?.name || !data?.address) {
      throw new ValidationError('校区名称和地址不能为空');
    }

    // 构造校区数据
    const campusData = {
      name: data.name.trim(),
      address: data.address.trim(),
      createTime: dayjs().valueOf()
    };

    // 数据库操作
    const result = await app.models.campus.create({
      data: campusData
    });

    return {
      code: 200,
      data: { _id: result.data.id },
      message: '创建成功'
    };
  } catch (error) {
    if (error.code === 'DUPLICATE_ENTRY') {
      throw new ValidationError('校区名称已存在');
    }
    throw error;
  }
};
  