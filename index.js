const express = require('express')

const postsRouter = require('./postsRouter')

const server = express()

server.use(express.json())

server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Project II API</h>
    <p>Welcome to the Lambda Project II API</p>
  `)
})

const port = 5000
server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})