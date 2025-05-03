module.exports = function makeDeleteTaskAction({
    taskService,
    formatResponse,
    formatError,
}) {
    return async function deleteTaskAction(httpRequest) {
        try {
            
            await taskService.deleteTask({
                taskId:httpRequest.params.taskId,
                logger: httpRequest.logger,
            });

            return formatResponse({
                statusCode: 200,
                body: { message: "Task deleted successfully" },
            });
        } catch (error) {
            httpRequest.logger.debug('Got error while delete the task')
            httpRequest.logger.debug(error)
            return formatError({ error });
        }
    }
}