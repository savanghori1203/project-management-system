module.exports = function makeAddTaskAction({
    taskService,
    verifyProject,
    verifyOrganization,
    formatResponse,
    formatError,
    ObjectNotFoundError,
}) {
    return async function addTaskAction(httpRequest) {
        try {

            const organization = await verifyOrganization({
                organizationId: httpRequest.body.organization_id,
                logger: httpRequest.logger
            })

            if (!organization) {
                throw new ObjectNotFoundError('PA-00014', 'Organization does not exists.')
            }

            const project = await verifyProject({
                projectId: httpRequest.body.project_id,
                logger: httpRequest.logger
            })

            if (!project) {
                throw new ObjectNotFoundError('PA-00009', 'Project does not exists.')
            }

            const task = await taskService.addTask({
                taskDetail: httpRequest.body,
                logger: httpRequest.logger
            });

            return formatResponse({
                statusCode: 201,
                body: { item: { id: task.id } },
            });
        } catch (error) {
            httpRequest.logger.debug('Got error while adding new task')
            httpRequest.logger.debug(error)
            return formatError({ error });
        }
    };
}