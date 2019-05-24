const app = require('./app')
const server = app.listen(process.env.PORT || 3389, () => {
  console.log('Express Running')
})
const io = require('socket.io')(server)

const SocketListeners = require('./services/SocketListeners')
io.on('connection', socket => SocketListeners(socket, io))
