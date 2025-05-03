const { projectService } = require('../../services');
const { formatResponse, formatError } = require('../formate-response');
const { verifyOrganization } = require('../../services/organization')
const { ObjectNotFoundError } = require('../../exceptions')


const makeAddProjectAction = require('./add-project')
const addProjectAction = makeAddProjectAction({
    projectService,
    verifyOrganization,
    formatResponse,
    formatError,
    ObjectNotFoundError,
})

const makeGetAllProjectListAction = require('./get-project-list')
const getAllProjectListAction = makeGetAllProjectListAction({
    projectService,
    formatResponse,
    formatError,
})

const makeGetProjectByIdAction = require('./get-project-by-id')
const getProjectByIdAction = makeGetProjectByIdAction({
    projectService,
    formatResponse,
    formatError,
})

const makeUpdateProjectAction = require('./update-project')
const updateProjectAction = makeUpdateProjectAction({
    projectService,
    formatResponse,
    formatError,
})

const makeDeleteProjectAction = require('./delete-project')
const deleteProjectAction = makeDeleteProjectAction({
    projectService,
    formatResponse,
    formatError,
})

const makePatchOnProjectDataAction = require('./patch-on-project-data')
const patchOnProjectDataAction = makePatchOnProjectDataAction({
    projectService,
    formatResponse,
    formatError,
})

module.exports = Object.freeze({
    addProjectAction,
    getAllProjectListAction,
    getProjectByIdAction,
    updateProjectAction,
    deleteProjectAction,
    patchOnProjectDataAction,
})