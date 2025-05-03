module.exports = function makeUpdateProjectAction({
    projectService,
    formatResponse,
    formatError,
}) {
    return async function updateProjectAction(httpRequest) {
        try {

            await projectService.updateProject({ 
                projectId: httpRequest.params.projectId, 
                projectDetail: httpRequest.body,
                logger: httpRequest.logger 
            });

            return formatResponse({
                statusCode: 200,
                body: { message: 'Updated Successfully' },
            });

        } catch (error) {
            httpRequest.logger.error('Got error while update project.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}