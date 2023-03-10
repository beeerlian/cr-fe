import http from 'src/helpers/http'

export const getAllTransaction = () => {
  return http().get('/transaction')
}

export const getTransactionById = (id) => {
  return http().get('/transaction/' + id)
}

export const createTransaction = (data) => {
  const body = new URLSearchParams(data)
  return http().post('/transaction', body.toString())
}
