/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved, import/extensions
import { api } from './api';

interface SignInRequestProps {
  email: string;
  password: string;
  username: string;
}

interface SignUpRequestProps {
  name: string;
  username: string;
  email: string;
  password: string;
  biography: string;
}

interface SignInResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export async function SignInRequest(
  user: SignInRequestProps
): Promise<SignInResponse> {
  try {
    console.log('chegou aqui');
    const { data } = await api.post('/sessions/login', {
      email: user.email,
      username: user.username,
      password: user.password,
    });

    return {
      token: data.access_token,
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export async function SignUpRequest(user: SignUpRequestProps) {
  try {
    const { data } = await api.post('/sessions/signup', {
      email: user.email,
      name: user.name,
      password: user.password,
      username: user.username,
      passwordConfirmation: user.password,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function LogoutRequest(email: string) {
  try {
    await api.post('/sessions/logout', { email });
  } catch (error) {
    console.log(error);
  }
}

export async function GetUserData() {
  try {
    const { data } = await api.get('/users/profile');
    return data;
  } catch (error) {
    console.log(error);
  }
}
