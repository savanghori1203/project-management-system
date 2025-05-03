module.exports = function makeGetUserByIdAction({
    userService,
    formatResponse,
    formatError,
}) {
    return async function getUserByIdAction(httpRequest) {
        try {
            const project = await userService.getUserById({
                userId: httpRequest.params.userId,
                fields: httpRequest.query.fields && httpRequest.query.fields.split(','),
                logger: httpRequest.logger
            });

            return formatResponse({
                statusCode: 200,
                body: { item: project },
            });

        } catch (error) {
            httpRequest.logger.error('Got error while get user by id.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}