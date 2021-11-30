/* eslint-disable global-require */
const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const FriendRequest = require('./FriendRequest');

    return {
      senderFriendRequests: {
        relation: Model.HasManyRelation,
        modelClass: FriendRequest,
        join: {
          from: 'users.id',
          to: 'friend_requests.sender_id',
        },
      },
      receiverFriendRequests: {
        relation: Model.HasManyRelation,
        modelClass: FriendRequest,
        join: {
          from: 'users.id',
          to: 'friend_requests.receiver_id',
        },
      },
      meSendRequest: {
        relation: Model.HasOneRelation,
        modelClass: FriendRequest,
        join: {
          from: 'users.id',
          to: 'friend_requests.sender_id',
        },
      },
      meReceiveRequest: {
        relation: Model.HasOneRelation,
        modelClass: FriendRequest,
        join: {
          from: 'users.id',
          to: 'friend_requests.receiver_id',
        },
      },
    };
  }

  static async hasEmail(email) {
    const user = await this.query().findOne({ email });

    if (user) {
      return true;
    }

    return false;
  }

  static async hasMssv(mssv) {
    const user = await this.query().findOne({ mssv });

    if (user) {
      return true;
    }

    return false;
  }
}

module.exports = User;
