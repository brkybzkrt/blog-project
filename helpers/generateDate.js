const moment = require('moment')

module.exports={
    generateDate:(date,format)=>{
        return moment(date).locale('tr').format(format)
    }
}