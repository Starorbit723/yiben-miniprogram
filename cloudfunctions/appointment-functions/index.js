const createAppointment = require('./createAppointment/index')
const getAppointmentList = require('./getAppointmentList/index')
const updateAppointmentStatus = require('./updateAppointmentStatus/index')
const cancelAppointment = require('./cancelAppointment/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'createAppointment':
      return await createAppointment.main(event.data, context)
    case 'getAppointmentList':
      return await getAppointmentList.main(event.data, context)
    case 'updateAppointmentStatus':
      return await updateAppointmentStatus.main(event.data, context)
    case 'cancelAppointment':
      return await cancelAppointment.main(event.data, context)
    default:
      return {
        success: false,
        message: '未知的操作类型'
      }
  }
}
