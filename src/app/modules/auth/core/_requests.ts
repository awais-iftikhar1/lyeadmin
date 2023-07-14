import axios from 'axios';
import { API_URL } from '../../../config/constants/endpoints';
import { AuthModel, UserModel } from './_models';

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/admin/details`
// export const LOGIN_URL = `${API_URL}admin/login`;
export const LOGIN_URL = `${API_URL}employee/adminLogin`;

export const REGISTER_URL = `${API_URL}register`;
export const REQUEST_PASSWORD_URL = `${API_URL}admin/forget-password`;

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    token: token,
  });
}
