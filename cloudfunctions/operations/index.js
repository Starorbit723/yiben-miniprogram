// 云函数入口文件
const cloud = require('wx-server-sdk');

const schoolRead = require('./schoolRead/index');
const schoolSave = require('./schoolSave/index');
const userLogin = require('./userLogin/index');
const userInfoAuto = require('./userInfoAuto/index');
const userInfoMan = require('./userInfoMan/index');
const bookMain = require('./bookMain/index');
const bookGroup = require('./bookGroup/index');
const bookOneInfo = require('./bookOneInfo/index');
const bookOfUser = require('./bookOfUser/index');
const bookModify = require('./bookModify/index');

cloud.init({
  env: "cloud1-0gvvdaq4c40b8f74"
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 参数基础校验
    if (!event.type || !['schoolRead', 'schoolSave', 'userLogin', 'userInfoAuto', 'userInfoMan', 'bookMain', 'bookGroup', 'bookOneInfo', 'bookOfUser', 'bookModify'].includes(event.type)) {
      return { code: 400, message: '无效的操作类型' };
    }

    // 路由处理
    switch (event.type) {
      case 'schoolRead':
        return await schoolRead.main(event.data, db);
      case 'schoolSave':
        return await schoolSave.main(event.data, db);
      case 'userLogin':
        return await userLogin.main(event.data, db);
      case 'userInfoAuto':
        return await userInfoAuto.main(event.data, db);
      case 'userInfoMan':
        return await userInfoMan.main(event.data, db);
      case 'bookMain':
        return await bookMain.main(event.data, db);
      case 'bookGroup':
        return await bookGroup.main(event.data, db);
      case 'bookOneInfo':
        return await bookOneInfo.main(event.data, db);
      case 'bookOfUser':
        return await bookOfUser.main(event.data, db);
      case 'bookModify':
        return await bookModify.main(event.data, db);
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
}