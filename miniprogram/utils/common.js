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

module.exports = {
  validatePhoneNumber,
  validateUsername,
  validateAge,
  getWxCode
};