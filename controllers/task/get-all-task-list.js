module.exports = function makeGetAllTaskListAction({
    taskService,
    prepareTaskFilter,
    config,
    formatResponse,
    formatError,
}) {
    return async function getAllTaskListAction(httpRequest) {
        try {

            const tasks = await taskService.getAllTaskList({
                fields: httpRequest.query.fields && httpRequest.query.fields.split(','),
                limit: httpRequest.query['limit'] ? parseInt(httpRequest.query['limit']) : config.defaultTaskLimt,
                skip: httpRequest.query['skip'] ? parseInt(httpRequest.query['skip']) : 0,
                filter: prepareTaskFilter(httpRequest.query),
                orderBy: httpRequest.query['order_by'] || -1,
                sortBy: httpRequest.query['sort_by'] || 'modified_at',
                logger: httpRequest.logger
            });
            return formatResponse({
                statusCode: 200,
                body: { items: tasks },
            });
        } catch (error) {
            httpRequest.logger.error('Got error while get all task list.');
            httpRequest.logger.error(error);
            return formatError({ error });
        }
    }
}