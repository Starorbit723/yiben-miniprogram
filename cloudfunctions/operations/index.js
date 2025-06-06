// 云函数入口文件
const cloud = require('wx-server-sdk');

const schoolRead = require('./schoolRead/index');
const schoolSave = require('./schoolSave/index');
const schoolList = require('./schoolList/index');
const userLogin = require('./userLogin/index');
const userInfoAuto = require('./userInfoAuto/index');
const userInfoMan = require('./userInfoMan/index');
const userInfoModify = require('./userInfoModify/index');
const bookMain = require('./bookMain/index');
const bookGroup = require('./bookGroup/index');
const bookOneInfo = require('./bookOneInfo/index');
const bookOfUser = require('./bookOfUser/index');
const bookModify = require('./bookModify/index');
const userManagePage = require('./userManagePage/index');
const userOneInfo = require('./userOneInfo/index');
const bookManagePage = require('./bookManagePage/index');
const resourceSave = require('./resourceSave/index');
const resourceManagePage = require('./resourceManagePage/index');
const resourceDelete = require('./resourceDelete/index');
const questionnaireSave = require('./questionnaireSave/index');
const questionnaireOneInfo = require('./questionnaireOneInfo/index');
const questionnaireManagePage = require('./questionnaireManagePage/index');
const answerManagePage = require('./answerManagePage/index');
const answerOneInfo = require('./answerOneInfo/index');
const answerSave = require('./answerSave/index');
const roleConfigManagePage = require('./roleConfigManagePage/index');
const roleConfigOneInfo = require('./roleConfigOneInfo/index');
const roleConfigSave = require('./roleConfigSave/index');
const roleConfigDel = require('./roleConfigDel/index');

cloud.init({
  env: "cloud1-0gvvdaq4c40b8f74"
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 参数基础校验
    if (!event.type || !['schoolRead', 'schoolSave', 'schoolList', 'userLogin', 'userInfoAuto', 'userInfoMan', 'userInfoModify', 'bookMain', 'bookGroup', 'bookOneInfo', 'bookOfUser', 'bookModify', 'userManagePage', 'userOneInfo', 'bookManagePage', 'resourceSave', 'resourceManagePage', 'resourceDelete', 'questionnaireSave', 'questionnaireOneInfo', 'questionnaireManagePage', 'answerManagePage', 'answerOneInfo', 'answerSave', 'roleConfigManagePage', 'roleConfigOneInfo', 'roleConfigSave', 'roleConfigDel'].includes(event.type)) {
      return { code: 400, message: '无效的操作类型' };
    }

    // 路由处理
    switch (event.type) {
      case 'schoolRead':
        return await schoolRead.main(event.data, db);
      case 'schoolSave':
        return await schoolSave.main(event.data, db);
      case 'schoolList':
        return await schoolList.main(event.data, db);
      case 'userLogin':
        return await userLogin.main(event.data, db);
      case 'userInfoAuto':
        return await userInfoAuto.main(event.data, db);
      case 'userInfoMan':
        return await userInfoMan.main(event.data, db);
      case 'userInfoModify':
        return await userInfoModify.main(event.data, db);
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
      case 'userManagePage':
        return await userManagePage.main(event.data, db);
      case 'userOneInfo':
        return await userOneInfo.main(event.data, db);
      case 'bookManagePage':
        return await bookManagePage.main(event.data, db);
      case 'resourceSave':
        return await resourceSave.main(event.data, db);
      case 'resourceManagePage':
        return await resourceManagePage.main(event.data, db);
      case 'resourceDelete':
        return await resourceDelete.main(event.data, db);
      case 'questionnaireSave':
        return await questionnaireSave.main(event.data, db);
      case 'questionnaireOneInfo':
        return await questionnaireOneInfo.main(event.data, db);
      case 'questionnaireManagePage':
        return await questionnaireManagePage.main(event.data, db);
      case 'answerManagePage':
        return await answerManagePage.main(event.data, db);
      case 'answerOneInfo':
        return await answerOneInfo.main(event.data, db);
      case 'answerSave':
        return await answerSave.main(event.data, db);
      case 'roleConfigManagePage':
        return await roleConfigManagePage.main(event.data, db);
      case 'roleConfigOneInfo':
        return await roleConfigOneInfo.main(event.data, db);
      case 'roleConfigSave':
        return await roleConfigSave.main(event.data, db);
      case 'roleConfigDel':
        return await roleConfigDel.main(event.data, db);
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