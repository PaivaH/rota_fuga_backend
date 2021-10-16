const user = require('./user')
const report = require('./report')
const reportType = require('./report_type')
const transportType = require('./transport_type')

module.exports = app => {
    //rotas de usuarios
    app.route('/user')
        .post(user.save)
        .get(user.get)
        
    app.route('/user/:id')
        .get(user.getById)
        .patch(user.save)
        .delete(user.remove)

    //rotas de reportes
    app.route('/report')
        .get(report.get)
        .post(report.save)

    app.route('/report/:id')
        .get(report.getById)
        .patch(report.save)
        .delete(report.remove)

    //rotas de tipos de reporte
    app.route('/report_type')
        .get(reportType.get)
        .post(reportType.save)

    app.route('/report_type/:id')
        .patch(reportType.save)
        .delete(reportType.remove)

    //rotas de tipos de transporte 
    app.route('/transport_type')
        .get(transportType.get)
        .post(transportType.save)

    app.route('/transport_type/:id')
        .patch(transportType.save)
        .delete(transportType.remove)

}