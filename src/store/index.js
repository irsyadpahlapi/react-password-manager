import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Auth from './auth/auth.reducer'
import Password from './password/password.reducer'
import data from './data/data'

const reducers = combineReducers({
  auth: Auth,
  password: Password,
  data: data
})

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk))

export default store;
