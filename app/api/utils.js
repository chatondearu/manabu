import _ from 'lodash'

const trackAPI = (resp) => {
  console.log({response: _.omit(resp, ['body', 'data'])})
}

const genTimeout = () => {
  return _.random(0, 500)
}

export {
  trackAPI,
  genTimeout
}
