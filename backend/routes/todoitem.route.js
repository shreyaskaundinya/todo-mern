var express = require('express');
const cors = require('../utils/cors.util.js');
const TodoItem = require("../models/todoitem.model");   

var router = express.Router();

const notSupported = (req, res) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
}

async function getTodoItems(request,response){
    const allTodos = await TodoItem.find({})
    console.log("Got Todos")
    return response.status(200).json({status:200, allTodos: allTodos})
}

async function addNewTodo(request,response){
    const newTodo = await TodoItem.create(request.body.newTodo)
    console.log("Added New Todo")
    return response.status(200).json({status:200, newTodo: newTodo})
}

async function updateTodo(request,response){
    const updatedTodo = request.body.todoItem
    await TodoItem.findByIdAndUpdate(updatedTodo._id, {title: updatedTodo.title, body: updatedTodo.body, checked: updatedTodo.checked})
    return response.status(200).json({status:200})
}



router.route('/').options(cors.whitelist, function (request, response) {
    response.sendStatus(200);
})
.get(getTodoItems)
.post(updateTodo)
.put(addNewTodo)
.delete(notSupported);


module.exports = router;