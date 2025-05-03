const express = require('express')
const route = express.Router();
const { taskController } = require('../controllers')
const makeHttpCallback = require('../http-server-callback/http-callback')

route.post('/', makeHttpCallback({
    controller: taskController.addTaskAction
}))

route.get('/', makeHttpCallback({
    controller: taskController.getAllTaskListAction
}))

route.get('/:taskId', makeHttpCallback({
    controller: taskController.getTaskByIdAction
}))

route.delete('/:taskId', makeHttpCallback({
    controller: taskController.deleteTaskAction
}))

route.patch('/:taskId', makeHttpCallback({
    controller: taskController.updateTaskAction
}))

module.exports = route