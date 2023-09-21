import express from 'express'
import ConnectDataBase from './ConfigDatabase/Database.js';
import Route from './routes/UserRoute.js';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';

const app = express()
const port = process.env.PORT || 8000;


ConnectDataBase()
app.use(express.json())
app.use("/api/user",Route)

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(`A user connected with socket ID: ${socket.id}`);
  
    socket.on('message', async(message) => {
  
      try {
        // Store the message in MongoDB
        const message = new ChatModel({
          sender: data.sender,
          receiver: data.receiver,
          text: data.text,
          timestamp: new Date(),
        });
        await message.save();
  
        // Emit the message to the receiver
        io.to(data.receiverSocketId).emit('message', message);
      } catch (error) {
        console.error('Error sending message:', error);
      }
  
    });
  
    socket.on('disconnect', () => {
      console.log(`A user disconnected with socket ID: ${socket.id}`);
    });
  });

  

app.get('/',(req, res)=>{

    
    res.send("Hello world!")
})

app.listen(port, ()=>[
    console.log("listening on port"+ port)
])

