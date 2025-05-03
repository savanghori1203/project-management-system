const express = require('express')
const route = express.Router();
const { organizationController } = require('../controllers')
const makeHttpCallback = require('../http-server-callback/http-callback')

route.post('/', makeHttpCallback({
    controller: organizationController.addOrganizationAction
}))

route.get('/', makeHttpCallback({
    controller: organizationController.getAllOrganizationListAction
}))

route.get('/:organizationId', makeHttpCallback({
    controller: organizationController.getOrganizationByIdAction
}))

route.delete('/:organizationId', makeHttpCallback({
    controller: organizationController.deleteOrganizationAction
}))

route.patch('/:organizationId', makeHttpCallback({
    controller: organizationController.updateOrganizationAction
}))

module.exports = route