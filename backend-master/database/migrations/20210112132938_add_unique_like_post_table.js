exports.up = async (knex) => {
  await knex.schema.alterTable('like_post', (table) => {
    table.unique(['post_id', 'user_id']);
  });
};

exports.down = async () => {
};
