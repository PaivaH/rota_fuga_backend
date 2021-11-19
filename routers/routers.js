const auth = require('./auth')
const user = require('./user')
const report = require('./report')
const reportType = require('./report_type')
const transportType = require('./transport_type')
const passport = require('../config/passport')
const admin = require('../config/admin')

module.exports = app => {
    app.post('/signup', user.save)
    app.post('/signin', auth.signin)
    app.post('/validateToken', auth.validateToken)

    //rotas de usuarios
    app.route('/user')
        .all(passport.authenticate())
        .post(admin(user.save))
        .get(admin(user.get))
        
    app.route('/user/:id')
        .all(passport.authenticate())
        .get(user.getById)
        .patch(user.save)
        .delete(user.remove)

    app.get('/last_reports', report.lastReports)
    
    //rotas de reportes
    app.route('/report')
        .all(passport.authenticate())
        .get(report.get)
        .post(report.save)

    app.route('/report/:id')
        .all(passport.authenticate())
        .get(report.getById)
        .patch(report.save)
        .delete(report.remove)

    //rotas de tipos de reporte
    app.route('/report_type')
        .all(passport.authenticate())
        .get(reportType.get)
        .post(admin(reportType.save))

    app.route('/report_type/:id')
        .all(passport.authenticate())
        .patch(admin(reportType.save))
        .delete(reportType.remove)

    //rotas de tipos de transporte 
    app.route('/transport_type')
        .all(passport.authenticate())
        .get(transportType.get)
        .post(admin(transportType.save))

    app.route('/transport_type/:id')
        .all(passport.authenticate())
        .patch(admin(transportType.save))
        .delete(admin(transportType.remove))

}