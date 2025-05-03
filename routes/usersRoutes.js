const express = require('express')
const route = express.Router();
const { userController } = require('../controllers')
const makeHttpCallback = require('../http-server-callback/http-callback')

route.post('/', makeHttpCallback({
    controller: userController.addUserAction
}))

route.get('/', makeHttpCallback({
    controller: userController.getAllUserListAction
}))

route.get('/:userId', makeHttpCallback({
    controller: userController.getUserByIdAction
}))

route.delete('/:userId', makeHttpCallback({
    controller: userController.deleteUserAction
}))

route.patch('/:userId', makeHttpCallback({
    controller: userController.patchOnUserDataAction
}))

route.post('/log-in', makeHttpCallback({
    controller: userController.logInUserAction
}))

module.exports = route  