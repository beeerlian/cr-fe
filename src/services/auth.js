import http from 'src/helpers/http'

export const login = (body) => {
  const data = new URLSearchParams(body)
  return http().post('/login', data.toString())
}

export const register = (body) => {
  const data = new URLSearchParams(body)
  return http().post('/register', data.toString())
}
