var express=require('express')
var router=express.Router();
const Todo=require('../models/todo.model.js')

// router.get('getTodoList',function(req,res,next){
//     res.send('TODo list')
// })

router.post("/addTodo",async (req,res)=>{
// console.log(req.body);
try{
const todo=new Todo(req.body);
  await todo.save()
res.status(200).send(todo)
}catch(e){
    res.status(400).send(e)
}
})

router.get("/getTodoList",async(req,res)=>{
    const todos=await Todo.find()
    res.send(todos)
})

router.put("/updateTodo",async (req,res)=>{   // url end point
  // console.log(req.body);
  try{
   const filter ={ title: "this is the title"} ;
  const update= {
    $set:{
      title:"Do coding practice"
    }
  }
    await Todo.updateMany(filter,update)

  res.json({message:"Todo updated sucessfully"})
  }catch(e){
    console.error(e)
      res.status(500).send("could not updated todos")
  }
  });


  router.delete("/deleteTodo",async (req,res)=>{
    // console.log(req.body);
    try{
      await Todo.deleteMany({title:"Do coding practice"})
    res.json({message:"Todo deleted successfully"})
    }catch(e){
      console.error(e)
        res.status(400).send('could not deleted todos')
    }
    })


module.exports=router