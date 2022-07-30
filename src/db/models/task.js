const mongoose=require("mongoose")
const taskScehema=mongoose.Schema({
    description:{
        type:String,
        required:true
       
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},
    {
        timestamps:true
    }
)

taskScehema.pre("save",async function(next){
    const task=this
    console.log(task)
    next()
})

const Task=mongoose.model("Task",taskScehema)

module.exports=Task