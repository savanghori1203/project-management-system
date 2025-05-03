module.exports = function makeDeleteProjectAction({
    userService,
    formatResponse,
    formatError,
}) {
    return async function deleteUserAction(httpRequest) {
        try {
            
            await userService.deleteUser({
                userId:httpRequest.params.userId,
                logger: httpRequest.logger,
            });

            return formatResponse({
                statusCode: 200,
                body: { message: "User deleted successfully" },
            });
        } catch (error) {
            httpRequest.logger.debug('Got error while delete the user')
            httpRequest.logger.debug(error)
            return formatError({ error });
        }
    }
}