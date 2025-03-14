import { PostReducerTypes } from '../Types';

export const PostsReducer = (state = {}, action) => {
  switch (action.type) {
    case PostReducerTypes.ClearPostsCreatedByUser:
      return {
        ...state,
        postsCreatedByUser: [],
        LastPostInfoCreatedByUser: {
          _id: undefined,
          createdAt: undefined,
        },
      };

    case PostReducerTypes.UpdateLastPostInfoCreatedByUser:
      return {
        ...state,
        LastPostInfoCreatedByUser: {
          _id: action.payload._id,
          createdAt: action.payload.createdAt,
        },
      };

    case PostReducerTypes.UpdateLastPostInfo:
      return {
        ...state,
        LastPostInfo: {
          _id: action.payload._id,
          createdAt: action.payload.CreatedAt,
        },
      };

    case PostReducerTypes.LoadPosts:
      return {
        ...state,
        posts: [
          ...new Map(
            [...(state.posts || []), ...action.payload].map((post) => [
              post._id,
              post,
            ])
          ).values(),
        ],
      };

    case PostReducerTypes.LoadPostsCreatedByUser:
      return {
        ...state,
        postsCreatedByUser: [
          ...new Map(
            [...(state.postsCreatedByUser || []), ...action.payload].map(
              (post) => [post._id, post]
            )
          ).values(),
        ],
      };

    case PostReducerTypes.InsertCreatedPost:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case PostReducerTypes.CloseTweetModal:
      return {
        ...state,
        ModalIsOpen: false,
      };

    case PostReducerTypes.OpenTweetModal:
      return {
        ...state,
        ModalIsOpen: true,
      };

    case PostReducerTypes.updateLastPostInfoFollowing:
      return {
        ...state,
        lastPostInfoFollowing: {
          _id: action.payload._id,
          createdAt: action.payload.createdAt,
        },
      };

    case PostReducerTypes.loadPostsFollowing:
      return {
        ...state,
        postsFollowing: [
          ...new Map(
            [...(state.postsFollowing || []), ...action.payload].map((post) => [
              post._id,
              post,
            ])
          ).values(),
        ],
      };
  }
};
