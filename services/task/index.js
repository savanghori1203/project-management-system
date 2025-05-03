const { Task } = require('../../model')
const {
    UnknownError,
    AlreadyExistsError,
    ValidationError,
    ObjectNotFoundError } = require('../../exceptions')
const Joi = require('joi')
const config = require('../../config')
const { verifyUser } = require('../user')

const makeAddTask = require('./add-task')
const addTask = makeAddTask({
    Task,
    Joi,
    validStatus: config.allowedStatus,
    validPriority: config.allowPriority,
    verifyUser,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
})

const makeGetAllTaskList = require('./get-all-task-list')
const getAllTaskList = makeGetAllTaskList({
    Task,
    UnknownError,
})

const makeGetTaskById = require('./get-task-by-id')
const getTaskById = makeGetTaskById({
    Task,
    Joi,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
})

const makeDeleteTask = require('./delete-task')
const deleteTask = makeDeleteTask({
    Task,
    getTaskById,
    Joi,
    UnknownError,
    ValidationError,
})

const makeUpdateTask = require('./update-task')
const updateTask = makeUpdateTask({
    Task,
    Joi,
    getTaskById,
    validStatus: config.allowedStatus,
    validPriority: config.allowPriority,
    UnknownError,
    ValidationError,
})

const makeGetOverDueTask = require('./get-over-due-task')
const getOverDueTask = makeGetOverDueTask({
    Task,
    UnknownError,
})

module.exports = Object.freeze({
    addTask,
    getAllTaskList,
    getTaskById,
    deleteTask,
    updateTask,
    getOverDueTask,
})