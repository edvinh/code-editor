import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
