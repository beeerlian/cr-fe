import http from 'src/helpers/http'

export const getAllItem = () => {
  return http().get('/item')
}
