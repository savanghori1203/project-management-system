module.exports = function makeUpdateTaskAction({
    taskService,
    verifyOrganization,
    verifyProject,
    formatResponse,
    formatError,
    ObjectNotFoundError,
}) {
    return async function updateTaskAction(httpRequest) {
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

            await taskService.updateTask({
                taskId: httpRequest.params.taskId,
                taskDetail: httpRequest.body,
                logger: httpRequest.logger,
            });

            return formatResponse({
                statusCode: 200,
                body: { message: 'Updated Successfully' },
            });

        } catch (error) {
            httpRequest.logger.error('Got error while update task data.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}