exports.up = function(knex) {
    return knex.schema.createTable('transport_type', table => {
        table.increments('id').primary()
        table.string('name').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('transport_type')
};