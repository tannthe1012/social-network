exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email', 127).collate('latin1_general_ci').notNullable();
    table.string('full_name', 127).collate('utf8_general_ci').notNullable();
    table.string('mssv', 127).notNullable();
    table.string('password', 127).collate('latin1_general_ci');

    table.tinyint('gender', 1).unsigned().notNullable();
    table.date('birthday');
    table.string('province', 63).collate('utf8_general_ci');
    table.string('district', 63).collate('utf8_general_ci');
    table.tinyint('status', 1).unsigned().notNullable();

    table.string('avatar_name', 255).collate('utf8_general_ci');
    table.string('slogan', 255).collate('utf8_general_ci');
    table.string('location', 255).collate('utf8_general_ci');

    table.timestamps(true, true);

    table.unique(['email'], 'email');
    table.unique(['mssv'], 'mssv');

    table.index('email');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
