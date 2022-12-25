import http from 'src/helpers/http'

export const getAllItem = () => {
  return http().get('/item')
}

export const createItem = (data) => {
  const body = new URLSearchParams(data)
  return http().post('/item', body.toString())
}
