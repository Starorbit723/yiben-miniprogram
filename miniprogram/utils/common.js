const validatePhoneNumber = function(phone) {
  const regex = /^1\d{10}$/;
  return regex.test(phone);
};

const validateUsername = function(name) {
  const regex = /^[\u4e00-\u9fa5a-zA-Z]+$/;
  return regex.test(name);
};

const validateAge = function(age) {
  const regex = /^([1-9]|1[0-8])$/;
  return regex.test(age);
}

const getWxCode = function(callback) {
  wx.login({
    success (res) {
      if (res.code) {
        console.log('wx.login res', res);
        callback(res.code)
        return;
      } else {
        console.log('wx.login error' + res.errMsg);
      }
    }
  })
}

const bookType = [
  { id: 1, name: '单人试听' },
  { id: 2, name: '拼团试听' }, 
];

const bookTypeName = function(type) {
  let _bookTypeName = '';
  bookType.forEach(ele => {
    if (ele.id === type) {
      _bookTypeName = ele.name;
    }
  });
  return _bookTypeName;
}

const bookStatus = [
  { id: 0, name: '拼团中', color: '#F00' },
  { id: 1, name: '已预约', color: '#F00' },
  { id: 2, name: '校区确认中', color: '#F00' },
  { id: 3, name: '待使用', color: '#F00' },
  { id: 4, name: '已使用', color: '#F00' },
  { id: 5, name: '已取消', color: '#F00' },
];

const schoolOptions = [
  {id: 1 , name: '广安门校区'}
];

const schoolNameShow = function(schoolid) {
  let _schoolName = '';
  schoolOptions.forEach(ele => {
    if (ele.id === schoolid) {
      _schoolName = ele.name;
    }
  });
  return _schoolName;
}

const formatDate = function(dateString) {
  const date = new Date(dateString);

  // 获取年月日、时分秒并填充为两位数
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，所以需加 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 拼接格式化后的日期时间字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
  validatePhoneNumber,
  validateUsername,
  validateAge,
  getWxCode,
  bookType,
  bookTypeName,
  bookStatus,
  schoolOptions,
  schoolNameShow,
  formatDate,
};