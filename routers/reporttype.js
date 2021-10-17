module.export = app => {

    const { existsOrError, notExistOrError, equalsOrError } = require('./validation')

    const save = (req, res) => {
        const report_type = { ...req.body }

        if (req.params.id) {
            report_type.id = req.params.id
        }

        try {
            existsOrError(report_type.name, 'Descrição não informada')
            existsOrError(report_type.sensible, 'Informação sensivel ou não, não declarada')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (report_type.id) {
            app.db('report_type')
                .update(report_type)
                .where({ id: report_type.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('report_type')
                .insert(report_type)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('report_type')
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

    const get = async (req, res) => {
        app.db('report_type')
            .select('id', 'name', 'sensible')
            .then(report_type => res.json(report_type))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get }
}