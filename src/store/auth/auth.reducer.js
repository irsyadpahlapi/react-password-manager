import { REGISTER, SIGN_IN } from './auth.type'

const initialState = {
  email: '',
  password: '',
  userId: '',
  isLogin: false
}

const reducers = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER:
      return {
        email: action.email,
        userId: action.userId,
        password: action.password,
        isLogin: true
      }
    case SIGN_IN:
      return {
        email: action.email,
        userId: action.userId,
        password: action.password,
        isLogin: true
      }
    default:
      return state
  }
}

export default reducers
