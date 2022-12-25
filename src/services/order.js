import http from 'src/helpers/http'

export const getAllOrder = () => {
  return http().get('/order')
}

export const createOrder = (data) => {
  const body = new URLSearchParams(data)
  return http().post('/order', body.toString())
}
