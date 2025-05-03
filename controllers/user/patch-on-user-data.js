module.exports = function makePatchOnUserDataAction({
    userService,
    formatResponse,
    formatError,
}) {
    return async function patchOnUserDataAction(httpRequest) {
        try {
            
            await userService.patchOnUserData({
                userId: httpRequest.params.userId,
                userDetail: httpRequest.body,
                logger: httpRequest.logger,
            });

            return formatResponse({
                statusCode: 200,
                body: { message: 'Updated Successfully' },
            });

        } catch (error) {
            httpRequest.logger.error('Got error while patch on user data.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}