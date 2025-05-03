module.exports = function makeGetTaskByIdAction({
    taskService,
    formatResponse,
    formatError,
}) {
    return async function getTaskByIdAction(httpRequest) {
        try {
            const task = await taskService.getTaskById({
                taskId: httpRequest.params.taskId,
                fields: httpRequest.query.fields && httpRequest.query.fields.split(','),
                logger: httpRequest.logger
            });

            return formatResponse({
                statusCode: 200,
                body: { item: task },
            });

        } catch (error) {
            httpRequest.logger.error('Got error while get task by Id.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}