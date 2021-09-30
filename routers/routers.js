const api = require('./user')

module.exports = app => {
    app.route('/users')
        .post(api.save)
    //app.route('/users/:name')
}