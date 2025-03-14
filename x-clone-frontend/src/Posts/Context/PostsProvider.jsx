import { PostReducerTypes } from './Types/index.js';
import { useReducer } from 'react';
import { PostsReducer } from './Reducers/index.js';
import { PostsContext } from './PostsContext.jsx';
import {
  GetAllPosts,
  getPostsCreatedByFollowingUsers,
  GetPostsCreatedByUserName,
} from '../Controller/index.js';

const InialState = {
  posts: [],
  postsFollowing: [],
  postsCreatedByUser: [],
  LastPostInfo: {
    _id: undefined,
    createdAt: undefined,
  },
  lastPostInfoFollowing: {
    _id: undefined,
    createdAt: undefined,
  },
  LastPostInfoCreatedByUser: {
    _id: undefined,
    createdAt: undefined,
  },
  ModalIsOpen: false,
};

export const PostsProvider = ({ children }) => {
  const [PostsState, dispatch] = useReducer(PostsReducer, InialState);

  function UpdateLastPostInfo(_id, CreatedAt) {
    const payload = { _id, CreatedAt };
    const action = { type: PostReducerTypes.UpdateLastPostInfo, payload };
    dispatch(action);
  }

  function InsertCreatedPost(Post) {
    const payload = Post;
    const action = { type: PostReducerTypes.InsertCreatedPost, payload };
    dispatch(action);
  }

  async function GetPosts(Token) {
    const RequestResult = await GetAllPosts(
      Token,
      PostsState?.LastPostInfo?._id,
      PostsState?.LastPostInfo?.createdAt
    );
    if (!RequestResult.ok) return false;
    const payload = RequestResult.response.data?.posts;
    const action = { type: PostReducerTypes.LoadPosts, payload };
    dispatch(action);
    UpdateLastPostInfo(
      RequestResult.response.data?.lastPostInfo?.id,
      RequestResult.response.data?.lastPostInfo?.CreatedDateTime
    );
    return { ok: true, resposeLength: RequestResult.response.data?.length };
  }

  function UpdateLastPostInfoFollowing(_id, createdAt) {
    const payload = { _id, createdAt };
    const action = {
      type: PostReducerTypes.updateLastPostInfoFollowing,
      payload,
    };
    dispatch(action);
  }

  const getPostsByFollowingUsers = async (token) => {
    const requestRes = await getPostsCreatedByFollowingUsers(
      token,
      PostsState?.lastPostInfoFollowing?._id,
      PostsState?.lastPostInfoFollowing?.createdAt
    );
    if (!requestRes.ok) return false;
    const payload = requestRes.response.data?.posts;
    const action = { type: PostReducerTypes.loadPostsFollowing, payload };
    dispatch(action);
    UpdateLastPostInfoFollowing(
      requestRes.response.data?.lastPostInfoFollowing?.id,
      requestRes.response.data?.lastPostInfoFollowing?.createdDateTime
    );
    return { ok: true, resposeLength: requestRes.response.data?.length };
  };

  function UpdateLastPostInfoCreatedByUser(_id, createdAt) {
    const payload = { _id, createdAt };
    const action = {
      type: PostReducerTypes.UpdateLastPostInfoCreatedByUser,
      payload,
    };
    dispatch(action);
  }

  async function GetPostsCreatedByUser(Token, UserName) {
    const requestRes = await GetPostsCreatedByUserName(
      Token,
      UserName,
      PostsState?.LastPostInfoCreatedByUser?._id,
      PostsState?.LastPostInfoCreatedByUser?.createdAt
    );

    if (!requestRes.ok) {
      console.error(requestRes.response);
      return false;
    }

    const payload = requestRes.response?.posts;
    const action = { type: PostReducerTypes.LoadPostsCreatedByUser, payload };
    dispatch(action);
    UpdateLastPostInfoCreatedByUser(
      requestRes.response?.lastPostInfo?.id,
      requestRes.response?.lastPostInfo?.createdDateTime
    );
    return { ok: true, resposeLength: requestRes.response?.length };
  }

  function ClearPostsCreatedByUser() {
    dispatch({ type: PostReducerTypes.ClearPostsCreatedByUser });
  }

  function CloseModal() {
    dispatch({ type: PostReducerTypes.CloseTweetModal });
  }

  function OpenModal() {
    dispatch({ type: PostReducerTypes.OpenTweetModal });
  }

  return (
    <PostsContext.Provider
      value={{
        ...PostsState,
        InsertCreatedPost,
        GetPosts,
        getPostsByFollowingUsers,
        GetPostsCreatedByUser,
        ClearPostsCreatedByUser,
        CloseModal,
        OpenModal,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
