exports.up = function(knex) {
    return knex.schema.alterTable('users', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function(knex) {
    return knex.alterTable('users', table => {
        table.dropClumn('deletedAt')
    })
};