import {connect} from 'react-redux'
import {findById} from '../lib/helpers'
import LoginUI from './ui/LoginUI'
import HomeUI from './ui/HomeUI'
import MenuUI from './ui/MenuUI'
import TeaUI from './ui/TeaUI'
import DetailUI from './ui/DetailUI'
import FavoriatesUI from './ui/FavoriatesUI'
import BagUI from './ui/BagUI'
import {onLogin, onLogout, onAddToFavoriates, onRemoveFromFavoriates, onAddToBag, onUpdateBag, onRemoveFromBag} from '../actions'
import {loadProductTypes, loadProductsByType, fetchThenReturn} from '../lib/loadData'
import fetch from "isomorphic-fetch"

export const userLogin = connect(
  ({isLogin}) => ({
    status: isLogin
  }),
  dispatch => ({
    onUserLogin(username, password) {
      dispatch(onLogin(username, password))
    }
  })
)(LoginUI)

// export const HomePage = connect(
//   ({isLogin, products}) => ({
//     status: isLogin,
//     products: products.map((product)=>Object.keys(product))
//   }),
//   dispatch => ({
//     onUserLogout() {
//       dispatch(onLogout())
//     }
//   })
// )(HomeUI)

export const HomePage = connect(
  ({isLogin}) => ({
    status: isLogin
  }),
  dispatch => ({
    onUserLogout() {
      dispatch(onLogout())
    }
  })
)(HomeUI)

export const MenuPage = connect(
  ({isLogin, products, favoriates, bag}, {selected})=> ({
    status: isLogin,
    selected: selected,
    favoriatesNumber: favoriates.length,
    bagNumber: bag.length
  }),
  dispatch => ({
    onUserLogout() {
      dispatch(onLogout())
    }
  })
)(MenuUI)

// export const MenuPage = connect(
//   ({isLogin, favoriates, bag}, {selected})=> ({
//     status: isLogin,
//     selected: selected,
//     products: loadProductTypes(),
//     favoriatesNumber: favoriates.length,
//     bagNumber: bag.length
//   }),
//   dispatch => ({
//     onUserLogout() {
//       dispatch(onLogout())
//     }
//   })
// )(MenuUI)

export const FavoriatesPage = connect(
  ({favoriates}) => ({
    favoriates: favoriates
  }),
  dispatch => ({
    onUserRemoveFromFavoriates(id) {
      dispatch(onRemoveFromFavoriates(id))
    }
  })
)(FavoriatesUI)

// export const TeaPage = connect(
//   ({isLogin, products, favoriates}) => ({
//     status: isLogin,
//     products: products.filter((product)=>Object.keys(product)[0] === "tea")[0]["tea"],
//     favoriates: favoriates.map(c=>''+c.id),
//     category: "tea"
//   }),
//   dispatch => ({
//     onUserAddToFavoriates(id, name) {
//       dispatch(onAddToFavoriates(id, name, "tea"))
//     },
//     onUserRemoveFromFavoriates(id) {
//       dispatch(onRemoveFromFavoriates(id))
//     }
//   })
// )(TeaUI)

export const TeaPage = connect(
  ({isLogin, favoriates}) => ({
    status: isLogin,
    favoriates: favoriates.map(c=>''+c.id),
    category: "tea"
  }),
  dispatch => ({
    onUserAddToFavoriates(id, name) {
      dispatch(onAddToFavoriates(id, name, "tea"))
    },
    onUserRemoveFromFavoriates(id) {
      dispatch(onRemoveFromFavoriates(id))
    }
  })
)(TeaUI)

// export const BubbleTeaPage = connect(
//   ({isLogin, products, favoriates}) => ({
//     status: isLogin,
//     products: products.filter((product)=>Object.keys(product)[0] === "bubble tea")[0]["bubble tea"],
//     favoriates: favoriates.map(c=>''+c.id),
//     category: "bubble-tea"
//   }),
//   dispatch => ({
//     onUserAddToFavoriates(id, name) {
//       dispatch(onAddToFavoriates(id, name, "bubble-tea"))
//     },
//     onUserRemoveFromFavoriates(id) {
//       dispatch(onRemoveFromFavoriates(id))
//     }
//   })
// )(TeaUI)

export const BubbleTeaPage = connect(
  ({isLogin, favoriates}) => ({
    status: isLogin,
    favoriates: favoriates.map(c=>''+c.id),
    category: "bubble-tea"
  }),
  dispatch => ({
    onUserAddToFavoriates(id, name) {
      dispatch(onAddToFavoriates(id, name, "bubble tea"))
    },
    onUserRemoveFromFavoriates(id) {
      dispatch(onRemoveFromFavoriates(id))
    }
  })
)(TeaUI)

// export const FruitTeaPage = connect(
//   ({isLogin, products, favoriates}) => ({
//     status: isLogin,
//     products: products.filter((product)=>Object.keys(product)[0] === "fruit tea")[0]["fruit tea"],
//     favoriates: favoriates.map(c=>''+c.id),
//     category: "fruit-tea"
//   }),
//   dispatch => ({
//     onUserAddToFavoriates(id, name) {
//       dispatch(onAddToFavoriates(id, name, "fruit-tea"))
//     },
//     onUserRemoveFromFavoriates(id) {
//       dispatch(onRemoveFromFavoriates(id))
//     }
//   })
// )(TeaUI)

export const FruitTeaPage = connect(
  ({isLogin, favoriates}) => ({
    status: isLogin,
    favoriates: favoriates.map(c=>''+c.id),
    category: "fruit-tea"
  }),
  dispatch => ({
    onUserAddToFavoriates(id, name) {
      dispatch(onAddToFavoriates(id, name, "fruit tea"))
    },
    onUserRemoveFromFavoriates(id) {
      dispatch(onRemoveFromFavoriates(id))
    }
  })
)(TeaUI)

// export const TeaDetailPage = connect(
//   ({products}, {match, location}) => ({
//     ...findById(products, match.params.id, location.pathname.split('/')[1].replace("-", " "))
//   }),
//   dispatch => ({
//     onUserAddToBag(id, name, quantity, size, options) {
//       dispatch(onAddToBag(id, name, quantity, size, options))
//     },
//     onUserRemoveFromBag(uuid) {
//       dispatch(onRemoveFromBag(uuid))
//     },
//     onUserUpdateBag(uuid, id, name, quantity, size, options) {
//       dispatch(onUpdateBag(uuid, id, name, quantity, size, options))
//     }
//   })
// )(DetailUI)

export const TeaDetailPage = connect(
  null,
  dispatch => ({
    onUserAddToBag(id, name, quantity, size, options) {
      dispatch(onAddToBag(id, name, quantity, size, options))
    },
    onUserRemoveFromBag(uuid) {
      dispatch(onRemoveFromBag(uuid))
    },
    onUserUpdateBag(uuid, id, name, quantity, size, options) {
      dispatch(onUpdateBag(uuid, id, name, quantity, size, options))
    }
  })
)(DetailUI)

export const BagPage = connect(
  ({bag}) => ({
    bag: bag
  }),
  dispatch => ({
    onUserRemoveFromBag(uuid) {
      dispatch(onRemoveFromBag(uuid))
    },
    onUserUpdateBag(uuid, id, name, quantity, size, options) {
      dispatch(onUpdateBag(uuid, id, name, quantity, size, options))
    }
  })
)(BagUI)
