const db = require('../config/db')

const { existsOrError, notExistOrError, equalsOrError } = require('./validation')

const save = (req, res) => {
    const transport_type = { ...req.body }
    if (req.params.id) {
        transport_type.id = req.params.id
    }

    try {
        existsOrError(transport_type.name, 'Descrição não informada')
    } catch (msg) {
        res.status(400).send(msg)
    }

    if (transport_type.id) {
        db('transport_type')
            .update(transport_type)
            .where({ id: transport_type.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    } else {
        db('transport_type')
            .insert(transport_type)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
}

const remove = async (req, res) => {
    try {
        const rowsDeleted = await db('transport_type')
            .where({ id: req.params.id }).del()
        
        try {
            existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
        } catch(msg) {
            return res.status(400).send(msg)    
        }

        res.status(204).send()
    } catch(msg) {
        res.status(500).send(msg)
    }
}

const get = (req, res) => {
    db('transport_type')
        .select()
        .orderBy('id')
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
}

module.exports = { save, remove, get }