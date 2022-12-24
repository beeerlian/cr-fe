import http from 'src/helpers/http'

export const getUsers = () => {
  return http().get('/user')
}
