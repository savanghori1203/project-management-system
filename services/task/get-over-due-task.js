module.exports = function makeGetOverDueTask({
    Task,
    UnknownError,
}) {
    return async function getOverDueTask({
        fields = [],
        logger,
    }) {
        logger.debug(`
            @*************getOverDueTask*************
            @fields: ${JSON.stringify(fields)}
        `)

        const now = new Date().toISOString();
        const query = {
            due_date: { $lt: now },
            is_overdue: false,
        };

        try {
            const overdueTasks = await Task.find(query).select(fields?.length ? fields.join(' ') : '');
            logger.debug({overdueTasks})
            return overdueTasks || [];

        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }
}