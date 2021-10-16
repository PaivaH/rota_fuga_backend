const db = require('../config/db')

const { existsOrError, notExistOrError, equalsOrError } = require('./validation')

const save = async (req, res) => {
    const user = { ...req.body }

    if(req.params.id) {
        user.id = req.params.id
    } 

    try {
        existsOrError(user.name, 'Nome não informado')
        existsOrError(user.email, 'E-mail não informado')
        existsOrError(user.password, 'Senha não informada')
        existsOrError(user.confirmPassword, 'Confirmação de senha invalida')
        equalsOrError(user.password, user.confirmPassword,
            'Senha não conferem')

        const userFromDB = await db('users')
            .where({ email: user.email }).first()
        if (user.id) {
            notExistOrError(userFromDB, 'Usuario já cadastrado')
        }
    } catch (msg) {
        return res.status(400).send(msg)
    }
    delete user.confirmPassword

    if (user.id) {
        db('users')
            .update(user)
            .where({ id: user.id })
            .then(_ => res.status(204).send())
            .whereNull('deletedAt')
            .catch(err => res.status(500).send(err))
    } else {
        db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
}

const get = (req, res) => {
    db('users')
        .select('id', 'name' , 'email', 'admin')
        .whereNull('deletedAt')
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
}

const getById = (req, res) => {
    db('users')
        .select('id', 'name', 'email', 'admin')
        .where({ id: req.params.id })
        .whereNull('deletedAt')
        .first()
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
}

const remove = async (req, res) => {
    try {
        const report = await db('report')
            .where({ user_id: req.params.id })
        notExistOrError(report, 'Usuário possui artigos.')

        const rowsUpdated = await db('users')
            .update({deletedAt: new Date()})
            .where({ id: req.params.id })
        existsOrError(rowsUpdated, 'Usuário não foi encontrado.')
        res.status(204).send()
    } catch(msg) {
        res.status(400).send(msg)
    }
}

module.exports = { save, get, getById, remove }