module.exports = function makeAddOrganizationAction({
    organizationService,
    formatResponse,
    formatError,
}) {
    return async function addOrganizationAction(httpRequest) {
        try {

            const organization = await organizationService.addOrganization({
                organizationDetail: httpRequest.body,
                logger: httpRequest.logger
            });

            return formatResponse({
                statusCode: 201,
                body: { item: { id: organization.id } },
            });
        } catch (error) {
            httpRequest.logger.debug('Got error while adding new organization')
            httpRequest.logger.debug(error)
            return formatError({ error });
        }
    };
}