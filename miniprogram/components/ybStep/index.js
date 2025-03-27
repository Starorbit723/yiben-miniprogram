Component({
  properties: {
    stepList: Array,
    currentStep: Number,
  },
  data: {
    duan: 0,
    duanlength: 0,
    duanList: []
  },
  observers: {
    'stepList, currentStep': function(stepList, currentStep) {
      const duan = 100 / (stepList.length * 2);
      const duanlength = duan * 2;
      const duanList = [];
      for (let i = 0; i < stepList.length - 1; i++) {
        if (duanList.length === 0) {
          duanList.push({
            left: duan,
            lineColor: (currentStep - 1) <= i ? '#FFF' : '#05af2d'
          });
        } else {
          duanList.push({
            left: duanList[i - 1].left + duanlength,
            lineColor: (currentStep - 1) <= i ? '#FFF' : '#05af2d'
          });
        }
      }
      console.log(duan, duanlength, duanList);
      this.setData({
        duan: duan,
        duanlength: duanlength,
        duanList: duanList
      })
    }
  }
});
