const express=require("express")
require('./db/mongoose')
const bcrypt=require('bcryptjs')
const app=express()
const taskRouter=require("./routers/task")
const userRouter=require("./routers/user")


//middleware 
// app.use((req,res,next)=>{
//   if(req.method=='GET'){
//     res.send("Get method is disabled")
//   }
//   else{
//     next()
//   }
// })

// const multer=require("multer")
// const upload=multer({
//     dest:'Images'
// })

// app.post("/upload",upload.single("upload"),(req,res)=>{
//     res.send()
// })



app.use(userRouter)
app.use(taskRouter)


const port= process.env.PORT


//without middleware =new req -> run route handler

//with middleware new request -> do something-> run route handler


//helpful in parsing incoming json request
app.use(express.json())
app.listen(port,()=>{
    console.log(`The server is running at port  mm ${port}`)
})


// const hashi=async()=>{
//   const planepassword="Himanshu"
//   const hashpas=await bcrypt.hash(planepassword,8)
//   console.log(hashpas)
// } 

// hashi()

//learning how to use jsonwebtoken

// const jwt=require("jsonwebtoken")

// const myfunction=async()=>{
//     const token =jwt.sign({_id:"abc"},"charless",{expiresIn:"5 sec"})
//     console.log(token)

//     const data=jwt.verify(token,"charless")
//     console.log(data)

// }

// myfunction()

// const Task=require("./db/models/task")
// const User=require("./db/models/user")

// const main=async()=>{
//     // const task=await Task.findOne({owner:"62da322fa52b39c80a447c68"})
//     //  await task.populate('owner')
//     // console.log(task.owner)








//     const user=await User.findById("62da322fa52b39c80a447c68")
//     await user.populate('tasks')
//     console.log(user.tasks)
// }
// main()