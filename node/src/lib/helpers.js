import {compose} from 'redux'

export const compareOptions = (oldOption, newOption) => {
  if (Object.keys(oldOption).length != Object.keys(newOption).length) {
    return false
  }
  else {
    for (let k in oldOption) {
      if (oldOption[k] != newOption[k]) {
        return false
      }
    }
    return true
  }
}

export const combineCommonItems = (state) => {
  let newState = []
  for (let i = 0; i < state.length; i++) {
    let iCur = state[i]
    if (newState.length == 0) {
      newState.push(iCur)
    } else {
    for (let j = 0; j < newState.length; j++) {
      let jCur = state[j]
      if (""+jCur.id == ""+iCur.id && ""+jCur.size == ""+iCur.size && compareOptions(jCur.options, iCur.options)) {
        jCur.quantity = parseInt(iCur.quantity) + parseInt(jCur.quantity)
      } else {
        newState.push(jCur)
      }
      }
    }
  }
  return newState
}



export const findById = (products, id, category) => {
  let productsByCategory = products.filter((product)=>Object.keys(product)[0] === category)[0][category]
  return productsByCategory.filter(item => item.id == id)[0]
}
