exports.up = function(knex) {
    return knex.schema.alterTable('report', table => {
        table.string('logradouro')
        table.integer('numero')
        table.string('bairro')
        table.string('cidade')
        table.string('uf')
    })
};

exports.down = function(knex) {
    return knex.table('report', table => {
        table.dropClumn('logradouro')
        table.dropClumn('numero')
        table.dropClumn('bairro')
        table.dropClumn('cidade')
        table.dropClumn('uf')
    })
};