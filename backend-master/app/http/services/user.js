const { transaction } = require('objection');

const { User, Post, FriendRequest } = require('../../models');
const { abort } = require('../../helpers/error');
const { getPresignedImageUrl } = require('../../helpers/image');
const postStatusEnum = require('../../enums/postStatus');
const postTypeEnum = require('../../enums/postType');

exports.getMyInformation = async (userId) => {
  const userInfo = await User
    .query()
    .findById(userId);

  if (!userInfo) return abort(400, 'User not found');

  const coverLink = userInfo.cover_name ? userInfo.cover_name : process.env.AWS_DEFAULT_COVER;
  const avatarLink = userInfo.avatar_name ? userInfo.avatar_name : process.env.AWS_DEFAULT_AVATAR;
  userInfo.cover_name = getPresignedImageUrl(coverLink);
  userInfo.avatar_name = getPresignedImageUrl(avatarLink);

  return userInfo;
};

exports.updateAvatar = async ({ userId, mainAvatar }) => {
  try {
    await transaction(User, Post, async (UserTrx, PostTrx) => {
      await UserTrx.query().findById(userId)
        .patch({
          avatar_name: mainAvatar,
        });
      await PostTrx.query().insert({
        user_id: userId,
        type: postTypeEnum.PUBLIC,
        status: postStatusEnum.OPEN,
        image_name: mainAvatar,
      });
    });
  } catch (error) {
    abort(500, 'Cannot update your avatar');
  }
};

exports.getUserInformation = async ({ userId, myId }) => {
  const userInfo = await User
    .query()
    .findById(userId);

  if (!userInfo) return abort(400, 'User not found');

  const friendStatus = await FriendRequest.query()
    .where((builder) => builder.where('sender_id', userId).where('receiver_id', myId))
    .orWhere((builder) => builder.where('sender_id', myId).where('receiver_id', userId))
    .first();

  const coverLink = userInfo.cover_name ? userInfo.cover_name : process.env.AWS_DEFAULT_COVER;
  const avatarLink = userInfo.avatar_name ? userInfo.avatar_name : process.env.AWS_DEFAULT_AVATAR;
  userInfo.cover_name = getPresignedImageUrl(coverLink);
  userInfo.avatar_name = getPresignedImageUrl(avatarLink);

  return {
    ...userInfo, friendStatus,
  };
};

exports.getUserPosts = async ({
  userId, limit, offset, myId,
}) => {
  const posts = await Post.query()
    .where({ user_id: userId })
    .andWhereNot('status', postStatusEnum.CLOSED)
    .andWhereNot('type', postTypeEnum.PRIVATE)
    .withGraphFetched('likes')
    .modifyGraph('likes', (builder) => {
      builder.whereNot('user_id', myId).select('id', 'type');
    })
    .withGraphFetched('likes.user')
    .modifyGraph('likes.user', (builder) => {
      builder.select('id', 'full_name');
    })
    .withGraphFetched('me')
    .modifyGraph('me', (builder) => {
      builder.where('user_id', myId).select('id', 'type');
    })
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc');

  const response = posts.map((post) => {
    let imgSign = null;
    if (post.image_name) {
      imgSign = getPresignedImageUrl(post.image_name);
    }
    return {
      ...post, image_name: imgSign,
    };
  });

  const userInfo = await this.getUserInfo(userId);

  return { data: response, userInfo };
};

exports.getUserInfo = async (userId) => {
  const userInfo = await User.query().findById(userId).select('id', 'full_name', 'avatar_name');

  if (!userInfo) abort('user not found');
  userInfo.avatar_name = getPresignedImageUrl(userInfo.avatar_name || process.env.AWS_DEFAULT_AVATAR);

  return userInfo;
};

exports.getUserList = async (userIds) => {
  const userInfos = await User.query().whereIn('id', userIds).select('id', 'full_name', 'avatar_name');

  const response = userInfos.map((user) => {
    const imgSign = getPresignedImageUrl(user.avatar_name || process.env.AWS_DEFAULT_AVATAR);

    return {
      ...user, avatar_name: imgSign,
    };
  });

  return response;
};
