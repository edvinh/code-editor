import io from 'socket.io-client'

let socket = null

export function connectSocket () {
  if (!socket) {
    socket = io.connect('http://localhost:3001')
    return socket
  }
  return socket
}

export function subscribeToJoin (callback) {
  socket.on('join', ({ team }) => callback(team))
}

export function subscribeToCompileError (callback) {
  socket.on('compile error', ({ team }) => callback(team))
}

export function subscribeToBeverageFinish (callback) {
  socket.on('beverage finish', ({ team }) => callback(team))
}
