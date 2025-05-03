module.exports = function makeAddProjectAction({
    projectService,
    verifyOrganization,
    formatResponse,
    formatError,
    ObjectNotFoundError,
}) {
    return async function addProjectAction(httpRequest) {
        try {

            const organization = await verifyOrganization({
                organizationId: httpRequest.body.organization_id,
                logger: httpRequest.logger
            })

            if (!organization) {
                throw new ObjectNotFoundError('PA-00014', 'Organization does not exists.')
            }

            const project = await projectService.addProject({
                projectDetail: httpRequest.body,
                logger: httpRequest.logger
            });

            return formatResponse({
                statusCode: 201,
                body: { item: { id: project.id } },
            });
        } catch (error) {
            httpRequest.logger.debug('Got error while adding new project')
            httpRequest.logger.debug(error)
            return formatError({ error });
        }
    };
}