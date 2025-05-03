module.exports = function makeGetOrganizationByIdAction({
    organizationService,
    formatResponse,
    formatError,
}) {
    return async function getOrganizationByIdAction(httpRequest) {
        try {
            const organization = await organizationService.getOrganizationById({
                organizationId: httpRequest.params.organizationId,
                fields: httpRequest.query.fields && httpRequest.query.fields.split(','),
                logger: httpRequest.logger
            });

            return formatResponse({
                statusCode: 200,
                body: { item: organization },
            });

        } catch (error) {
            httpRequest.logger.error('Got error while get organization by Id.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}