const Message = require("../model/messageModel");

module.exports.addMessage=async(req,res,next)=>{

      try{   

       
            const{from,to,message}=req.body;
            const data=await Message.create({
                  message:{
                        text:message,
                  },
                  users:[from,to],
                  sender:from
            });

            if(data) return res.json({message:"Message Added successfully"});

            return res.json({msg:"Failed to add message to the database"});

      }catch(e){
            next(e);
      }

}

module.exports.getAllMessage=async(req,res,next)=>{

      try{
            const{from,to}=req.body;
            const messages=await Message.find({
                  users:{
                        $all:[from,to]
                  }
            }).sort({updatedAt:1});

            const projectMessage=messages.map((msg)=>{
                  return {fromSelf:msg.sender.toString()===from,
                  message:msg.message.text};
            })
            res.json(projectMessage);


      }catch(e){
            next(e);
      }

}