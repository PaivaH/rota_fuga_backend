const api = require('./user')

module.exports = app => {
    app.route('/users')
        .post(api.save)
        .get(api.get)
    app.route('/users/:id')
        .get(api.getById)
}