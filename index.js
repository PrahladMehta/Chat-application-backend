const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
require("dotenv").config();
const socket=require("socket.io");

 
const server=app.listen(process.env.Port,()=>{
      console.log("Port Listening on",process.env.Port);  
})

mongoose.connect(process.env.Url).then(()=>{ 
      console.log("connected to db");
}).catch((e)=>{
      console.log("Error",e)  
})

app.use(cors());
app.use(express.json());
const userRoutes=require("./routes/userRoute");

app.use("/api/auth",userRoutes);

const io=socket(server,{
      cors:{
            origin:"http://localhost:3000",
            credentials:true,
      },
});

global.onlineUsers=new Map();

io.on("connection",(socket)=>{
      global.chatSocket=socket;
      socket.on("add-user",(userId)=>{
            onlineUsers.set(userId,socket.id);
      });

      socket.on("send-msg",(data)=>{
            const sendUserSocket=onlineUsers.get(data.to);
    
            if(sendUserSocket){
                 
                  socket.to(sendUserSocket).emit("msg-recieve",data.message);
            }

      })
})


