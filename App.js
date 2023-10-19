import express from 'express'
import ConnectDataBase from './ConfigDatabase/Database.js';
import Route from './routes/UserRoute.js';
import cors from 'cors';
import http from 'http';

const app = express()
const port = process.env.PORT || 8000;


ConnectDataBase()
app.use(express.json())
app.use("/api/user",Route)

// const server = http.createServer(app);
// const io = new Server(server);


  

app.get('/',(req, res)=>{


    res.send("Hello world!")
})

app.listen(port, ()=>[
    console.log("listening on port"+ port)
])

