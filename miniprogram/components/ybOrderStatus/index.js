// components/ybOrderStatus.js
const { bookStatus } = require("../../utils/common.js");

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    status: Number
  },
  /**
   * 组件的初始数据
   */
  data: {
    text: '',
    color: ''
  },
  observers: {
    'status': function (status) {
      let _text = '';
      let _color= '';
      bookStatus.forEach(ele => {
        if (status === ele.id) {
          _text = ele.name;
          _color = ele.color;
        }
      });
      this.setData({
        text: _text,
        color: _color
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})