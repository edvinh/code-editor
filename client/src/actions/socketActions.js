/**
 * These action creators do not modify the redux store in any way
 * since the socket data isn't connected to the redux store.
 *
 * The action creators are only used for dispatching action types
 * for a clearer view of what is going on in the application.
 */

import * as io from '../socket'
import * as types from '../constants'

io.connectSocket()

export function subscribeToJoin (callback) {
  return (dispatch) => {
    dispatch({
      type: types.SOCKET_JOIN,
    })

    io.subscribeToJoin(callback)
  }
}

export function subscribeToCompileError (callback) {
  return (dispatch) => {
    dispatch({
      type: types.SOCKET_COMPILE_ERROR,
    })

    io.subscribeToCompileError(callback)
  }
}

export function subscribeToBeverageFinish (callback) {
  return (dispatch) => {
    dispatch({
      type: types.SOCKET_BEVERAGE_FINISH,
    })

    io.subscribeToBeverageFinish(callback)
  }
}
