exports.up = function(knex, Promise) {
    return knex.schema.createTable('report_personal', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description', 1000).notNull()
        table.integer('transport_id').references('id')
            .inTable('transport_type').notNull()
        table.string('transport_line').notNull()
        table.timestamp('occurrence_date')
        table.timestamp('reported_date')
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('report_personal')
};
