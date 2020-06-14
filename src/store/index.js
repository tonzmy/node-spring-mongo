import {createStore, combineReducers, applyMiddleware} from 'redux'
import {isLogin, products, favoriates, bag} from './reducers'
import stateData from '../data/initialState'
import thunk from 'redux-thunk'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const logger = store => next => action => {
  if (action.type) {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log("prev state", store.getState())
    console.log("action", action)
    result = next(action)
    console.log("next state", store.getState())
    console.groupEnd()
    return result
  } else {
    return next(action)
  }
}

export const checkCookie = () => {
  if (cookies.get("_uuid") !== null && cookies.get("_uuid") !== undefined) {
    let isLogin = cookies.get("_uuid")
    initialState = {...initialState, isLogin}
  }
}

// const saver = store => next => action => {
//   let result = next(action)
//   let name = "redux-store"
//   cookies.set(name, JSON.stringify(store.getState()), {path: '/'})
//   // localStorage['redux-store'] = JSON.stringify(store.getState())
//   return result
// }

const saver = store => next => action => {
  let result = next(action)
  let name = "redux-store"
  // cookies.set(name, JSON.stringify(store.getState()), {path: '/'})
  localStorage['redux-store'] = JSON.stringify(store.getState())
  return result
}

// const storeFactory = (initialState = initialState) =>
//   applyMiddleware(...[logger, saver, thunk])(createStore)(
//     combineReducers({isLogin}),
//       (cookies.get("redux-store") !== null && cookies.get("redux-store") !== undefined) ?
//       JSON.parse(JSON.stringify(cookies.get("redux-store"))) :
//       initialState
//   )

const getState = (initialState) => {
  let state;
  if (localStorage['redux-store']) {
    state = JSON.parse(localStorage['redux-store'])
  } else {
    state = initialState
  }
  if (cookies.get("_uuid") !== null && cookies.get("_uuid") !== undefined) {
    const status = cookies.get("_uuid")
    state = {...state, isLogin: status}
  }
  return state
}


  // const status = cookies.get("_uuid")
  // // BUG FIXED: inital state can be loaded (name the import file as different name)
  // const storeFactory = (initialState = stateData) =>
  //   applyMiddleware(...[logger, thunk])(createStore)(
  //     combineReducers({isLogin, products, favoriates}),
  //       (cookies.get("_uuid") !== null && cookies.get("_uuid") !== undefined) ?
  //         ({...initialState, isLogin: status}) :
  //         initialState
  //   )


  // BUG FIXED: inital state can be loaded (name the import file as different name)
  const storeFactory = (initialState = stateData) =>
    applyMiddleware(...[logger, saver, thunk])(createStore)(
      combineReducers({isLogin, products, favoriates, bag}),
        getState(initialState)
    )

export default storeFactory
