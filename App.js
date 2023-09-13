import express from 'express'
import ConnectDataBase from './ConfigDatabase/Database.js';
import Route from './routes/UserRoute.js';

const app = express()
const port = process.env.PORT || 8000;


ConnectDataBase()
app.use(express.json())
app.use("/api/user",Route)


app.get('/',(req, res)=>{
    res.send("Hello world!")
})

app.listen(port, ()=>[
    console.log("listening on port"+ port)
])

