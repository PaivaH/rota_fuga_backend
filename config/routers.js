module.exports = app => {
    app.post('/signup', app.routers.user.save)
    app.post('/signin', app.routers.auth.signin)
    app.post('/validateToken', app.routers.auth.validateToken)

    //rotas de usuarios
    app.route('/user')
        .all(app.config.passport.authenticate())
        .post(app.routers.user.save)
        .get(app.routers.user.get)
        
    /*app.route('/user/:id')
        .get(app.routers.user.getById)
        .patch(app.routers.user.save)
        .delete(app.routers.user.remove)

    //rotas de reportes
    app.route('/report')
        .get(app.routers.report.get)
        .post(app.routers.report.save)

    app.route('/report/:id')
        .get(app.routers.report.getById)
        .patch(app.routers.report.save)
        .delete(app.routers.report.remove)

    //rotas de tipos de reporte
    app.route('/reporttype')
        .get(app.routers.reporttype.get)
        .post(app.routers.reporttype.save)

    app.route('/reporttype/:id')
        .patch(app.routers.reporttype.save)
        .delete(app.routers.reporttype.remove)

    //rotas de tipos de transporte 
    app.route('/transporttype')
        .get(app.routers.transporttype.get)
        .post(app.routers.transporttype.save)

    app.route('/transporttype/:id')
        .patch(app.routers.transporttype.save)
        .delete(app.routers.transporttype.remove)*/

}