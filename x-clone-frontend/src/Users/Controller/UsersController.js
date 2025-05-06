import axios from 'axios';
import { APIURI } from '../../Common/Constants';

export async function CreateUser(userData) {
  try {
    if (!userData.Name) throw new Error('Name is empty.');
    if (!userData.UserName) throw new Error('User Name is empty.');
    if (!userData.Email) throw new Error('Email is empty.');
    if (!userData.PassWord) throw new Error('Password is empty.');
    if (!userData.Description) throw new Error('Description is empty.');
    if (!userData.PhotoURL) throw new Error('Photo is empty');

    const result = await axios.post(`${APIURI}/api/v1/User`, {
      headers: {
        'Content-Type': 'application/json',
      },

      Name: userData.Name,
      UserName: userData.UserName,
      Email: userData.Email,
      PassWord: userData.PassWord,
      Description: userData.Description,
      Photo: userData.PhotoURL,
    });

    return { ok: true, Token: result.data?.AccessToken };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}

export async function GetUserDataByUID(UserUID) {
  try {
    if (!UserUID) throw new Error('UserUID is empty.');

    const result = await axios.get(`${APIURI}/api/v1/User`, {
      headers: {
        authorization: UserUID,
        'Content-Type': 'application/json',
      },
    });

    return result;
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}

export const getUserByUserName = async (userUID, userName) => {
  try {
    if (!userUID) throw new Error('userUID is empty.');
    if (!userName) throw new Error('userName is empty.');

    const result = await axios.get(
      `${APIURI}/api/v1/User/userName/${userName}`,
      {
        headers: {
          authorization: userUID,
          'Content-Type': 'application/json',
        },
      }
    );

    return result;
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

export async function GetFollowers(Token, UserName) {
  try {
    if (!Token) throw new Error('Token is empty.');
    if (!UserName) throw new Error('User Name is empty.');

    const result = await axios.get(
      `${APIURI}/api/v1/User/Followers/${UserName}`,
      {
        headers: {
          authorization: Token,
          'Content-Type': 'application/json',
        },
      }
    );

    return { ok: true, data: result.data.data.followers };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}

export async function GetFollowed(Token, TargetUserName) {
  try {
    if (!Token) throw new Error('Token is empty.');
    if (!TargetUserName) throw new Error('UserName is empty.');

    const result = await axios.get(
      `${APIURI}/api/v1/User/Followed/${TargetUserName}`,
      {
        headers: {
          authorization: Token,
          'Content-Type': 'application/json',
        },
      }
    );

    return { ok: true, data: result.data.data.followed };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}

export async function FollowUser(Token, FollowedID) {
  try {
    if (!Token) throw new Error('Token is empty.');
    if (!FollowedID) throw new Error('FollowedID is empty.');

    await axios.post(
      `${APIURI}/api/v1/User/Follow`,
      {
        followedUid: FollowedID,
      },
      {
        headers: {
          authorization: Token,
          'Content-Type': 'application/json',
        },
      }
    );

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}

export async function UnfollowUser(Token, FollowerUID) {
  try {
    if (!Token) throw new Error('Token is empty.');
    if (!FollowerUID) throw new Error('FollowerUID is empty.');

    await axios.post(
      `${APIURI}/api/v1/User/UnFollow`,
      {
        followedUid: FollowerUID,
      },
      {
        headers: {
          authorization: Token,
          'Content-Type': 'application/json',
        },
      }
    );

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}
