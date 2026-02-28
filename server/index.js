import express from 'express'
import cors from 'cors'
import authRouter from './Routers/authRouter.js'
import forumRouter from './Routers/forumRouter.js'

const server = express()
server.use(express.json())
server.use(cors())

server.use('/auth', authRouter)
server.use('/forum', forumRouter)

server.get('/', (req, res) => {
  res.send('FitLife server is running 🏋️')
})

server.listen(4000, () => {
  console.log('FitLife server running at port 4000')
})  