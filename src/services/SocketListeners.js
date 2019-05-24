const SocketListeners = (socket, io) => {
  console.log(`Conectado ao socket ${socket.id}`)

  socket.on('disconnect', function () {
    console.log('User Disconnected')
  })
}
module.exports = SocketListeners
