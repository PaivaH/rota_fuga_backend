const user = require('./user')
const report = require('./report')
const reportType = require('./report_type')
const transportType = require('./transport_type')

module.exports = app => {
    app.route('/user')
        .post(user.save)
        .get(user.get)

    app.route('/user/:id')
        .get(user.getById)
        .patch(user.save)

    app.route('/report')
        .post(report.save)

    app.route('/report/:id')
        .delete(report.remove)
        .patch(report.save)
    
    app.route('/report_type')
        .post(reportType.save)

    app.route('/report_type/:id')
        .delete(reportType.remove)
        .patch(reportType.save)

    app.route('/transport_type')
        .post(transportType.save)

    app.route('/transport_type/:id')
        .delete(transportType.remove)
        .patch(transportType.save)
}