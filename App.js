const express = require('express')

const ConnectDataBase = require('./ConfigDatabase/Database.js')
const Route = require('./routes/UserRoute.js')
const cors = require('cors')
const http = require('http')

const app = express()
const port = process.env.PORT || 8000;


ConnectDataBase()
app.use(express.json())
app.use("/api/user", Route)

// const server = http.createServer(app);
// const io = new Server(server);




app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(8002, () => [
    console.log("listening on port" + 8002)
])

