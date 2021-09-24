const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.send({ msg: 'hi' })
})

io.on('connection', (socket) => {
  socket.on('CODE_CHANGED', (code) => {
    // io.emit('CODE_CHANGED', code)
    socket.broadcast.emit('CODE_CHANGED', code)
  })
})

server.listen(3001, () => {
  console.log('listening on *:3001')
})
