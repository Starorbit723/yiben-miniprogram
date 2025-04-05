const { envList } = require("../../envList");
const app = getApp();

Page({
  data: {
    form: {
      parentName: '',
      studentName: '',
      phoneNumber: '',
      school: 0
    },
    schoolOptions: [
      {id: 0 , name: '广安门校区'}
    ],
    latitude: 39.890780,
    longitude: 116.355712,
    markers: [{
      id: 1,
      latitude: 39.890780,
      longitude: 116.355712,
      name: '广益大厦'
    }],
  },
  openModal() {
    this.setData({
      showModal: true
    });
  },
  closeModal() {
    this.setData({
      showModal: false
    });
  },
  submitSigleAppointment() {
    console.log(app.globalData);
  },
});
