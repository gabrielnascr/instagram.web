/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { toast } from 'react-toastify';

import { redirect } from 'next/dist/server/api-utils';
import Router from 'next/router';
import { GetUserData, SignInRequest, SignUpRequest } from '../services/auth';

type AuthProviderProps = {
  children: React.ReactNode;
};

interface User {
  name: string;
  username: string;
  email: string;
}

interface SignInRequestProps {
  email: string;
  username: string;
  password: string;
}

interface SignUpRequestProps {
  email: string;
  name: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface AuthContextType {
  user: User;
  isLoading: boolean;
  signIn: (data: SignInRequestProps) => Promise<void>;
  signUp: (data: SignUpRequestProps) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    const { '@instagram:token': storedToken } = parseCookies();
    const { '@instagram:user': storedUser } = parseCookies();

    if (storedToken && storedUser) {
      (async function () {
        await GetUserData().then((response) => {
          setUser(response);
        });
      })();
    }

    setIsLoading(false);
  }, []);

  async function signIn(data: SignInRequestProps) {
    await SignInRequest(data)
      .then(({ token, user }) => {
        setCookie(undefined, '@instagram.token', token, {
          maxAge: 60 * 60 * 24,
        });
        setCookie(undefined, '@instagram.user', JSON.stringify(user), {
          maxAge: 60 * 60 * 24,
        });

        toast('Você foi autenticado com sucesso', { type: 'success' });
      })
      .catch(() => {
        toast('Credenciais inválidas', { type: 'error' });
      });
  }

  async function signUp(data: any) {
    try {
      await SignUpRequest(data).then(() => {
        Router.push('/login');
        toast('Você foi cadastrado com sucesso.');
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('');
  }

  return context;
};

export { AuthProvider, useAuth };
