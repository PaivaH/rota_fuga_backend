const db = require('../config/db')

const { existsOrError, notExistOrError, equalsOrError } = require('./validation')

const save = (req, res) => {

    const report = { ...req.body }

    if (req.params.id) {
        report.id = req.params.id
    }

    try {
        existsOrError(report.description, 'Descrição não informada')
        existsOrError(report.transport_type, 'Tipo de transporte não informado')
        existsOrError(report.transport_line, 'Linha não informado')
        existsOrError(report.occurrence_date, 'Data da ocorrencia não informado')
        existsOrError(report.report_type, 'Tipo de ocorrencia não informado')
        //existsOrError(report.logradouro, 'logradouro não informado')
        //existsOrError(report.numero, 'numero não informado')
        existsOrError(report.bairro, 'bairro não informado')
        existsOrError(report.cidade, 'cidade não informado')
        existsOrError(report.uf, 'uf não informado')
    } catch (msg) {
        res.status(400).send(msg)
    }
    report.reported_date = new Date()

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
        const rowsDeleted = await db('report')
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

    db('report')
        .select()
        .limit(limit).offset(page * limit - limit)
        .orderBy('id')
        //.then(report => res.json(report))
        .then(report => res.json({ data: report, count, limit }))
        .catch(err => res.status(500).send(err))
}

const lastReports = async (req, res) => {
    const page = req.query.page || 1

    const result = await db('report').count('id').first()
    const count = parseInt(result.count)

    db('report as r')
        .join('transport_type as tt', 'r.transport_type', 'tt.id')
        .join('report_type as rt', 'r.report_type', 'rt.id')
        .select('r.description', 'tt.name',
            'r.transport_line', 'r.reported_date',
            'r.logradouro', 'r.numero', 
            'r.bairro', 'r.cidade', 'r.uf'
        )
        .where('rt.sensible', '=', 'false')
        .orderBy('r.reported_date')
        .limit(limit).offset(page * limit - limit)
        //.then(report => res.json(report))
        .then(report => res.json({ data: report, count, limit }))
        .catch(err => res.status(500).send(err))
}

const getById = (req, res) => {
    db('report')
        .where({ id: req.params.id })
        .first()
        .then(report => {
            return res.json(report)
        })
        .catch(err => res.status(500).send(err))
}

module.exports = { save, remove, get, getById, lastReports }