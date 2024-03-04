export interface AuthModel {
  jwtToken: string
  refreshToken?: string
}

export interface UserModel {
  id: string
  aud?: string
  exp?: number
  Email: string
  firstName?: string
  surname?: string
  username?: string
  gender?: string
}
