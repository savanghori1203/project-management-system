module.exports = function makeGetAllOrganizationListAction({
    organizationService,
    formatResponse,
    formatError,
}) {
    return async function getAllOrganizationListAction(httpRequest) {
        try {

            const organizations = await organizationService.getAllOrganizationList({
                fields: httpRequest.query.fields && httpRequest.query.fields.split(','),
                logger: httpRequest.logger
            });
            return formatResponse({
                statusCode: 200,
                body: { items: organizations },
            });
        } catch (error) {
            httpRequest.logger.error('Got error while get all organization list.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}