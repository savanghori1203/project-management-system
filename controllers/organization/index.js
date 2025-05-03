const { organizationService } = require('../../services');
const { formatResponse, formatError } = require('../formate-response');

const makeAddOrganizationAction = require('./add-organization')
const addOrganizationAction = makeAddOrganizationAction({
    organizationService,
    formatResponse,
    formatError,
})

const makeGetAllOrganizationListAction = require('./get-organization-list')
const getAllOrganizationListAction = makeGetAllOrganizationListAction({
    organizationService,
    formatResponse,
    formatError,
})

const makeGetOrganizationByIdAction = require('./get-organization-by-id')
const getOrganizationByIdAction = makeGetOrganizationByIdAction({
    organizationService,
    formatResponse,
    formatError,
})

const makeDeleteOrganizationAction = require('./delete-organization')
const deleteOrganizationAction = makeDeleteOrganizationAction({
    organizationService,
    formatResponse,
    formatError,
})

const makeUpdateOrganizationAction = require('./update-organization')
const updateOrganizationAction = makeUpdateOrganizationAction({
    organizationService,
    formatResponse,
    formatError,
})

module.exports = Object.freeze({
    addOrganizationAction,
    getAllOrganizationListAction,
    getOrganizationByIdAction,
    deleteOrganizationAction,
    updateOrganizationAction,
})