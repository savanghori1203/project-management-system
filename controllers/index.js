const projectController = require('./project')
const userController = require('./user')
const organizationController = require('./organization')
const taskController = require('./task')

module.exports = Object.freeze({
    projectController,
    userController,
    organizationController,
    taskController,
})