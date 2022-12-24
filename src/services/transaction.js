import http from 'src/helpers/http'

export const getAllTransaction = () => {
  return http().get('/transaction')
}
