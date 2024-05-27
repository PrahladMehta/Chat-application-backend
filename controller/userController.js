const User=require("../model/userSchema");
const bcrypt=require("bcrypt");
module.exports.register=async(req,res,next)=>{

     try{

      const {username,email,password}=req.body;
      
      const usernameCheck=await User.findOne({username});

      if(usernameCheck){
         return res.json({message:"username already exist ",status:false});
            
      }

      const emailCheck=await User.findOne({email});

      if(emailCheck){
            return res.json({message:"email already exit",status:false});
      }

      const hashPassword=await bcrypt.hash(password,10);

      const user=await User.create({username,email,password:hashPassword});
      
       delete user.password


       res.json({
            message:"User created",
            user,
            status:true
       });

     }catch(e){
            next(e);
     }

}

module.exports.login=async (req,res,next)=>{
      try{
 
       const {username,email,password}=req.body;
       
       const user=await User.findOne({username});
 
       if(!user){
          return res.json({message:"Username or password is incorrect",status:false});
             
       }
 
       
       const checkPassword=await bcrypt.compare(password,user.password);

       if(!checkPassword){

            return res.json({message:"Username or password is incorrect",status:false})

       }
      
 
       
       
        delete user.password;
 
 
        res.json({
             message:"User Logged in",
             user,
             status:true
 
        });
 
      }catch(e){
             next(e);
      }
 
 }
 

module.exports.setAvatar=async (req,res,next)=>{

     try{
          const userId=req.params.id;
          const avatarImage=req.body.image;
          // console.log(userId);
         await User.findByIdAndUpdate({_id:userId},{
               isAvatarImageSet:true,
               avatarImage
          });
          const userData=await User.findOne({_id:userId});

          return res.json({message:"",status:true,isSet:userData.isAvatarImageSet,image:userData.avatarImage});
     }catch(e){
          next(e);
     }

}

module.exports.getAllUser=async(req,res,next)=>{

     try{

     

          const users=await User.find({_id:{$ne:req.params.id}}).select([
               "email",
               "_id",
               "avatarImage",
               "username"
          ])
         
          return res.json(users);


     }catch(e){
          next(e);

     }

}