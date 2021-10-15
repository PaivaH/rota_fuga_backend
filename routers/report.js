const db = require('../config/db')

const { existsOrError, notExistOrError, equalsOrError } = require('./validation')

const save = (req, res) => {
    const report = { ...req.body }
    if (req.params.id) {
        report.id = req.params.id
    }

    try {
        existsOrError(report.description, 'Descrição não informada')
        existsOrError(report.transport_id, 'Tipo de transporte não informado')
        existsOrError(report.transport_line, 'Linha não informado')
        existsOrError(report.occurrence_date, 'Data da ocorrencia não informado')
        existsOrError(report.user_id, 'Autor não informado')
    } catch (msg) {
        res.status(400).send(msg)
    }
    report.reported_date = Math.floor(Date.now() / 1000)

    if (report.id) {
        db('report')
            .update(report)
            .where({ id: report.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    } else {
        db('report')
            .insert(report)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
}

const remove = async (req, res) => {
    try {
        const rowsDeleted = await app.db('report')
            .where({ id: req.params.id }).del()

        try {
            existsOrError(rowsDeleted, 'reporte não encontrado.')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        res.status(204).send()
    } catch (msg) {
        res.status(500).send(msg)
    }
}

const limit = 10 // usado para paginação
const get = async (req, res) => {
    const page = req.query.page || 1

    const result = await db('report').count('id').first()
    const count = parseInt(result.count)

    app.db('report')
        .select('id', 'name', 'description')
        .limit(limit).offset(page * limit - limit)
        .then(report => res.json({ data: report, count, limit }))
        .catch(err => res.status(500).send(err))
}

const getById = (req, res) => {
    app.db('report')
        .where({ id: req.params.id })
        .first()
        .then(report => {
            report.content = report.content.toString()
            return res.json(report)
        })
        .catch(err => res.status(500).send(err))
}

module.exports = { save, remove, get, getById }