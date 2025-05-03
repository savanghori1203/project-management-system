module.exports = function makeLogInUserAction({
    userService,
    formatResponse,
    formatError,
}) {
    return async function logInUserAction(httpRequest) {
        try {
            await userService.loginUser({
                userDetail: httpRequest.body,
                logger: httpRequest.logger
            });

            return formatResponse({
                statusCode: 200,
                body: { message: 'Logged in Successfully' },
            });

        } catch (error) {
            httpRequest.logger.error('Got error while log in user.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}