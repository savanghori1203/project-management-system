const { User } = require('../../model')
const {
    UnknownError,
    AlreadyExistsError,
    ValidationError,
    ObjectNotFoundError,
    AuthenticationFailed, } = require('../../exceptions')
const Joi = require('joi')
const {PASSWORD_REGEX,encryptPassword, decryptPassword} = require('../../utilities')

const makeCheckEmailAlreadyExists = require('./check-email-already-exists')
const checkEmailAlreadyExists = makeCheckEmailAlreadyExists({
    User,
    UnknownError,
})

const makeGetDataByEmailId = require('./get-data-by-email-id')
const getDataByEmailId = makeGetDataByEmailId({
    User,
    UnknownError,
})

const makeAddUser = require('./add-user')
const addUser = makeAddUser({
    User,
    encryptPassword,
    checkEmailAlreadyExists,
    Joi,
    UnknownError,
    AlreadyExistsError,
    ValidationError,
    PASSWORD_REGEX,
})

const makeGetAllUserList = require('./get-all-user-list')
const getAllUserList = makeGetAllUserList({
    User,
    UnknownError,
})

const makeGetUserById = require('./get-user-by-id')
const getUserById = makeGetUserById({
    User,
    UnknownError,
    Joi,
    ObjectNotFoundError,
})

const makeDeleteUser = require('./delete-user')
const deleteUser = makeDeleteUser({
    User,
    getUserById,
    Joi,
    UnknownError,
    ValidationError,
})

const makePatchOnUserData = require('./patch-on-user-data')
const patchOnUserData = makePatchOnUserData({
    User,
    checkEmailAlreadyExists,
    encryptPassword,
    getUserById,
    Joi,
    UnknownError,
    ValidationError,
    AlreadyExistsError,
    PASSWORD_REGEX,
})

const makeLoginUser = require('./log-in-user')
const loginUser = makeLoginUser({
    User,
    getDataByEmailId,
    decryptPassword,
    UnknownError,
    ValidationError,
    AuthenticationFailed,
    Joi,
})

const makeVerifyUser = require('./verify-user')
const verifyUser = makeVerifyUser({
    User,
    Joi,
    UnknownError,
    ValidationError,
})

module.exports = Object.freeze({
    addUser,
    getAllUserList,
    getUserById,
    deleteUser,
    patchOnUserData,
    loginUser,
    verifyUser,
})