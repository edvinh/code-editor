/**
 * These action creators do not modify the redux store in any way
 * since the socket data isn't connected to the redux store.
 *
 * The action creators are only used for dispatching action types
 * for a clearer view of what is going on in the application (e.g. when using redux devtools).
 */

import * as io from '../socket'
import * as types from '../constants'

io.connectSocket()

export function subscribeToJoin (callback) {
  return (dispatch) => {
    dispatch({
      type: types.SOCKET_JOIN_SUBSCRIBE,
    })

    io.subscribeToJoin((team) => {
      dispatch({
        type: types.SOCKET_JOIN,
      })
      callback(team)
    })
  }
}

export function subscribeToCompileError (callback) {
  return (dispatch) => {
    dispatch({
      type: types.SOCKET_COMPILE_ERROR_SUBSCRIBE,
    })

    io.subscribeToCompileError((team) => {
      dispatch({
        type: types.SOCKET_COMPILE_ERROR,
      })
      callback(team)
    })
  }
}

export function subscribeToBeverageFinish (callback) {
  return (dispatch) => {
    dispatch({
      type: types.SOCKET_BEVERAGE_FINISH_SUBSCRIBE,
    })

    io.subscribeToBeverageFinish((team) => {
      dispatch({
        type: types.SOCKET_BEVERAGE_FINISH,
      })
      callback(team)
    })
  }
}
