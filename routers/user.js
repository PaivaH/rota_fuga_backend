const db = require('../config/db')
const { existsOrError, 
        notExistOrError, 
        equalsOrError } = require('./validation')

const save = async (req, res) => {
    const user = { ...req.body }
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
            .catch(err => res.status(500).send(err))
    } else {
        db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
}


module.exports = { save }