const express=require('express')

const Task=require("../db/models/task")
const router=new express.Router()
const auth=require("../middleware/auth")

router.use(express.json())

// router.get("/tasks",async(req,res)=>{
//   try{
//    const taskdata=await Task.find(({}))
//    res.send(taskdata)
//   }
//   catch(e){
//     res.status(400).send(e)
//   }
// })

router.get("/tasks/:id",auth,async(req,res)=>{
    
   const _id=req.params.id
   console.log(req.user._id.toString())
   try {
    const task=await Task.findOne({_id,owner:req.user._id})
    console.log(task)

    if(!task){
      return res.status(404).send()
    }

    res.send(task)

    
   } catch (error) {
    res.status(500).send()
    
   }


})

router.post("/tasks",auth,async(req,res)=>{
    // console.log(req.body)
    // const task= new Task(req.body)
    const task=new Task({
      ...req.body,
      owner:req.user._id
    })
    try{
     await task.save()
     res.status(201).send(task)
    }
    catch(e){

        res.status(400).send(e)

    }
})

//GET tasks which are completd -> /tasks?completed=fals

//pagination limit,skip,  get /tasks?limit=10&skip=0

//sorting would be done GET /tasks?sortBy=createdAt_asc/desc 

router.get("/tasks",auth,async(req,res)=>{
  console.log(req.query.completed)
  const match={}

  const sort={}

  if(req.query.completed){
    match.completed=req.query.completed
  }

  if(req.query.sortBy){
    const parts=req.query.sortBy.split("_")
    sort[parts[0]]=parts[1]==="desc"?-1:1

  }

      
        try{
          // const task=await Task.find({owner:req.user._id})
          await req.user.populate({
            path:"tasks",
            match:match,
            options:{
              limit:parseInt(req.query.limit),
              skip:parseInt(req.query.skip),
              // sort:{
              //   // createdAt:1
              //   completed:-1
              // }
              sort:sort

            }

            

          })
        
         
          res.send(req.user.tasks)

        }
        
        catch(e){
          res.send(e)
        }

}
)

router.patch("/tasks/:id",auth,async(req,res)=>{
  const updates=Object.keys(req.body)
  console.log(updates)
  const allowedUpdate=['description','completed']
  const validOpt=updates.every((update)=>{
      return allowedUpdate.includes(update)
  })

if(!validOpt){
 return res.status(404).send("Fields filled improperly")
}
   
  try{
      console.log(req.body)

      const task=await Task.findOne({_id:req.params.id,owner:req.user._id})

      if(!task){
        return res.status(400).send()
      }
      // const task=await Task.findById(req.params.id)
       updates.forEach((update)=>{
         task[update]=req.body[update] 
         
       })
       await task.save()
      // const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
      if(!task){
        return res.status(404).send()
      }
      res.send(task)

  }
  catch(e){
    res.status(400).send(e)
  }
})

router.delete("/tasks/:id",auth,async(req,res)=>{
   
  try {
    const task=await Task.findOneAndDelete({ _id:req.params.id,owner:req.user._id})
    res.send(task)
  } catch (error) {

    res.status(400).send(e)
    
  }
})

module.exports=router