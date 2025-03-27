// components/ybOrderStatus.js
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
      let _color= ''
      switch (status) {
        case 0:
          _text = '预约成功';
          _color = '#099220';
          break;
        case 1:
          _text = '校区确认中';
          _color = '#099220';
          break;
        default:
          _text = '';
          _color = '';
      }
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