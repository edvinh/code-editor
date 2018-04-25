import io from 'socket.io-client'

let socket = null
const SOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.SERVER_URL || 'http://192.168.1.2:3001'
    : 'http://localhost:3001'

export function connectSocket () {
  if (!socket) {
    socket = io.connect(SOCKET_URL)
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
