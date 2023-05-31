const taskDB = require('../models/taskDB')
const asyncWrapper = require('../middlewares/async')


const getAllTasks =asyncWrapper( async (req,res) =>{
    //try{
        const allTasks = await taskDB.find();
        res.status(201).send(allTasks)

    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send({msg:error})
    // }
    // res.send("Get Tasks")
})
const createTask =asyncWrapper( async (req,res) =>{
    // try {
        const task =  new taskDB({
            task: req.body.task
            // completed: true
        })
        await task.save();
        res.status(201).json({task});
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({msg:error})
    // }
})
  
const updateTask =asyncWrapper( async (req,res) =>{
    // res.json(req.body)
    // const updatetask = await taskDB.find({task:req.body.task});
    // try {
        // console.log(req);
        console.log(req.params.truthvalue)
        const task = await taskDB.findOneAndUpdate({_id:req.params.id},{$set:{"completed":req.params.truthvalue}})
        res.status(200).json(task)
    // } catch (error) {
    //     res.status(500).json({msg:error})
    // }
    
})

const deleteTask =asyncWrapper( async  (req,res) =>{
    // try {
        const delTask = await taskDB.findOneAndDelete({_id:req.params.id});
        if(!delTask){
            return res.send(404).json({msg:`No task with id ${req.params.id}`})
        }
        res.status(200).json('Delete Task')
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({msg:error})
    // }
})

const getTask = asyncWrapper( async (req,res,next) =>{
    // try {
        const getSingleTask = await taskDB.findOne({ _id: req.params.id });
        

        if(!getSingleTask){
            const error = new Error('Not Found')
            error.status = 404;
            return next(error)
            // res.status(404).json({msg:`No task with id ${req.params.id}`})
            // return
        }
        res.json(getSingleTask)
    // } catch (error) {
    //     console.log(error);
    // }
    // res.send('Get single Task')
    res.send({id:req.params.id})
})

module.exports = {
    getAllTasks,
    updateTask,
    deleteTask,
    getTask,
    createTask
}