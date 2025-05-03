module.exports = function makeDeleteOrganizationAction({
    organizationService,
    formatResponse,
    formatError,
}) {
    return async function deleteOrganizationAction(httpRequest) {
        try {
            
            await organizationService.deleteOrganization({
                organizationId:httpRequest.params.organizationId,
                logger: httpRequest.logger,
            });

            return formatResponse({
                statusCode: 200,
                body: { message: "Organization deleted successfully" },
            });
        } catch (error) {
            httpRequest.logger.debug('Got error while delete the organization')
            httpRequest.logger.debug(error)
            return formatError({ error });
        }
    }
}