import { ADD_PASSWORD_READY } from './password.type'

export const passready = (payload) => {
  return dispatch => {
    dispatch(passwordready())
  }
}

const passwordready = (payload) => {
  return {
    type: ADD_PASSWORD_READY
  }
}
