import React from 'react'
import App from './components/App'
import {hydrate} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import storeFactory from './store/index'
import { Provider } from 'react-redux'
import {render} from 'react-dom'
import {checkCookie} from './store/index'

// checkCookie()
const store = storeFactory()
// checkCookie()

window.React = React
window.store = store


render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-container')
)
