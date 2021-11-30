const { Model } = require('objection');

class Comment extends Model {
  static get tableName() {
    return 'comments';
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const User = require('./User');

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'comments.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Comment;
