module.exports = function makeGetAllUserListAction({
    userService,
    formatResponse,
    formatError,
}) {
    return async function getAllUserListAction(httpRequest) {
        try {

            const users = await userService.getAllUserList({
                fields: httpRequest.query.fields && httpRequest.query.fields.split(','),
                logger: httpRequest.logger
            });
            return formatResponse({
                statusCode: 200,
                body: { items: users },
            });
        } catch (error) {
            httpRequest.logger.error('Got error while get all user list.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}