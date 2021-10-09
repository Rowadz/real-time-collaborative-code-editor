const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const cors = require('cors')
const io = new Server(server)
const { createClient } = require('redis')
const { v4 } = require('uuid')
const { blueBright, greenBright, redBright } = require('chalk')

const client = createClient()
app.use(cors())

client.on('error', console.error)
client
  .connect()
  .then(() => console.log(blueBright.bold('Connected to redis locally!')))
  .catch(() => {
    console.error(redBright.bold('Error connecting to redis'))
  })

app.get('/', (req, res) => {
  res.send({ msg: 'hi' })
})

app.post('/create-room-with-user', (req, res) => {
  const body = req.body
  const roomId = v4()
  res.status(201).send({ roomId })
})

app.post('/create-user', (req, res) => {
  const body = req.body
  res.sendStatus(201)
})

io.on('connection', (socket) => {
  socket.on('CODE_CHANGED', (code) => {
    // io.emit('CODE_CHANGED', code)
    socket.broadcast.emit('CODE_CHANGED', code)
  })
  socket.on('CONNECTED_TO_ROOM', ({ roomId }) => {
    socket.broadcast.emit(`ROOM:${roomId}:EVENT:CONNECTION`)
  })
})

server.listen(3001, () => {
  console.log(greenBright.bold('listening on *:3001'))
})
