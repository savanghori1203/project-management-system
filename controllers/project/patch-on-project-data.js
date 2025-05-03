module.exports = function makePatchOnProjectDataAction({
    projectService,
    formatResponse,
    formatError,
}) {
    return async function patchOnProjectDataAction(httpRequest) {
        try {
            
            await projectService.patchOnProjectData({
                projectId: httpRequest.params.projectId,
                projectDetail: httpRequest.body,
                logger: httpRequest.logger,
            });

            return formatResponse({
                statusCode: 200,
                body: { message: 'Updated Successfully' },
            });

        } catch (error) {
            httpRequest.logger.error('Got error while patch on project data.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}