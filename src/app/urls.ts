import axios from 'axios'

//base url for the api
export const SERVER = process.env.REACT_APP_BASE_URL
// export const SERVER = 'http://208.117.44.15'
// export const SERVER = 'https://app.sipconsult.net'
// export const SERVER = 'https://localhost:7144'

/*
 Use this file to define your base URLs whether on localhost or on the ENP server https://www.logoai.com/logo/1511251
 */
// Use this file to define your base URLs whether on localhost or on the server
//export const BASE_URL = 'https://app.sipconsult.net';
//export const BASE_URL = 'https://localhost:3000';
//export const API_URL = 'https://localhost:44371/api'
export const PIC_URL = 'https://app.sipconsult.net/newEgolfApi/uploads'
//export const PIC_URL='https://localhost:44371/uploads/'

export const API_URL = 'https://app.sipconsult.net/newEgolfApi/api'

export const registerApi = (data: any) => {
  return axios.post(`${API_URL}/lawtrustauth/register`, data)
}
export const loginApi = (data: any) => {
  return axios.post(`${API_URL}/lawtrustauth`, data)
}
export const allDocumentsApi = () => {
  return axios.get(`${API_URL}/lawtrust`)
}
export function putDescription(data: any) {
  return axios.put(`${API_URL}/lawtrust/${data?.id}`, data)
}

export const allHandBookApi = () => {
  return axios.get(`${API_URL}/lawtrust/handbook`)
}
export const posthandbookCategory = (data: any) => {
  return axios.post(`${API_URL}/lawtrust/handbook`, data)
}

export function putLawtrustCategory(data: any) {
  return axios.put(`${API_URL}/lawtrust/category/${data?.id}`, data)
}

export function deleteLawtrustCategory(id: any) {
  return axios.delete(`${API_URL}/lawtrust/category/${id}`)
}
export function deleteLawtrustDocument(id: any) {
  return axios.delete(`${API_URL}/lawtrust/document/${id}`)
}
