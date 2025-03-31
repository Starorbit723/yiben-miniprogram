// 云函数入口文件
const wxId = require('./wxId/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'wxId':
      return await wxId.main(event, context);
    default:
      return {
        success: false,
        message: '未找到对应的函数类型'
      };
  }
}