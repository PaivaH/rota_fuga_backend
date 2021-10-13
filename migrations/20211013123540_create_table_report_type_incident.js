exports.up = function(knex) {
    return knex.schema.createTable('report_type_incident', table => {
        table.increments('id').primary()
        table.string('name').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('report_type_incident')
};
