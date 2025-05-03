const { taskService } = require('../../services');
const { formatResponse, formatError } = require('../formate-response');
const { verifyProject } = require('../../services/project')
const { verifyOrganization } = require('../../services/organization')
const { ObjectNotFoundError } = require('../../exceptions')
const config = require('../../config')
const { prepareTaskFilter } = require('../../utilities')

const makeAddTaskAction = require('./add-task')
const addTaskAction = makeAddTaskAction({
    taskService,
    verifyProject,
    verifyOrganization,
    formatResponse,
    formatError,
    ObjectNotFoundError,
})

const makeGetAllTaskListAction = require('./get-all-task-list')
const getAllTaskListAction = makeGetAllTaskListAction({
    taskService,
    prepareTaskFilter,
    config,
    formatResponse,
    formatError,
})

const makeGetTaskByIdAction = require('./get-task-by-id')
const getTaskByIdAction = makeGetTaskByIdAction({
    taskService,
    formatResponse,
    formatError,
})

const makeDeleteTaskAction = require('./delete-task')
const deleteTaskAction = makeDeleteTaskAction({
    taskService,
    formatResponse,
    formatError,
})

const makeUpdateTaskAction = require('./update-task');
const updateTaskAction = makeUpdateTaskAction({
    taskService,
    verifyOrganization,
    verifyProject,
    formatResponse,
    formatError,
    ObjectNotFoundError,
})

module.exports = Object.freeze({
    addTaskAction,
    getAllTaskListAction,
    getTaskByIdAction,
    deleteTaskAction,
    updateTaskAction,
})