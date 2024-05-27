const routes=require("express").Router();
const {register,login,setAvatar,getAllUser}=require("../controller/userController");
const {addMessage,getAllMessage}=require("../controller/messageController");
routes.post("/register",register);
routes.post("/login",login)
routes.post("/setavatar/:id",setAvatar)
routes.get("/allusers/:id",getAllUser);

routes.post("/addmsg",addMessage);
routes.post("/getmsg",getAllMessage);

module.exports=routes;

