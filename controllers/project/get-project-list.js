module.exports = function makeGetAllProjectListAction({
    projectService,
    formatResponse,
    formatError,
}) {
    return async function getAllProjectListAction(httpRequest) {
        try {

            const projects = await projectService.getAllProjectList({
                fields: httpRequest.query.fields && httpRequest.query.fields.split(','),
                logger: httpRequest.logger
            });
            return formatResponse({
                statusCode: 200,
                body: { items: projects },
            });
        } catch (error) {
            httpRequest.logger.error('Got error while get all project list.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}