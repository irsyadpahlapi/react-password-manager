const initialState = {
  data : [],
  loading: false,
  error: false
}
const reducers = (state = {...initialState} , action) => {
  switch(action.type) {
    case 'ADD_DATA':
      return ({...state,
              data:[...state.data],
              loading:false})
    case 'SHOW_DATA':
      return ({...state,
              data:action.payload,
              loading:false})
    case 'SHOW_DATA_LOADING':
      return ({...state,loading:true})
    case 'SHOW_DATA_ERROR':
      return ({...state,error:false})
    case 'CLEAR':
      return ({...initialState})
    default:
      return state
  }
}

export default reducers
