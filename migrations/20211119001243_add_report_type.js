exports.up = function(knex, Promise) {
    return knex.schema.createTable('report_type', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.boolean('sensible').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('report_type')
};
