module.exports = function makeUpdateOrganizationAction({
    organizationService,
    formatResponse,
    formatError,
}) {
    return async function updateOrganizationAction(httpRequest) {
        try {

            await organizationService.updateOrganization({
                organizationId: httpRequest.params.organizationId,
                organizationDetail: httpRequest.body,
                logger: httpRequest.logger,
            });

            return formatResponse({
                statusCode: 200,
                body: { message: 'Updated Successfully' },
            });

        } catch (error) {
            httpRequest.logger.error('Got error while update organization data.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}