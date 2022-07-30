//CRUD OPERATION start
// const mongodb=require("mongodb")
// const ObjectID=mongoose.ObjectID
// const MongoClient=mongodb.MongoClient

const {MongoClient, ObjectId, Db}=require('mongodb')



const connectionUrl="mongodb://127.0.0.1:27017"
const databseName="task-manager"

// const id=new ObjectId()
// console.log(id.id.length)
// console.log(id)
// console.log(id.id)
// console.log(id.toHexString())
// console.log(id.getTimestamp())

MongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
  if(error){
    return console.log("unable to connect to db")
  }
  const db =client.db(databseName)
  // db.collection("users").findOne({name:"raju"},(error,result)=>{
  //   if(error){
  //     return console.log("cannot fetch")
  //   }

  //   console.log(result)

  // db.collection("users").findOne({_id:new ObjectId("62cff31cfd5dd5f17c8a6845")},(error,result)=>{
  //   if(error){
  //     return console.log("cannot fetch")
  //   }

  //   console.log(result)

  // db.collection("users").find({age:23}).toArray((error,users)=>{

  //   if(error){
  //     return console.log(error)
  //   }

  //   console.log(users)

  // })
  





























  // db.collection("users").insertOne({
  //     name:"raju",
  //     age:23
  // },(error,result)=>{
  //   if(error){
  //     return console.log("unable to insert one")
  //   }

  //   console.log(result)


//    db.collection("users").insertMany(
//     [{
//       name:"ram",
//       age:27
//     },
//   {
//     name:"raghav",
//     age:23
//   }
// ],
// (error,result)=>{
//   if(error){
//     return console.log("unable to insert any document")
//   }

//   console.log(result)
// })

   
//UPDATE DOCUMENT
//by using callback
                  // db.collection("users").updateOne({
                  //   _id:new ObjectId("62cff31cfd5dd5f17c8a6845")
                  // },{
                  //   $set:{
                  //     name:"Shiv"
                  //   }
                  // })

                  // },(error,result)=>{
                  //   if(error){
                  //     return console.log(error)
                  //   }
                  //   console.log(result)
                  // })



//updating using promise
    // const updatePromise=db.collection("users").updateOne({
    //   _id:new ObjectId("62cff31cfd5dd5f17c8a6845")
    // },{
    //   $set:{
    //     name:"Shiv"
    //   }
    // })

    // updatePromise.then((result)=>{
    //   console.log(result)
    // }).catch((error)=>{
    //   console.log(error)
    // })

    // const updatePromise=db.collection("users").updateOne({
    //   _id:new ObjectId("62cff31cfd5dd5f17c8a6845")
    // },{
    //   $inc:{
    //     age:1
    //   }
    // })

    // updatePromise.then((result)=>{
    //   console.log(result)
    // }).catch((error)=>{
    //   console.log(error)
    // })
// db.collection("users").updateMany({
//   age:23
// },{
//   $set:{
//     age:27
//   }
// }).then((result)=>{
//   console.log(result)
// }).catch((err)=>{
//   console.log(err)
// })


db.collection("users").deleteMany({age:27}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.log(error)
})
  })

  

