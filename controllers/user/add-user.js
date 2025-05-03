module.exports = function makeAddUserAction({
    userService,
    formatError,
    formatResponse
}) {
    return async function addUserAction(httpRequest) {
        try {

            const result = await userService.addUser({
                userData: httpRequest.body,
                logger: httpRequest.logger
            });

            return formatResponse({
                statusCode: 201,
                body: { item: { id: result.id } },
            });
        } catch (error) {
            httpRequest.logger.debug('Got error while adding new user')
            httpRequest.logger.debug(error)
            return formatError({ error });
        }
    }
}

