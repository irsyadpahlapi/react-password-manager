import { REGISTER, SIGN_IN } from './auth.type'
import swal from 'sweetalert2'
import { auth } from '../../firebase/firebase'

export const Register = (payload) => {
  return dispatch => {
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        console.log(user)
        swal({
          position: 'center',
          type: 'success',
          title: 'Register Succes',
          showConfirmButton: false,
          timer: 1000
        })
        dispatch(register({userId: user.uid, email: user.email, password:payload.password}))
      })
      .catch(err => {
        console.log(err.message)
        swal({
          type: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
      })
  }
}

export const signIn = (payload) => {
  return dispatch => {
      auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          console.log(user)
          swal({
            position: 'center',
            type: 'success',
            title: 'Login Succes',
            showConfirmButton: false,
            timer: 1000
          })
          dispatch(signInUser({userId: user.uid, email: user.email, password:payload.password}))
        })
        .catch(err => {
          console.log(err.message)
          swal({
            type: 'error',
            title: 'Oops...',
            text: `${err.message}`,
          })
        })
  }
}

const register = (payload) => {
  return {
    type: REGISTER,
    ...payload
  }
}

const signInUser = (payload) => {
  return {
    type: SIGN_IN,
    ...payload
  }
}
