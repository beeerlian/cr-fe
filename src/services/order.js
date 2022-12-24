import http from 'src/helpers/http'

export const getAllOrder = () => {
  return http().get('/order')
}
