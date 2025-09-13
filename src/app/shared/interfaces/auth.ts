export interface Auth {
  name: string,
  email: string,
  password: string,
  rePassword: string,
  phone: string
}


export interface ResponseUser {
  message: string
  user: User
  token: string
}

export interface User {
  name: string
  email: string
  role: string
}

export interface ResponseForgetPassword {
  statusMsg: string,
  message: string
}

export interface ResponseResetCode {
  status: string,
}

export interface ResponseResetPassword {
  token: string
}
export interface ResetPassword {
  email: string,
  newPassword: string
}


