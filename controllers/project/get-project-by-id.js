module.exports = function makeGetProjectByIdAction({
    projectService,
    formatResponse,
    formatError,
}) {
    return async function getProjectByIdAction(httpRequest) {
        try {
            const project = await projectService.getProjectById({
                projectId: httpRequest.params.projectId,
                fields: httpRequest.query.fields && httpRequest.query.fields.split(','),
                logger: httpRequest.logger
            });

            return formatResponse({
                statusCode: 200,
                body: { item: project },
            });

        } catch (error) {
            httpRequest.logger.error('Got error while get project by Id.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}