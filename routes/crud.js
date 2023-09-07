var express=require('express')
var router=express.Router();
const Todo=require('../models/crud.model')

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


router.put("/updateTodo/:id",async (req,res)=>{   // url end point
 
  const todoId = req.params.id;
  const { title, description } = req.body; 
  try{
   const filter ={ _id: todoId } ;
  const update= {
    $set:{
      title:title,
      description:description
    }
  }
    await Todo.updateMany(filter,update)
  res.json({message:"Todo updated sucessfully"})

  }catch(e){
    console.error(e)
      res.status(500).send("could not updated todos")
  }
  });


  router.delete("/deleteTodo/:id",async (req,res)=>{
    const recordId = req.params.id;
    try{
      await Todo.deleteMany({_id:recordId})
    res.json({message:`Todo deleted successfully${recordId}`})
    }catch(e){
      console.error(e)
        res.status(400).send(`could not deleted todos'`)
    }
    })


module.exports=router