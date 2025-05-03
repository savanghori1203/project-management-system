const { Organization } = require('../../model')
const {
    UnknownError,
    AlreadyExistsError,
    ValidationError,
    ObjectNotFoundError } = require('../../exceptions')
const Joi = require('joi')
const { generateRandomString } = require('../../utilities')

const makeCheckNameAlreadyExists = require('./check-name-already-exists')
const checkNameAlreadyExists = makeCheckNameAlreadyExists({
    Organization,
    UnknownError,
})

const makeAddOrganization = require('./add-organization')
const addOrganization = makeAddOrganization({
    Organization,
    checkNameAlreadyExists,
    generateRandomString,
    Joi,
    UnknownError,
    AlreadyExistsError,
    ValidationError,
})

const makeGetAllOrganizationList = require('./get-organization-list')
const getAllOrganizationList = makeGetAllOrganizationList({
    Organization,
    UnknownError,
})

const makeGetOrganizationById = require('./get-organization-by-id')
const getOrganizationById = makeGetOrganizationById({
    Organization,
    Joi,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
})

const makeDeleteOrganization = require('./delete-organization')
const deleteOrganization = makeDeleteOrganization({
    Organization,
    getOrganizationById,
    Joi,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
})

const makeUpdateOrganization = require('./update-organization')
const updateOrganization = makeUpdateOrganization({
    Organization,
    checkNameAlreadyExists,
    getOrganizationById,
    Joi,
    UnknownError,
    ValidationError,
    AlreadyExistsError,
})

const makeVerifyOrganization = require('./verify-organization')
const verifyOrganization = makeVerifyOrganization({
    Organization,   
    Joi,
    UnknownError,
    ValidationError,
})

module.exports = Object.freeze({
    addOrganization,
    getAllOrganizationList,
    getOrganizationById,
    deleteOrganization,
    updateOrganization,
    verifyOrganization,
})