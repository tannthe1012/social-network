const { Message } = require('../app/models');
const { getUser, getUserData } = require('./user');

exports.newMessage = async ({ token, userId, message }) => {
  const me = await getUser(token);
  const user = getUserData(userId);
  if (!me) return false;

  try {
    await Message.query().insert({
      sender_id: me.id,
      receiver_id: userId,
      content: message,
    });

    if (user) {
      return { user, me, message };
    }

    return true;
  } catch (e) {
    return false;
  }
};
