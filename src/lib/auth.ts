'use client';

import { User } from '@/@types/auth';
import Cookies from 'js-cookie';

export function saveSession(token: string, user: User) {
  Cookies.set('token', token, { expires: 7, secure: true });
  Cookies.set('user', JSON.stringify(user), { expires: 7, secure: true });
}

export function getSession() {
  const token = Cookies.get('token');
  const user = Cookies.get('user');
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
}


export function clearSession() {
  Cookies.remove('token');
  Cookies.remove('user');
  window.location.href = '/login';
}