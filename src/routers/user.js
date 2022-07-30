const express=require("express")
const User=require("../db/models/user")
const router=new express.Router()
const auth=require("../middleware/auth")
const multer=require("multer")
const sharp = require("sharp")
const { sendWelcomeEmail,sendExitEmail } = require("../email/account")

router.use(express.json())

router.get("/test",(req,res)=>{
    res.send("from  a new file")
})


router.post('/users',async(req,res)=>{
   
    const user=new User(req.body)
    console.log("x")
    
    try{
      await user.save()
      console.log('y')
      const token =await  user.generateAuthToken()
      console.log("z")
      sendWelcomeEmail(user.email,user.name)
     

      res.status(200).send({user,token})

    }
    catch(e){
    res.status(400).send(e)
    }
  
  

    // user.save().then(()=>{
    //    res.send(user)
    // }).catch((e)=>{
    //   res.status(400).send(e)
    // })
})

router.get("/users/login",async(req,res)=>{
  try{
    console.log(req.body)
   const user=await User.findTheCredential(req.body.email,req.body.password)
   console.log(user)
   const token=await user.generateAuthToken()
   console.log(token)
   res.send( { user,token})
  }
  catch(e){
    res.status(400).send(e)

  }
})

router.post("/users/logout",auth,async (req,res)=>{
  try{
    req.user.tokens=req.user.tokens.filter((token)=>{
      return token.token!=req.token
    })
    

    

    await req.user.save()
    res.send()
  }

  catch(e){
    res.status(500).send(e)

  }
})

router.post("/users/logoutall",auth,async(req,res)=>{
  try{
      req.user.tokens=[]
      await req.user.save()
    
    res.send(req.user)
    }
      catch(e){
      res.status(500).send(e)
      }
  
})


router.get("/users/:id",async(req,res)=>{
  // console.log(req.params)
  const _id=req.params.id
  try{
    const user=await User.findById(_id)
    if(!user){
      return res.status(404).send("No user found")
    }
    res.send(user)
  }
  catch(e){
    res.send(e)
  }


  // User.findById(_id).then((user)=>{
  //      if(!user){
  //       return res.status(404).send()
  //      }
      
  //   res.send(user)
  // }).catch((e)=>{
  //   res.status(500).send()

  // })
})


router.get("/user",auth,async(req,res)=>{

      res.send(req.user)
// try{
//       const user= await User.find({})
//       res.status(200).send(user)
// }

// catch(e){
//   res.status(400).send(e)  
// }
 
        // User.find({}).then((result)=>{
        //   res.send(result)
        // }).catch((e)=>{
        //   res.status(500).send(e)
        // })
})

router.patch("/users/me",auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    console.log(updates)
    const allowedUpdate=['name','email','password']
    const validOpt=updates.every((update)=>{
        return allowedUpdate.includes(update)
    })
  
  if(!validOpt){
   return res.status(404).send("Fields filled improperly")
  }
     
    try{
        // console.log(req.user.toString())
        
         updates.forEach((update)=>{
           req.user[update]=req.body[update] 
           
         })
         await req.user.save()
        // const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        
        res.send(req.user)

    }
    catch(e){
      res.status(400).send(e)
    }
})

router.delete("/users/me",auth,async(req,res)=>{

   try{
    // const user=await User.findByIdAndDelete(req.params.id)
    // if(!user){
    //   return res.status(404).send()
    // }
    // res.send(user)
    sendExitEmail(req.user.email,req.user.name);
      await  req.user.remove()
      res.send(req.user)


    }
      catch(e){
      res.status(400).send(e)
      }

})

const upload=multer({
  limits:{
    fileSize:1000000
  },
  fileFilter(req,file,cb){

  //  if(!file.originalname.match(/\.(doc|docx|pdf)$/)){
  //   cb(new Error('Document is neither doc,docxor pdf'))
  //  }

  //  cb(undefined,true)



  // //  cb(new Error("Not the rigth file"))
  // //  cb(undefined,true)
  // //  cb(undefined,false)
  // }

  if(!file.originalname.match(/.(jpeg|jpg|png)$/)){
    cb(new Error('file uploaded is not an image'))
  }

  cb(undefined,true)

}
})



router.post("/users/me/avatar",auth,upload.single('avatar'),async(req,res)=>{
    const buffer=await sharp(req.file.buffer).resize({width:200,height:200}).png().toBuffer()
      req.user.avatar=buffer
      await req.user.save()
      res.send()
},(error,req,res,next)=>{
   res.status(400).send({error:error.message})
})

router.delete("/users/me/avatar",auth,async(req,res)=>{
  req.user.avatar=undefined
  await req.user.save()
  
  if(!req.user.avatar){
   return res.status(400).send('No such avatar exist')
  }
  res.send(req.user)

})

router.get("/users/:id/avatar",async(req,res)=>{
  try {

    const user=await User.findById(req.params.id)
    if(!user || !user.avatar){
      throw new Error()
    }
    // console.log("hi")
    res.set('Content-Type','image/png')
    res.send(user.avatar)
    
  } catch (error) {
    res.status(400).send()
    
  }
})






module.exports=router