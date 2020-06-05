import socketio from 'socket.io-client'

const socket = socketio('http://10.0.0.103:3334', {
  autoConnect: false,
})

function connect(latitude, longitude, techs, Maxdistance) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
    Maxdistance
  }
  socket.connect()

  socket.on('message', text => {
    console.log(text)
  })
}

function disconect() {
  if (socket.connected) {
    socket.disconnect()
  }
}

export {
  connect,
  disconect
}