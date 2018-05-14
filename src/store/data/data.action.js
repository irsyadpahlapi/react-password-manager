import { db } from '../../firebase/firebase'

export const adddata = (payload) => {
  return dispatch => {
    dispatch(loadHeroLoading())
    let obj = {
      id: Date.now(),
      email: payload.url,
      password: payload.password,
      userid: payload.userid,
      createdAt: Date.now(),
      updateAt: Date.now()
    }
    db.ref('/listpassword').push(obj)
    dispatch(showdatas(payload.userid))
    dispatch(tambahdata(obj))
  }
}

export const showdatas = (payload) => {
  return dispatch => {
    let datas = []
    dispatch(loadHeroLoading())
    db.ref(`/listpassword`).once('value', function (snapshot) {
      snapshot.forEach(function(element) {
          if (element.val().userid === payload){
            datas.push({
              id:element.val().id,
              email:element.val().email,
              password:element.val().password,
              updateAt:element.val().updateAt,
              createdAt:element.val().createdAt,
              key:element.key
            })
          }
      });
      dispatch(showdata(datas))
    })
  }
}

export const clears = (payload) => {
  return dispatch => {
    dispatch(clear())
  }
}

const tambahdata = (payload) => {
  return {
    type: 'ADD_DATA',
    payload
  }
}
const clear = () => {
  return {
    type: 'CLEAR'
  }
}
const showdata = (payload) => {
  return {
    type: 'SHOW_DATA',
    payload:payload
  }
}

const loadHeroLoading = () => ({
  type: 'SHOW_DATA_LOADING'
})

const loadHeroError= () => ({
  type: 'SHOW_DATA_ERROR'
})
