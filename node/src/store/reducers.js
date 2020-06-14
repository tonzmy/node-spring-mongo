import C from '../constants'
import {compareOptions, combineCommonItems} from '../lib/helpers'
import {v4} from 'uuid'


export const isLogin = (state=null, action = {type: null}) => {
  switch (action.type) {
    case C.LOGIN:
      return action.isLogin
    case C.LOGOUT:
      return action.isLogin
    default:
      return state
  }
}

export const products = (state=[], action={type: null}) => {
  switch(action.type) {
    default:
      return state
  }
}

// item in bag
// const item = (state={}, action={type: null}) => {
//   switch (action.type) {
//     case C.ADD_TO_BAG:
//       return {
//         id: action.id,
//         name: action.name,
//         quantity: action.quantity,
//         size: action.size,
//         options: action.options
//       }
//   }
// }
//
// export const bag = (state=[], action={type: null}) => {
//   switch(action.type) {
//
//   }
// }

const favoriate = (state = {}, action={type: null}) => {
  switch (action.type) {
    case C.ADD_TO_FAVORIATES:
      return {
        id: action.id,
        name: action.name,
        category: action.category
      }
    default:
      return state
  }
}

export const favoriates = (state=[], action={type: null}) => {
  switch(action.type) {
    case C.ADD_TO_FAVORIATES:
      if (state.filter(c => (''+c.id) == (''+action.id)).length != 0) {
        return state
      } else {
        return [...state, favoriate({}, action)]
      }
    case C.REMOVE_FROM_FAVORIATES:
      return state.filter(
        c => c.id != action.id
      )
    default:
      return state
  }
}

const bagItem = (state={}, action={type: null}) => {
  switch(action.type) {
    case C.ADD_TO_BAG:
      return {
        uuid: v4(),
        id: action.id,
        name: action.name,
        quantity: action.quantity,
        size: action.size,
        options: action.options
      }
    case C.UPDATE_BAG:
      return (state.uuid != action.uuid) ?
      state:
      {
        ...state,
        quantity: action.quantity,
        size: action.size,
        options: action.options
      }
    default:
      return state
  }
}

export const bag = (state = [], action={type: null}) => {
  switch(action.type) {
    case C.ADD_TO_BAG:
      if (state.filter(c => (
        (''+c.id == ''+action.id)
        && (''+c.size == ''+action.size)
        && (compareOptions(c.options, action.options))
      )).length != 0) {
        return state.map((item) =>
        (''+item.id == ''+action.id) ?
        {...item, quantity: item.quantity + action.quantity} :
        item
      )
    } else {
      return [...state, bagItem({}, action)]
    }
    case C.REMOVE_FROM_BAG:
      return state.filter(c => c.uuid != action.uuid)
    case C.UPDATE_BAG:
      state = state.map(s => bagItem(s, action))
      return combineCommonItems(state)
    default:
      return state
  }
}

// return state.filter(c => (
//   (''+c.id != ''+action.id)
//   && (''+c.size != ''+action.size)
//   && (!compareOptions(c.options, action.options))
// ))
