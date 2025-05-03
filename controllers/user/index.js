const { userService } = require('../../services');
const { formatResponse, formatError } = require('../formate-response');

const makeAddUserAction = require('./add-user')
const addUserAction = makeAddUserAction({
    userService,
    formatError,
    formatResponse
})

const makeGetAllUserListAction = require('./get-all-user-list')
const getAllUserListAction = makeGetAllUserListAction({
    userService,
    formatError,
    formatResponse
})

const makeGetUserByIdAction = require('./get-user-by-id')
const getUserByIdAction = makeGetUserByIdAction({
    userService,
    formatError,
    formatResponse
})

const makeDeleteProjectAction = require('./delete-user')
const deleteUserAction = makeDeleteProjectAction({
    userService,
    formatError,
    formatResponse
})

const makePatchOnUserDataAction = require('./patch-on-user-data')
const patchOnUserDataAction = makePatchOnUserDataAction({
    userService,
    formatResponse,
    formatError,
})

const makeLogInUserAction = require('./log-in-user')
const logInUserAction = makeLogInUserAction({
    userService,
    formatError,
    formatResponse
})

module.exports = Object.freeze({
    addUserAction,
    getAllUserListAction,
    getUserByIdAction,
    deleteUserAction,
    patchOnUserDataAction,
    logInUserAction,
})