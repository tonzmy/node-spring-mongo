import fetch from 'isomorphic-fetch'
import C from "./constants"

const parseResponse = response => response.json()

const logError = error => console.log(error)

const logResult = result => {
  console.log(result)
  return result
}

const fetchThenDispatch = (dispatch, url, method, body) =>
  fetch(url, {method, body, headers: { 'Content-Type': 'application/json' }})
    .then(parseResponse)
    .then(logResult)
    .then(dispatch)
    .catch(logError)

export const onLogin = (username, password) => dispatch =>
  fetchThenDispatch(dispatch,
    '/api/login',
    'POST',
    JSON.stringify({username, password})
  )

// export default onLogout = () => ({
//   type: C.LOGOUT,
//   isLogin: false
// })

export const onLogout = () => dispatch =>
  fetchThenDispatch(dispatch,
    '/api/logout',
    'GET'
  )

// no need to post to server in "not login" state
export const onAddToFavoriates = (id, name, category) => ({
  type: C.ADD_TO_FAVORIATES,
  id,
  name,
  category
})

export const onRemoveFromFavoriates = (id) => ({
  type: C.REMOVE_FROM_FAVORIATES,
  id
})

export const onAddToBag = (id, name, quantity, size, options) => ({
  type: C.ADD_TO_BAG,
  id,
  name,
  quantity,
  size,
  options
})

export const onUpdateBag = (uuid, id, quantity, size, options) => ({
  type: C.UPDATE_BAG,
  uuid,
  id,
  quantity,
  size,
  options
})

// export const onRemoveFromBag = (id, size, options) => ({
//   type: C.REMOVE_FROM_BAG,
//   id,
//   size,
//   options
// })

export const onRemoveFromBag = (uuid) => ({
  type: C.REMOVE_FROM_BAG,
  uuid
})


// export const onAddToBag = (id, name, quantity, size) => dispatch =>
//   fetchThenDispatch(dispatch,
//     `/api/bag/${id}`,
//     'POST',
//     JSON.stringify({id, name, quantity, size})
//   )
//
// export const onRemoveFromFavoriates = (id) => dispatch =>
//   fetchThenDispatch(dispatch,
//     `/api/favoriates/${id}`,
//     'DELETE'
//   )
//
// export const onRemoveToBag = (id) => dispatch =>
//   fetchThenDispatch(dispatch,
//     `/api/bag/${id}`,
//     'DELETE'
//   )
//
// export const onUpdateBag = (id, quantity, size) => dispatch =>
//   fetchThenDispatch(dispatch,
//     `/api/bag/${id}`,
//     'PUT',
//     JSON.stringify({id, quantity, size})
//   )
