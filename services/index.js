const projectService = require('./project')
const userService = require('./user')
const organizationService = require('./organization')
const taskService = require('./task')

module.exports = Object.freeze({
    projectService,
    userService,
    organizationService,
    taskService,
})