import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { persistStore, autoRehydrate } from 'redux-persist'

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
)
/* eslint-enable */

persistStore(store)

export default store