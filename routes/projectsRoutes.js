const express = require('express')
const route = express.Router();
const { projectController } = require('../controllers')
const authorize = require('../middlewares/authMiddleware')
const makeHttpCallback = require('../http-server-callback/http-callback')


route.post('/', authorize(['admin', 'engineer']), makeHttpCallback({
    controller: projectController.addProjectAction
}))

route.get('/', authorize(['admin', 'engineer']), makeHttpCallback({
    controller: projectController.getAllProjectListAction
}))

route.get('/:projectId', authorize(['admin', 'engineer']), makeHttpCallback({
    controller: projectController.getProjectByIdAction
}))

route.put('/:projectId', authorize(['admin', 'engineer']), makeHttpCallback({
    controller: projectController.updateProjectAction
}))

route.delete('/:projectId', authorize(['admin']), makeHttpCallback({
    controller: projectController.deleteProjectAction
}))

route.patch('/:projectId', authorize(['admin', 'engineer']), makeHttpCallback({
    controller: projectController.patchOnProjectDataAction
}))


module.exports = route