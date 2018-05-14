import { ADD_PASSWORD_READY } from './password.type'

const initialState = {
  isReady: false
}

const reducers = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PASSWORD_READY:
      return {
        isLogin: true
      }
    default:
      return state
  }
}

export default reducers
