module.exports = function makeDeleteProjectAction({
    projectService,
    formatResponse,
    formatError,
}) {
    return async function deleteProjectAction(httpRequest) {
        try {
            
            await projectService.deleteProject({
                projectId:httpRequest.params.projectId,
                logger: httpRequest.logger,
            });

            return formatResponse({
                statusCode: 200,
                body: { message: "Project deleted successfully" },
            });
        } catch (error) {
            httpRequest.logger.debug('Got error while delete the project')
            httpRequest.logger.debug(error)
            return formatError({ error });
        }
    }
}