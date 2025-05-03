const { Project } = require('../../model')
const {
    UnknownError,
    AlreadyExistsError,
    ValidationError,
    ObjectNotFoundError } = require('../../exceptions')
const Joi = require('joi')
const { generateRandomString } = require('../../utilities')

const makeCheckNameAlreadyExists = require('./check-name-already-exists')
const checkNameAlreadyExists = makeCheckNameAlreadyExists({
    Project,
    UnknownError,
})

const makeAddProject = require('./add-project')
const addProject = makeAddProject({
    Project,
    checkNameAlreadyExists,
    generateRandomString,
    Joi,
    UnknownError,
    AlreadyExistsError,
    ValidationError,
})

const makeGetAllProjectList = require('./get-project-list')
const getAllProjectList = makeGetAllProjectList({
    Project,
    UnknownError,
})

const makeGetProjectById = require('./get-project-by-id')
const getProjectById = makeGetProjectById({
    Project,
    Joi,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
})

const makeUpdateProject = require('./update-project')
const updateProject = makeUpdateProject({
    Project,
    checkNameAlreadyExists,
    getProjectById,
    Joi,
    UnknownError,
    ValidationError,
    AlreadyExistsError,
    ObjectNotFoundError,
})

const makeDeleteProject = require('./delete-project')
const deleteProject = makeDeleteProject({
    Project,
    getProjectById,
    Joi,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
})

const makePatchOnProjectData = require('./patch-on-project-data')
const patchOnProjectData = makePatchOnProjectData({
    Project,
    checkNameAlreadyExists,
    getProjectById,
    Joi,
    UnknownError,
    ValidationError,
    AlreadyExistsError,
    ObjectNotFoundError,
})

const makeVerifyProject = require('./verify-project')
const verifyProject = makeVerifyProject({
    Project,
    Joi,
    UnknownError,
    ValidationError,
})

module.exports = Object.freeze({
    addProject,
    getAllProjectList,
    getProjectById,
    updateProject,
    deleteProject,
    patchOnProjectData,
    verifyProject,
})