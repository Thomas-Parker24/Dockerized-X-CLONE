import axios from 'axios';
import { getEnvironments } from '../../Common/Functions';
const { API_URL } = getEnvironments();

export async function LogInWithUserName(UserName, PassWord) {
  try {
    if (!UserName) throw new Error('UserName is empty.');
    if (!PassWord) throw new Error('PassWord is empty.');

    const result = await axios.post(
      'http://localhost:80/api/v1/Auth/Session/UserName',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        UserName: UserName,
        passWord: PassWord,
      }
    );

    return {
      ok: true,
      Token: result.data.AccessToken,
      Photo: result.data.Photo,
      UserName: result.data.UserName,
      Name: result.data.Name,
    };
  } catch (error) {
    console.error(
      `[Server Error] status: ${
        error.response.status
      } payload: ${JSON.stringify(error.response.data)}`
    );

    console.log(error.response.data.errorDescription);

    return {
      ok: false,
      UserNotFound: error.response.data.errorDescription === 'User not found.',
    };
  }
}

export async function LogInWithEmail(Email, PassWord) {
  try {
    if (!Email) throw new Error('Email is empty.');
    if (!PassWord) throw new Error('PassWord is empty.');

    const result = await axios.post(
      'http://localhost:80/api/v1/Auth/Session/Email',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        email: Email,
        passWord: PassWord,
      }
    );

    return {
      ok: true,
      Token: result.data.AccessToken,
      Photo: result.data.Photo,
      UserName: result.data.UserName,
      Name: result.data.Name,
    };
  } catch (error) {
    console.error(
      `[Server Error] status: ${
        error.response.status
      } payload: ${JSON.stringify(error.response.data)}`
    );

    console.log(error.response.data.errorDescription);

    return {
      ok: false,
      UserNotFound: error.response.data.errorDescription === 'User not found.',
    };
  }
}

export async function LogOutUser(UID) {
  try {
    if (!UID) throw new Error('UID is empty.');

    await axios.delete('http://localhost:80/api/v1/Auth/Session', {
      headers: {
        authorization: UID,
        'Content-Type': 'application/json',
      },
    });

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}
