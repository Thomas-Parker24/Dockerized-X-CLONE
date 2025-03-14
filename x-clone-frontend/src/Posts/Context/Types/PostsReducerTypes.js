export const PostReducerTypes = {
  LoadPosts: '[Posts] Load',
  UpdateLastPostInfo: '[Posts] UpdateLastPostInfo',
  InsertCreatedPost: '[Posts] InsertCreatedPost',

  CloseTweetModal: '[Posts] CloseTweetModal',
  OpenTweetModal: '[Posts] OpenTweetModal',

  updateLastPostInfoFollowing: '[Posts] UpdateLastPostInfoFollowing',
  loadPostsFollowing: '[Posts] LoadPostsFollowing',

  UpdateLastPostInfoCreatedByUser:
    '[Posts] UpdateLastPostInfoCreatedByUserName',
  LoadPostsCreatedByUser: '[Posts] LoadPostsCreatedByUserName',
  ClearPostsCreatedByUser: '[Posts] ClearPostsCreatedByUser',
};
