const { errorhandler } = require("../middlewares/error");
const Task = require("../models/task_model");

const newTask = async (req, res, next) => {

  try{
    const { title, description } = req.body;

    await Task.create({ title, description, user: req.user });
  
    res.status(201).json({ success: "true", message: "Task added" });
  }
  catch(error){
    next(error)
  }
  
};
const get_my_tasks = async (req, res, next) => {
 try{
  const id = req.user._id;

  const tasks = await Task.find({ user: id });

  res.status(201).json({ success: "true", tasks: tasks });
 }
 catch(error){
  next(error)
 }
};
const update_tasks = async (req, res, next) => {
 
  try{
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new errorhandler('Invalid ID', 404));
    }
  
    task.isCompleted = !task.isCompleted;
    await task.save();
  
    res.status(201).json({ success: "true", message: "Task updated" });
  }
  catch(error){
    next(error)
  }
};
const delete_tasks = async (req, res, next) => {
 
  try{
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new errorhandler('Invalid ID', 404));
    }
    await task.deleteOne();
    res.status(201).json({ success: "true", message: "Task deleted" });
  }
  catch(error){
    next(error)
  }
  }


module.exports = { newTask, get_my_tasks, update_tasks, delete_tasks };
