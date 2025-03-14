import axios from 'axios';

export async function CreatePost(Content, UserUID) {
  try {
    if (!Content) throw new Error('Content is empty.');
    if (!UserUID) throw new Error('UserUID is empty.');
    const result = await axios.post(
      'http://localhost:1234/api/v1/posts',
      {
        content: Content,
      },
      {
        headers: {
          authorization: UserUID,
          'Content-Type': 'application/json',
        },
      }
    );

    return { ok: result.data.ok, data: result.data.data };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}

export async function GetAllPosts(Token, LastPostID, LastPostCreatedAt) {
  try {
    if (!Token) throw new Error('Token is empty.');

    const result = await axios.get('http://localhost:1234/api/v1/Posts/all', {
      headers: {
        authorization: Token,
        'Content-Type': 'application/json',
      },
      params: {
        LastPostID,
        LastPostCreatedAt,
      },
    });

    return { ok: true, response: result };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}

export const getPostById = async (token, postUID) => {
  try {
    if (!token) throw new Error('Token is empty.');
    if (!postUID) throw new Error('postUID is empty.');

    const result = await axios.get(
      `http://localhost:1234/api/v1/Posts/${postUID}`,
      {
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );

    if (result.data.data === undefined) throw new Error('Data is empty');

    return { ok: true, response: result.data.data };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

export const getPostsCreatedByFollowingUsers = async (
  token,
  lastPostIdFollowing,
  lastPostCreatedAtFollowing
) => {
  try {
    const result = await axios.get(
      'http://localhost:1234/api/v1/posts/following',
      {
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
        },
        params: {
          lastPostIdFollowing,
          lastPostCreatedAtFollowing,
        },
      }
    );
    return { ok: true, response: result };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

export async function GetPostsCreatedByUserName(
  Token,
  UserName,
  LastPostID,
  LastPostCreatedAt
) {
  try {
    if (!Token) throw new Error('Token is empty.');
    if (!UserName) throw new Error('User Name is empty.');

    const result = await axios.get(
      `http://localhost:1234/api/v1/Posts/User/${UserName}`,
      {
        headers: {
          authorization: Token,
          'Content-Type': 'application/json',
        },
        params: {
          lastPostId: LastPostID,
          lastPostCreatedAt: LastPostCreatedAt,
        },
      }
    );

    return { ok: true, response: result.data };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}
