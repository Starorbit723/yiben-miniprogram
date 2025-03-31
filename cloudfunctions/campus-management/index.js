
'use strict';
const cloudbase = require('@cloudbase/node-sdk');
const saveHandler = require('./handlers/save');
const queryHandler = require('./handlers/query');

const app = cloudbase.init({
  env: cloudbase.SYMBOL_CURRENT_ENV
});

exports.main = async (event, context) => {
  try {
    // 参数基础校验
    if (!event.type || !['save', 'query'].includes(event.type)) {
      return { code: 400, message: '无效的操作类型' };
    }

    // 路由处理
    switch (event.type) {
      case 'save':
        return await saveHandler.main(event.data, app);
      case 'query':
        return await queryHandler.main(event, app);
      default:
        return { code: 400, message: '未实现的操作类型' };
    }
  } catch (error) {
    console.error('全局错误:', error);
    return { 
      code: error.code || 500, 
      message: error.message || '服务器内部错误'
    };
  }
};
  