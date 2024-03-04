import axios from 'axios'
import {UserModel} from './_models'
import {API_URL} from '../../../urls'

// const API_URL = "https://app.sipconsult.net/hrwebapi/api/Users"

// const API_URL = process.env.REACT_APP_API_URL

// export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/ `
export const LOGIN_URL = `${API_URL}/lawtrustauth`
// export const REGISTER_URL = `${API_URL}/register`
// export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post(LOGIN_URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post('', {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>('', {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>('', {
    jwtToken: token,
  })
}

export function parseJwt(token: string) {
  if (!token) {
    return
  }

  const parts: string[] = token?.split('.')
  if (parts.length !== 3) {
    throw new Error('JWT must have 3 parts')
  }
  const header = JSON.parse(window.atob(parts[0]))
  const payload = JSON.parse(window.atob(parts[1]))
  return {
    header,
    payload,
  }
}
