exports.up = function(knex, Promise) {
    return knex.schema.createTable('report', table => {
        table.increments('id').primary()
        table.string('description', 1000).notNull()
        table.string('transport_line')
        table.timestamp('occurrence_date')
        table.timestamp('reported_date')
        table.string('uf')
        table.string('cidade')
        table.string('bairro')
        table.string('logradouro')
        table.string('numero')
        table.integer('report_type').references('id')
            .inTable('report_type').notNull()
        table.integer('transport_type').references('id')
            .inTable('transport_type').notNull()
            table.integer('user_id').references('id')
            .inTable('users').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('report')
};